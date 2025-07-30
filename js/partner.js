// Partner Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for collection requests
    const collectionRequests = [
        {
            id: 1,
            customer: 'Sarah Johnson',
            location: 'Victoria Island, Lagos',
            priority: 'high',
            time: 'Today, 10:00 AM',
            materials: 'Plastic bottles, Cardboard',
            distance: '2.3 km',
            status: 'pending',
            phone: '+234 801 234 5678',
            address: '15 Adeola Odeku Street, Victoria Island',
            estimatedValue: '₦1,250'
        },
        {
            id: 2,
            customer: 'Michael Chen',
            location: 'Ikoyi, Lagos',
            priority: 'regular',
            time: 'Today, 2:00 PM',
            materials: 'Glass bottles, Aluminum cans',
            distance: '1.8 km',
            status: 'pending',
            phone: '+234 802 345 6789',
            address: '8 Kingsway Road, Ikoyi',
            estimatedValue: '₦2,100'
        },
        {
            id: 3,
            customer: 'Amara Okafor',
            location: 'Lekki Phase 1, Lagos',
            priority: 'low',
            time: 'Tomorrow, 9:00 AM',
            materials: 'Paper, Cardboard',
            distance: '4.1 km',
            status: 'pending',
            phone: '+234 803 456 7890',
            address: '22 Admiralty Way, Lekki Phase 1',
            estimatedValue: '₦850'
        },
        {
            id: 4,
            customer: 'David Adebayo',
            location: 'Surulere, Lagos',
            priority: 'regular',
            time: 'Today, 11:30 AM',
            materials: 'Mixed recyclables',
            distance: '3.2 km',
            status: 'progress',
            phone: '+234 804 567 8901',
            address: '45 Bode Thomas Street, Surulere',
            estimatedValue: '₦1,800'
        }
    ];

    // Sample messages data
    const messages = [
        {
            id: 1,
            sender: 'Sarah Johnson',
            time: '2 min ago',
            message: 'Hi! I need to reschedule my pickup to 2 PM today. Is that possible?',
            unread: true,
            type: 'customer'
        },
        {
            id: 2,
            sender: 'Admin Team',
            time: '1 hour ago',
            message: 'New collection guidelines have been updated. Please review the partner handbook.',
            unread: true,
            type: 'admin'
        },
        {
            id: 3,
            sender: 'Michael Chen',
            time: '3 hours ago',
            message: 'Thank you for the quick pickup service! Great job as always.',
            unread: false,
            type: 'customer'
        }
    ];

    // Initialize dashboard
    initializeDashboard();
    setupEventListeners();
    renderRequests('pending');
    renderMessages();
    initializeCharts();

    function initializeDashboard() {
        // Update metrics with real-time data
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
        // Filter buttons
        const filterButtons = document.querySelectorAll('[data-filter]');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-secondary', 'text-white');
                    btn.classList.add('bg-gray-100', 'text-gray-600');
                });
                this.classList.remove('bg-gray-100', 'text-gray-600');
                this.classList.add('bg-secondary', 'text-white');
                
                // Render filtered requests
                renderRequests(filter);
            });
        });

        // Action buttons
        document.getElementById('start-collection-btn')?.addEventListener('click', startCollection);
        document.getElementById('alerts-btn')?.addEventListener('click', showAlerts);
        document.getElementById('start-navigation-btn')?.addEventListener('click', startNavigation);
        document.getElementById('optimize-route-btn')?.addEventListener('click', optimizeRoute);
        document.getElementById('notifications-btn')?.addEventListener('click', showNotifications);

        // Modal event listeners
        setupModalListeners();
    }

    function renderRequests(filter) {
        const container = document.getElementById('requests-container');
        if (!container) return;

        const filteredRequests = collectionRequests.filter(request => {
            if (filter === 'pending') return request.status === 'pending';
            if (filter === 'progress') return request.status === 'progress';
            if (filter === 'completed') return request.status === 'completed';
            return true;
        });

        container.innerHTML = filteredRequests.map(request => `
            <div class="border border-gray-200 rounded-lg p-4 card-hover">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 ${getPriorityColor(request.priority)} rounded-full flex items-center justify-center">
                            <i class="ri-user-line ${getPriorityTextColor(request.priority)}"></i>
                        </div>
                        <div>
                            <h4 class="font-medium text-gray-800">${request.customer}</h4>
                            <p class="text-sm text-gray-500">${request.location}</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 ${getPriorityBadgeColor(request.priority)} text-xs font-medium rounded-full">
                        ${request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                    </span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                        <span class="text-gray-500">Pickup Time:</span>
                        <p class="font-medium">${request.time}</p>
                    </div>
                    <div>
                        <span class="text-gray-500">Materials:</span>
                        <p class="font-medium">${request.materials}</p>
                    </div>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                        <div class="flex items-center space-x-1">
                            <i class="ri-map-pin-line"></i>
                            <span>${request.distance} away</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <i class="ri-money-dollar-circle-line"></i>
                            <span>${request.estimatedValue}</span>
                        </div>
                    </div>
                    <div class="flex space-x-2">
                        ${request.status === 'pending' ? `
                            <button onclick="acceptRequest(${request.id})" class="px-4 py-2 bg-secondary text-white rounded-button text-sm font-medium transition-colors hover:bg-green-600">
                                Accept
                            </button>
                        ` : ''}
                        <button onclick="viewRequestDetails(${request.id})" class="px-4 py-2 bg-gray-100 text-gray-600 rounded-button text-sm font-medium transition-colors hover:bg-gray-200">
                            View Details
                        </button>
                        <button onclick="contactCustomer(${request.id})" class="px-4 py-2 bg-blue-100 text-blue-600 rounded-button text-sm font-medium transition-colors hover:bg-blue-200">
                            <i class="ri-message-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderMessages() {
        const container = document.getElementById('messages-container');
        if (!container) return;

        container.innerHTML = messages.map(message => `
            <div class="border border-gray-200 rounded-lg p-4 ${message.unread ? 'bg-blue-50 border-blue-200' : ''}">
                <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 ${getMessageTypeColor(message.type)} rounded-full flex items-center justify-center">
                            <i class="${getMessageTypeIcon(message.type)} ${getMessageTypeTextColor(message.type)} text-sm"></i>
                        </div>
                        <div>
                            <span class="font-medium text-gray-800">${message.sender}</span>
                            <span class="text-sm text-gray-500 ml-2">${message.time}</span>
                        </div>
                    </div>
                    ${message.unread ? '<span class="w-2 h-2 bg-blue-500 rounded-full"></span>' : ''}
                </div>
                <p class="text-gray-600 text-sm mb-3">${message.message}</p>
                <div class="flex space-x-2">
                    <button onclick="replyToMessage(${message.id})" class="px-3 py-1 bg-secondary text-white rounded-button text-sm font-medium transition-colors hover:bg-green-600">
                        Reply
                    </button>
                    ${message.type === 'customer' ? `
                        <button onclick="callCustomer('${message.sender}')" class="px-3 py-1 bg-gray-100 text-gray-600 rounded-button text-sm font-medium transition-colors hover:bg-gray-200">
                            Call
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    function initializeCharts() {
        // Performance Chart
        const chartDom = document.getElementById('performanceChart');
        if (chartDom) {
            const myChart = echarts.init(chartDom);
            const option = {
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                        name: 'Collections',
                        type: 'bar',
                        data: [12, 15, 18, 14, 20, 16, 22],
                        itemStyle: {
                            color: '#22C55E',
                            borderRadius: [4, 4, 0, 0]
                        }
                    },
                    {
                        name: 'Earnings',
                        type: 'line',
                        data: [2800, 3200, 3600, 3100, 4200, 3500, 4500],
                        smooth: true,
                        lineStyle: {
                            color: '#0B4619',
                            width: 3
                        },
                        itemStyle: { color: '#0B4619' },
                        showSymbol: false
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    textStyle: { color: '#1f2937' }
                }
            };
            myChart.setOption(option);
        }
    }

    function updateMetrics() {
        // Simulate real-time updates
        setInterval(() => {
            const activeRequests = document.getElementById('active-requests');
            const weeklyEarnings = document.getElementById('weekly-earnings');
            
            if (activeRequests) {
                const current = parseInt(activeRequests.textContent);
                const change = Math.random() > 0.5 ? 1 : -1;
                const newValue = Math.max(0, current + change);
                activeRequests.textContent = newValue;
            }
        }, 30000); // Update every 30 seconds
    }

    // Utility functions
    function getPriorityColor(priority) {
        switch (priority) {
            case 'high': return 'bg-red-100';
            case 'regular': return 'bg-blue-100';
            case 'low': return 'bg-green-100';
            default: return 'bg-gray-100';
        }
    }

    function getPriorityTextColor(priority) {
        switch (priority) {
            case 'high': return 'text-red-600';
            case 'regular': return 'text-blue-600';
            case 'low': return 'text-green-600';
            default: return 'text-gray-600';
        }
    }

    function getPriorityBadgeColor(priority) {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'regular': return 'bg-blue-100 text-blue-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    function getMessageTypeColor(type) {
        switch (type) {
            case 'customer': return 'bg-blue-100';
            case 'admin': return 'bg-orange-100';
            default: return 'bg-gray-100';
        }
    }

    function getMessageTypeTextColor(type) {
        switch (type) {
            case 'customer': return 'text-blue-600';
            case 'admin': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    }

    function getMessageTypeIcon(type) {
        switch (type) {
            case 'customer': return 'ri-user-line';
            case 'admin': return 'ri-admin-line';
            default: return 'ri-message-line';
        }
    }

    // Global functions for button actions
    window.acceptRequest = function(requestId) {
        const request = collectionRequests.find(r => r.id === requestId);
        if (request) {
            request.status = 'progress';
            showNotification(`Request from ${request.customer} accepted!`, 'success');
            renderRequests('pending');
        }
    };

    window.viewRequestDetails = function(requestId) {
        const request = collectionRequests.find(r => r.id === requestId);
        if (request) {
            const modal = document.getElementById('request-modal');
            const content = document.getElementById('request-details-content');
            
            content.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-800">Customer Information</h4>
                        <p class="text-gray-600">${request.customer}</p>
                        <p class="text-gray-600">${request.phone}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-800">Address</h4>
                        <p class="text-gray-600">${request.address}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-800">Pickup Details</h4>
                        <p class="text-gray-600">Time: ${request.time}</p>
                        <p class="text-gray-600">Materials: ${request.materials}</p>
                        <p class="text-gray-600">Estimated Value: ${request.estimatedValue}</p>
                    </div>
                    <div class="flex space-x-2 pt-4">
                        ${request.status === 'pending' ? `
                            <button onclick="acceptRequest(${request.id}); closeModal('request-modal')" class="flex-1 bg-secondary text-white py-2 rounded-button font-medium">
                                Accept Request
                            </button>
                        ` : ''}
                        <button onclick="contactCustomer(${request.id})" class="flex-1 bg-blue-500 text-white py-2 rounded-button font-medium">
                            Contact Customer
                        </button>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.contactCustomer = function(requestId) {
        const request = collectionRequests.find(r => r.id === requestId);
        if (request) {
            const modal = document.getElementById('message-modal');
            const toField = document.getElementById('message-to');
            
            toField.value = request.customer;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.replyToMessage = function(messageId) {
        const message = messages.find(m => m.id === messageId);
        if (message) {
            const modal = document.getElementById('message-modal');
            const toField = document.getElementById('message-to');
            
            toField.value = message.sender;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    window.callCustomer = function(customerName) {
        showNotification(`Calling ${customerName}...`, 'info');
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    function setupModalListeners() {
        // Request modal
        const requestModal = document.getElementById('request-modal');
        const closeRequestModal = document.getElementById('close-request-modal');
        
        if (closeRequestModal) {
            closeRequestModal.addEventListener('click', () => closeModal('request-modal'));
        }
        
        if (requestModal) {
            requestModal.addEventListener('click', function(e) {
                if (e.target === requestModal) {
                    closeModal('request-modal');
                }
            });
        }

        // Message modal
        const messageModal = document.getElementById('message-modal');
        const closeMessageModal = document.getElementById('close-message-modal');
        const messageForm = document.getElementById('message-form');
        
        if (closeMessageModal) {
            closeMessageModal.addEventListener('click', () => closeModal('message-modal'));
        }
        
        if (messageModal) {
            messageModal.addEventListener('click', function(e) {
                if (e.target === messageModal) {
                    closeModal('message-modal');
                }
            });
        }

        if (messageForm) {
            messageForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const content = document.getElementById('message-content').value;
                const to = document.getElementById('message-to').value;
                
                if (content.trim()) {
                    showNotification(`Message sent to ${to}`, 'success');
                    closeModal('message-modal');
                    messageForm.reset();
                }
            });
        }
    }

    function startCollection() {
        showNotification('Collection route started! Navigation will begin shortly.', 'success');
    }

    function showAlerts() {
        showNotification('You have 3 new alerts: 2 schedule changes and 1 route update.', 'info');
    }

    function startNavigation() {
        showNotification('Starting GPS navigation for optimized route...', 'info');
    }

    function optimizeRoute() {
        showNotification('Route optimization in progress... New route will be available in 30 seconds.', 'info');
    }

    function showNotifications() {
        showNotification('You have 3 unread notifications.', 'info');
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

