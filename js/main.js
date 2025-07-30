// Enhanced Main JavaScript for EcoMint Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initializeApp();
    setupGlobalEventListeners();
    setupOfflineSupport();
    setupNotificationSystem();
    setupDataPersistence();

    function initializeApp() {
        // Check for saved user preferences
        loadUserPreferences();
        
        // Initialize mobile menu for all pages
        setupMobileMenu();
        
        // Setup smooth scrolling
        setupSmoothScrolling();
        
        // Initialize tooltips and interactive elements
        setupTooltips();
        
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
        
        // Initialize real-time features
        setupRealTimeUpdates();
        
        // Initialize page-specific features
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        initializePageSpecificFeatures(currentPage);
    }

    function setupGlobalEventListeners() {
        // Global click handlers
        document.addEventListener('click', function(e) {
            // Handle dropdown menus
            if (e.target.closest('.dropdown-toggle')) {
                toggleDropdown(e.target.closest('.dropdown-toggle'));
            }
            
            // Handle modal triggers
            if (e.target.closest('[data-modal]')) {
                const modalId = e.target.closest('[data-modal]').getAttribute('data-modal');
                openModal(modalId);
            }
            
            // Handle external link warnings
            if (e.target.closest('a[href^="http"]') && !e.target.closest('a[href*="ecomint"]')) {
                e.preventDefault();
                showExternalLinkWarning(e.target.closest('a').href);
            }
        });

        // Global form handlers
        document.addEventListener('submit', function(e) {
            if (e.target.classList.contains('ajax-form')) {
                e.preventDefault();
                handleAjaxForm(e.target);
            }
        });

        // Global input handlers
        document.addEventListener('input', function(e) {
            if (e.target.classList.contains('auto-save')) {
                debounce(saveFormData, 1000)(e.target.form);
            }
        });
    }

    function setupMobileMenu() {
        const mobileMenuToggles = document.querySelectorAll('#mobile-menu-toggle');
        const mobileMenus = document.querySelectorAll('#mobile-menu');
        
        mobileMenuToggles.forEach((toggle, index) => {
            const menu = mobileMenus[index];
            if (toggle && menu) {
                toggle.addEventListener('click', function() {
                    menu.classList.toggle('hidden');
                    
                    // Update toggle icon
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        if (menu.classList.contains('hidden')) {
                            icon.className = 'ri-menu-line text-xl';
                        } else {
                            icon.className = 'ri-close-line text-xl';
                        }
                    }
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#mobile-menu-toggle') && !e.target.closest('#mobile-menu')) {
                mobileMenus.forEach(menu => {
                    menu.classList.add('hidden');
                });
                mobileMenuToggles.forEach(toggle => {
                    const icon = toggle.querySelector('i');
                    if (icon) {
                        icon.className = 'ri-menu-line text-xl';
                    }
                });
            }
        });
    }

    function setupSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function setupTooltips() {
        // Simple tooltip system
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                closeAllModals();
            }
            
            // Ctrl/Cmd + Enter to submit forms
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                const activeForm = document.activeElement.closest('form');
                if (activeForm) {
                    activeForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    }

    function setupRealTimeUpdates() {
        // Simulate real-time updates for demo purposes
        setInterval(() => {
            updateRealTimeElements();
        }, 30000); // Update every 30 seconds
    }

    function setupOfflineSupport() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }

        // Handle online/offline status
        window.addEventListener('online', function() {
            showNotification('Connection restored', 'success');
            syncOfflineData();
        });

        window.addEventListener('offline', function() {
            showNotification('You are now offline. Some features may be limited.', 'warning');
        });
    }

    function setupNotificationSystem() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'fixed top-4 right-4 z-50 space-y-2';
            document.body.appendChild(container);
        }
    }

    function setupDataPersistence() {
        // Auto-save form data
        const forms = document.querySelectorAll('form[data-auto-save]');
        forms.forEach(form => {
            const formId = form.id || 'form-' + Math.random().toString(36).substr(2, 9);
            
            // Load saved data
            loadFormData(form, formId);
            
            // Save on input
            form.addEventListener('input', debounce(() => {
                saveFormData(form, formId);
            }, 1000));
        });
    }

    // Utility Functions
    function showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
        
        const colors = {
            info: 'bg-blue-500 text-white',
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="flex-1 mr-2">${message}</span>
                <button class="text-white hover:text-gray-200 flex-shrink-0" onclick="this.parentElement.parentElement.remove()">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function saveFormData(form, formId) {
        if (!form || !formId) return;
        
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        localStorage.setItem(`ecomint_form_${formId}`, JSON.stringify(data));
    }

    function loadFormData(form, formId) {
        if (!form || !formId) return;
        
        const savedData = localStorage.getItem(`ecomint_form_${formId}`);
        if (!savedData) return;
        
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = data[key];
                }
            });
        } catch (error) {
            console.error('Error loading form data:', error);
        }
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            const firstInput = modal.querySelector('input, textarea, select');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal, [id$="-modal"]');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = 'auto';
    }

    function toggleDropdown(trigger) {
        const dropdown = trigger.nextElementSibling;
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    function showTooltip(e) {
        const element = e.target;
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip absolute bg-gray-800 text-white text-sm px-2 py-1 rounded z-50';
        tooltip.textContent = tooltipText;
        tooltip.id = 'active-tooltip';
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    }

    function hideTooltip() {
        const tooltip = document.getElementById('active-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    function updateRealTimeElements() {
        // Update timestamps
        const timeElements = document.querySelectorAll('[data-timestamp]');
        timeElements.forEach(element => {
            const timestamp = element.getAttribute('data-timestamp');
            if (timestamp) {
                element.textContent = formatRelativeTime(new Date(timestamp));
            }
        });

        // Update counters with small random changes
        const counters = document.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const current = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            if (!isNaN(current)) {
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                const newValue = Math.max(0, current + change);
                counter.textContent = counter.textContent.replace(/\d+/, newValue.toLocaleString());
            }
        });
    }

    function formatRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }

    function syncOfflineData() {
        // Sync any offline data when connection is restored
        const offlineData = localStorage.getItem('ecomint_offline_data');
        if (offlineData) {
            try {
                const data = JSON.parse(offlineData);
                // Process offline data here
                console.log('Syncing offline data:', data);
                localStorage.removeItem('ecomint_offline_data');
                showNotification('Offline data synced successfully', 'success');
            } catch (error) {
                console.error('Error syncing offline data:', error);
            }
        }
    }

    function handleAjaxForm(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Simulate API call
        showNotification('Processing...', 'info', 2000);
        
        setTimeout(() => {
            showNotification('Form submitted successfully!', 'success');
            form.reset();
        }, 2000);
    }

    function showExternalLinkWarning(url) {
        const confirmed = confirm(`This link will take you to an external website: ${url}\n\nDo you want to continue?`);
        if (confirmed) {
            window.open(url, '_blank');
        }
    }

    function initializePageSpecificFeatures(page) {
        switch (page) {
            case 'index.html':
            case '':
                initializeHomePage();
                break;
            case 'partner-dashboard.html':
                initializePartnerDashboard();
                break;
            case 'admin-dashboard.html':
                initializeAdminDashboard();
                break;
            case 'onboarding.html':
                initializeOnboarding();
                break;
        }
    }

    function initializeHomePage() {
        // Home page specific initialization
        setupPickupScheduler();
        setupImpactAnimations();
        setupHomePageButtons();
    }

    function initializePartnerDashboard() {
        // Partner dashboard specific initialization
        setupRouteOptimization();
        setupCollectionTracking();
    }

    function initializeAdminDashboard() {
        // Admin dashboard specific initialization
        setupUserManagement();
        setupSystemMonitoring();
    }

    function initializeOnboarding() {
        // Onboarding specific initialization
        setupTutorialProgress();
    }

    function setupPickupScheduler() {
        // Enhanced pickup scheduling functionality
        const pickupModal = document.getElementById('pickup-modal');
        const closeModal = document.getElementById('close-modal');
        const pickupForm = document.getElementById('pickup-form');
        
        // Buttons that open pickup modal
        const pickupButtons = [
            'get-started-btn',
            'request-pickup-btn',
            'schedule-new-pickup',
            'reschedule-btn'
        ];
        
        pickupButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', function() {
                    if (pickupModal) {
                        pickupModal.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                if (pickupModal) {
                    pickupModal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Close modal when clicking outside
        if (pickupModal) {
            pickupModal.addEventListener('click', function(e) {
                if (e.target === pickupModal) {
                    pickupModal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Handle pickup form submission
        if (pickupForm) {
            pickupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulate form submission
                const submitButton = pickupForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Scheduling...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    showNotification('Pickup scheduled successfully! You will receive a confirmation email shortly.', 'success');
                    if (pickupModal) {
                        pickupModal.classList.add('hidden');
                        document.body.style.overflow = 'auto';
                    }
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    pickupForm.reset();
                }, 2000);
            });
        }
    }

    function setupHomePageButtons() {
        // Learn more button scroll
        const learnMoreBtn = document.getElementById('learn-more-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function() {
                const targetSection = document.querySelector('section:nth-of-type(2)');
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        // Quick action buttons
        const viewHistoryBtn = document.getElementById('view-history');
        if (viewHistoryBtn) {
            viewHistoryBtn.addEventListener('click', function() {
                showNotification('Pickup history feature coming soon!', 'info');
            });
        }
        
        const redeemRewardsBtn = document.getElementById('redeem-rewards');
        if (redeemRewardsBtn) {
            redeemRewardsBtn.addEventListener('click', function() {
                showNotification('Reward redemption feature coming soon!', 'info');
            });
        }
        
        const accountSettingsBtn = document.getElementById('account-settings');
        if (accountSettingsBtn) {
            accountSettingsBtn.addEventListener('click', function() {
                showNotification('Account settings feature coming soon!', 'info');
            });
        }
        
        const signUpBtn = document.getElementById('sign-up-now');
        if (signUpBtn) {
            signUpBtn.addEventListener('click', function() {
                window.location.href = 'onboarding.html';
            });
        }
    }

    function setupImpactAnimations() {
        // Animate impact counters
        const impactCounters = document.querySelectorAll('.impact-counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        });

        impactCounters.forEach(counter => {
            observer.observe(counter);
        });

        // Update progress bars with animation
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.bg-secondary');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });
        }
        
        // Trigger progress bar animation when section comes into view
        const impactSection = document.querySelector('section:nth-of-type(3)');
        if (impactSection) {
            const impactObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateProgressBars();
                        impactObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            impactObserver.observe(impactSection);
        }
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    function setupRouteOptimization() {
        // Route optimization features for partner dashboard
        console.log('Route optimization initialized');
    }

    function setupCollectionTracking() {
        // Collection tracking features
        console.log('Collection tracking initialized');
    }

    function setupUserManagement() {
        // User management features for admin dashboard
        console.log('User management initialized');
    }

    function setupSystemMonitoring() {
        // System monitoring features
        console.log('System monitoring initialized');
    }

    function setupTutorialProgress() {
        // Tutorial progress tracking
        console.log('Tutorial progress initialized');
    }

    // Load user preferences
    function loadUserPreferences() {
        const preferences = localStorage.getItem('ecomint_preferences');
        if (preferences) {
            try {
                const prefs = JSON.parse(preferences);
                applyUserPreferences(prefs);
            } catch (error) {
                console.error('Error loading user preferences:', error);
            }
        }
    }

    function applyUserPreferences(preferences) {
        // Apply saved user preferences
        if (preferences.theme) {
            document.body.classList.add(`theme-${preferences.theme}`);
        }
        
        if (preferences.notifications === false) {
            // Disable notifications
        }
    }

    // Initialize user data
    const userData = {
        name: 'Monica',
        rewards: 4550,
        nextPickup: {
            date: 'April 25, 2024',
            time: '10:00 AM – 12:00 PM'
        },
        impact: {
            plastic: 45.2,
            carbon: 128,
            trees: 12
        }
    };
    
    // Store user data in localStorage
    localStorage.setItem('ecomint_user', JSON.stringify(userData));

    // Global utility functions
    window.EcoMint = {
        showNotification,
        openModal,
        closeModal,
        saveFormData,
        loadFormData,
        debounce,
        formatCurrency: function(amount) {
            return new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
            }).format(amount);
        },
        formatDate: function(dateString) {
            return new Date(dateString).toLocaleDateString('en-NG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    };

    // Performance monitoring
    function trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }, 0);
            });
        }
    }

    trackPerformance();

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    document.querySelectorAll('section > div, .card-hover').forEach(el => {
        observer.observe(el);
    });
});

