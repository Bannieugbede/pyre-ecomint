// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for users
    const users = [
        {
            id: 1,
            name: 'James Adebayo',
            email: 'james.adebayo@email.com',
            phone: '+234 801 234 5678',
            role: 'partner',
            location: 'Victoria Island',
            status: 'active',
            collections: 247,
            rating: 4.8,
            earnings: 45200,
            joinDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+234 802 345 6789',
            role: 'partner',
            location: 'Lekki Phase 1',
            status: 'active',
            collections: 189,
            rating: 4.9,
            earnings: 38750,
            joinDate: '2024-02-20'
        },
        {
            id: 3,
            name: 'Michael Chen',
            email: 'michael.chen@email.com',
            phone: '+234 803 456 7890',
            role: 'partner',
            location: 'Ikoyi',
            status: 'pending',
            collections: 156,
            rating: 4.7,
            earnings: 32100,
            joinDate: '2024-03-10'
        },
        {
            id: 4,
            name: 'Monica Okafor',
            email: 'monica.okafor@email.com',
            phone: '+234 804 567 8901',
            role: 'customer',
            location: 'Surulere',
            status: 'active',
            collections: 45,
            rating: null,
            earnings: null,
            joinDate: '2024-01-08'
        },
        {
            id: 5,
            name: 'David Adebayo',
            email: 'david.adebayo@email.com',
            phone: '+234 805 678 9012',
            role: 'customer',
            location: 'Ikeja',
            status: 'active',
            collections: 32,
            rating: null,
            earnings: null,
            joinDate: '2024-02-14'
        },
        {
            id: 6,
            name: 'Admin User',
            email: 'admin@ecomint.com',
            phone: '+234 806 789 0123',
            role: 'admin',
            location: 'Lagos',
            status: 'active',
            collections: null,
            rating: null,
            earnings: null,
            joinDate: '2023-12-01'
        }
    ];

    // Sample activity data
    const activities = [
        {
            id: 1,
            type: 'user_registered',
            message: 'New partner David Okafor registered',
            time: '2 minutes ago',
            icon: 'ri-user-add-line',
            color: 'green'
        },
        {
            id: 2,
            type: 'collection_completed',
            message: 'Collection request completed by Sarah Johnson',
            time: '15 minutes ago',
            icon: 'ri-recycle-line',
            color: 'blue'
        },
        {
            id: 3,
            type: 'system_alert',
            message: 'System maintenance scheduled for tomorrow',
            time: '1 hour ago',
            icon: 'ri-alert-line',
            color: 'yellow'
        },
        {
            id: 4,
            type: 'payment_processed',
            message: 'Payment of ₦12,500 processed for James Adebayo',
            time: '2 hours ago',
            icon: 'ri-money-dollar-circle-line',
            color: 'purple'
        },
        {
            id: 5,
            type: 'error',
            message: 'Failed collection attempt reported',
            time: '3 hours ago',
            icon: 'ri-error-warning-line',
            color: 'red'
        }
    ];

    // Sample inventory data
    const inventory = [
        {
            material: 'Plastic Bottles',
            icon: 'ri-bottle-line',
            color: 'blue',
            totalCollected: '1,245.8 kg',
            processing: '324.2 kg',
            readyForSale: '921.6 kg',
            marketValue: '₦46,080'
        },
        {
            material: 'Cardboard',
            icon: 'ri-file-paper-line',
            color: 'yellow',
            totalCollected: '892.4 kg',
            processing: '156.8 kg',
            readyForSale: '735.6 kg',
            marketValue: '₦36,780'
        },
        {
            material: 'Aluminum Cans',
            icon: 'ri-cup-line',
            color: 'gray',
            totalCollected: '567.2 kg',
            processing: '89.4 kg',
            readyForSale: '477.8 kg',
            marketValue: '₦95,560'
        },
        {
            material: 'Glass Bottles',
            icon: 'ri-wine-bottle-line',
            color: 'green',
            totalCollected: '743.6 kg',
            processing: '123.8 kg',
            readyForSale: '619.8 kg',
            marketValue: '₦30,990'
        }
    ];

    // Initialize dashboard
    initializeDashboard();
    setupEventListeners();
    renderUsers('partners');
    renderActivityFeed();
    renderInventoryTable();
    initializeCharts();
    setupToggleSwitches();

    function initializeDashboard() {
        // Update real-time metrics
        updateMetrics();
        
        // Set up mobile menu
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    function setupEventListeners() {
        // User filter buttons
        const userFilterButtons = document.querySelectorAll('[data-user-filter]');
        userFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-user-filter');
                
                // Update active button
                userFilterButtons.forEach(btn => {
                    btn.classList.remove('bg-secondary', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-600');
                });
                this.classList.remove('bg-gray-100', 'text-gray-600');
                this.classList.add('bg-secondary', 'text-white');
                
                // Render filtered users
                renderUsers(filter);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('user-search');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const currentFilter = document.querySelector('[data-user-filter].bg-secondary').getAttribute('data-user-filter');
                renderUsers(currentFilter, searchTerm);
            });
        }

        // Action buttons
        document.getElementById('add-user-btn')?.addEventListener('click', showAddUserModal);
        document.getElementById('export-data-btn')?.addEventListener('click', exportData);
        document.getElementById('system-alerts-btn')?.addEventListener('click', showSystemAlerts);

        // Modal event listeners
        setupModalListeners();
    }

    function renderUsers(filter, searchTerm = '') {
        const container = document.getElementById('users-container');
        if (!container) return;

        let filteredUsers = users.filter(user => {
            if (filter === 'partners') return user.role === 'partner';
            if (filter === 'customers') return user.role === 'customer';
            if (filter === 'admins') return user.role === 'admin';
            return true;
        });

        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user => 
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.location.toLowerCase().includes(searchTerm)
            );
        }

        container.innerHTML = filteredUsers.map(user => `
            <div class="border border-gray-200 rounded-lg p-4 card-hover">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 ${getRoleColor(user.role)} rounded-full flex items-center justify-center">
                            <i class="${getRoleIcon(user.role)} ${getRoleTextColor(user.role)}"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-800">${user.name}</h4>
                            <p class="text-sm text-gray-500">${user.role.charAt(0).toUpperCase() + user.role.slice(1)} • ${user.location}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="px-3 py-1 ${getStatusColor(user.status)} text-xs font-medium rounded-full">
                            ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                        <div class="flex space-x-1">
                            <button onclick="editUser(${user.id})" class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                                <i class="ri-edit-line text-gray-600 text-sm"></i>
                            </button>
                            <button onclick="viewUserDetails(${user.id})" class="w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                                <i class="ri-eye-line text-blue-600 text-sm"></i>
                            </button>
                            <button onclick="suspendUser(${user.id})" class="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors">
                                <i class="ri-close-line text-red-600 text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                ${user.role === 'partner' ? `
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span class="text-gray-500">Collections:</span>
                            <p class="font-medium">${user.collections}</p>
                        </div>
                        <div>
                            <span class="text-gray-500">Rating:</span>
                            <p class="font-medium">${user.rating}/5</p>
                        </div>
                        <div>
                            <span class="text-gray-500">Earnings:</span>
                            <p class="font-medium">₦${user.earnings?.toLocaleString()}</p>
                        </div>
                    </div>
                ` : user.role === 'customer' ? `
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-gray-500">Pickups:</span>
                            <p class="font-medium">${user.collections}</p>
                        </div>
                        <div>
                            <span class="text-gray-500">Joined:</span>
                            <p class="font-medium">${formatDate(user.joinDate)}</p>
                        </div>
                    </div>
                ` : `
                    <div class="text-sm">
                        <span class="text-gray-500">Joined:</span>
                        <span class="font-medium">${formatDate(user.joinDate)}</span>
                    </div>
                `}
            </div>
        `).join('');
    }

    function renderActivityFeed() {
        const container = document.getElementById('activity-feed');
        if (!container) return;

        container.innerHTML = activities.map(activity => `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 ${getActivityColor(activity.color)} rounded-full flex items-center justify-center">
                    <i class="${activity.icon} ${getActivityTextColor(activity.color)} text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm text-gray-800">${activity.message}</p>
                    <p class="text-xs text-gray-500 mt-1">${activity.time}</p>
                </div>
            </div>
        `).join('');
    }

    function renderInventoryTable() {
        const container = document.getElementById('inventory-table');
        if (!container) return;

        container.innerHTML = inventory.map(item => `
            <tr class="border-b border-gray-100">
                <td class="py-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center">
                            <i class="${item.icon} text-${item.color}-600"></i>
                        </div>
                        <span class="font-medium">${item.material}</span>
                    </div>
                </td>
                <td class="py-3 text-gray-600">${item.totalCollected}</td>
                <td class="py-3 text-gray-600">${item.processing}</td>
                <td class="py-3 text-gray-600">${item.readyForSale}</td>
                <td class="py-3 font-medium">${item.marketValue}</td>
            </tr>
        `).join('');
    }

    function initializeCharts() {
        // System Analytics Chart
        const systemChartDom = document.getElementById('systemChart');
        if (systemChartDom) {
            const systemChart = echarts.init(systemChartDom);
            const systemOption = {
                animation: false,
                grid: {
                    top: 20,
                    left: 40,
                    right: 20,
                    bottom: 40,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    axisLine: { show: false },
                    axisTick: { show: false }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: {
                        lineStyle: { color: '#f0f0f0' }
                    }
                },
                series: [
                    {
                        name: 'Users',
                        type: 'bar',
                        data: [420, 532, 601, 734, 890, 1030, 1200],
                        itemStyle: {
                            color: '#3B82F6',
                            borderRadius: [4, 4, 0, 0]
                        }
                    },
                    {
                        name: 'Collections',
                        type: 'line',
                        data: [180, 232, 301, 334, 390, 430, 520],
                        smooth: true,
                        lineStyle: {
                            color: '#22C55E',
                            width: 3
                        },
                        itemStyle: { color: '#22C55E' },
                        showSymbol: false
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    textStyle: { color: '#1f2937' }
                }
            };
            systemChart.setOption(systemOption);
        }

        // Performance Chart
        const performanceChartDom = document.getElementById('performanceChart');
        if (performanceChartDom) {
            const performanceChart = echarts.init(performanceChartDom);
            const performanceOption = {
                animation: false,
                grid: {
                    top: 20,
                    left: 40,
                    right: 20,
                    bottom: 40,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                    axisLine: { show: false },
                    axisTick: { show: false }
                },
                yAxis: {
                    type: 'value',
                    max: 100,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: {
                        lineStyle: { color: '#f0f0f0' }
                    }
                },
                series: [
                    {
                        name: 'CPU Usage',
                        type: 'line',
                        data: [45, 52, 48, 65, 58, 72, 68],
                        smooth: true,
                        lineStyle: {
                            color: '#3B82F6',
                            width: 3
                        },
                        itemStyle: { color: '#3B82F6' },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(59, 130, 246, 0.1)' },
                                    { offset: 1, color: 'rgba(59, 130, 246, 0.01)' }
                                ]
                            }
                        },
                        showSymbol: false
                    },
                    {
                        name: 'Memory Usage',
                        type: 'line',
                        data: [35, 42, 38, 55, 48, 62, 58],
                        smooth: true,
                        lineStyle: {
                            color: '#22C55E',
                            width: 3
                        },
                        itemStyle: { color: '#22C55E' },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0, y: 0, x2: 0, y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(34, 197, 94, 0.1)' },
                                    { offset: 1, color: 'rgba(34, 197, 94, 0.01)' }
                                ]
                            }
                        },
                        showSymbol: false
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    textStyle: { color: '#1f2937' }
                }
            };
            performanceChart.setOption(performanceOption);
        }
    }

    function setupToggleSwitches() {
        const toggleSwitches = document.querySelectorAll('.toggle-switch');
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const setting = this.getAttribute('data-setting');
                this.classList.toggle('active');
                
                const isActive = this.classList.contains('active');
                showNotification(`${setting.replace('-', ' ')} ${isActive ? 'enabled' : 'disabled'}`, 'info');
            });
        });
    }

    function updateMetrics() {
        // Simulate real-time updates
        setInterval(() => {
            const totalUsers = document.getElementById('total-users');
            const activeCollections = document.getElementById('active-collections');
            
            if (totalUsers) {
                const current = parseInt(totalUsers.textContent.replace(',', ''));
                const change = Math.random() > 0.7 ? 1 : 0;
                const newValue = current + change;
                totalUsers.textContent = newValue.toLocaleString();
            }
            
            if (activeCollections) {
                const current = parseInt(activeCollections.textContent.replace(',', ''));
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                const newValue = Math.max(0, current + change);
                activeCollections.textContent = newValue.toLocaleString();
            }
        }, 45000); // Update every 45 seconds
    }

    // Utility functions
    function getRoleColor(role) {
        switch (role) {
            case 'partner': return 'bg-green-100';
            case 'customer': return 'bg-blue-100';
            case 'admin': return 'bg-purple-100';
            default: return 'bg-gray-100';
        }
    }

    function getRoleTextColor(role) {
        switch (role) {
            case 'partner': return 'text-green-600';
            case 'customer': return 'text-blue-600';
            case 'admin': return 'text-purple-600';
            default: return 'text-gray-600';
        }
    }

    function getRoleIcon(role) {
        switch (role) {
            case 'partner': return 'ri-truck-line';
            case 'customer': return 'ri-user-line';
            case 'admin': return 'ri-shield-user-line';
            default: return 'ri-user-line';
        }
    }

    function getStatusColor(status) {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    function getActivityColor(color) {
        const colors = {
            green: 'bg-green-100',
            blue: 'bg-blue-100',
            yellow: 'bg-yellow-100',
            purple: 'bg-purple-100',
            red: 'bg-red-100'
        };
        return colors[color] || 'bg-gray-100';
    }

    function getActivityTextColor(color) {
        const colors = {
            green: 'text-green-600',
            blue: 'text-blue-600',
            yellow: 'text-yellow-600',
            purple: 'text-purple-600',
            red: 'text-red-600'
        };
        return colors[color] || 'text-gray-600';
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Global functions for button actions
    window.editUser = function(userId) {
        const user = users.find(u => u.id === userId);
        if (user) {
            showNotification(`Edit functionality for ${user.name} will be implemented`, 'info');
        }
    };

    window.viewUserDetails = function(userId) {
        const user = users.find(u => u.id === userId);
        if (user) {
            const modal = document.getElementById('user-details-modal');
            const content = document.getElementById('user-details-content');
            
            content.innerHTML = `
                <div class="space-y-4">
                    <div class="flex items-center space-x-4 mb-6">
                        <div class="w-16 h-16 ${getRoleColor(user.role)} rounded-full flex items-center justify-center">
                            <i class="${getRoleIcon(user.role)} ${getRoleTextColor(user.role)} text-2xl"></i>
                        </div>
                        <div>
                            <h4 class="text-xl font-semibold text-gray-800">${user.name}</h4>
                            <p class="text-gray-600">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <div>
                            <label class="text-sm font-medium text-gray-500">Email</label>
                            <p class="text-gray-800">${user.email}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Phone</label>
                            <p class="text-gray-800">${user.phone}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Location</label>
                            <p class="text-gray-800">${user.location}</p>
                        </div>
                        <div>
                            <label class="text-sm font-medium text-gray-500">Status</label>
                            <span class="inline-block px-3 py-1 ${getStatusColor(user.status)} text-xs font-medium rounded-full">
                                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                        </div>
                        ${user.role === 'partner' ? `
                            <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <label class="text-sm font-medium text-gray-500">Collections</label>
                                    <p class="text-xl font-bold text-gray-800">${user.collections}</p>
                                </div>
                                <div>
                                    <label class="text-sm font-medium text-gray-500">Rating</label>
                                    <p class="text-xl font-bold text-gray-800">${user.rating}/5</p>
                                </div>
                                <div class="col-span-2">
                                    <label class="text-sm font-medium text-gray-500">Total Earnings</label>
                                    <p class="text-xl font-bold text-green-600">₦${user.earnings?.toLocaleString()}</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <div class="flex space-x-2 pt-4">
                        <button onclick="editUser(${user.id}); closeModal('user-details-modal')" class="flex-1 bg-secondary text-white py-2 rounded-button font-medium">
                            Edit User
                        </button>
                        <button onclick="suspendUser(${user.id}); closeModal('user-details-modal')" class="flex-1 bg-red-500 text-white py-2 rounded-button font-medium">
                            ${user.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.suspendUser = function(userId) {
        const user = users.find(u => u.id === userId);
        if (user) {
            const action = user.status === 'active' ? 'suspend' : 'activate';
            if (confirm(`Are you sure you want to ${action} ${user.name}?`)) {
                user.status = user.status === 'active' ? 'suspended' : 'active';
                showNotification(`${user.name} has been ${action}d successfully`, 'success');
                const currentFilter = document.querySelector('[data-user-filter].bg-secondary').getAttribute('data-user-filter');
                renderUsers(currentFilter);
            }
        }
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    function setupModalListeners() {
        // Add User Modal
        const addUserModal = document.getElementById('add-user-modal');
        const closeAddUserModal = document.getElementById('close-add-user-modal');
        const addUserForm = document.getElementById('add-user-form');
        
        if (closeAddUserModal) {
            closeAddUserModal.addEventListener('click', () => closeModal('add-user-modal'));
        }
        
        if (addUserModal) {
            addUserModal.addEventListener('click', function(e) {
                if (e.target === addUserModal) {
                    closeModal('add-user-modal');
                }
            });
        }

        if (addUserForm) {
            addUserForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                showNotification('User added successfully!', 'success');
                closeModal('add-user-modal');
                this.reset();
            });
        }

        // User Details Modal
        const userDetailsModal = document.getElementById('user-details-modal');
        const closeUserDetailsModal = document.getElementById('close-user-details-modal');
        
        if (closeUserDetailsModal) {
            closeUserDetailsModal.addEventListener('click', () => closeModal('user-details-modal'));
        }
        
        if (userDetailsModal) {
            userDetailsModal.addEventListener('click', function(e) {
                if (e.target === userDetailsModal) {
                    closeModal('user-details-modal');
                }
            });
        }
    }

    function showAddUserModal() {
        const modal = document.getElementById('add-user-modal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function exportData() {
        showNotification('Data export started. You will receive an email when ready.', 'info');
    }

    function showSystemAlerts() {
        showNotification('System maintenance scheduled for tomorrow at 2:00 AM', 'warning');
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
        
        const colors = {
            info: 'bg-blue-500 text-white',
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
});

