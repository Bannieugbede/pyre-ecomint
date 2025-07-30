// Onboarding Guide JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    const totalSteps = 5;
    
    // Demo content for each step
    const demoContent = {
        1: {
            title: "Profile Setup Demo",
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Complete Your Profile</h4>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" value="John Doe" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" value="john.doe@email.com" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input type="tel" value="+234 801 234 5678" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input type="text" value="15 Victoria Island, Lagos" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
                        </div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                        <div class="flex items-center space-x-2">
                            <i class="ri-check-line text-green-600"></i>
                            <span class="text-sm text-green-800">Profile setup complete!</span>
                        </div>
                    </div>
                </div>
            `
        },
        2: {
            title: "Pickup Scheduling Demo",
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Schedule a Pickup</h4>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                            <input type="date" value="2024-12-15" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" disabled>
                                <option>10:00 AM - 12:00 PM</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Materials</label>
                            <div class="space-y-2">
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" checked disabled class="rounded">
                                    <span class="text-sm">Plastic Bottles</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" checked disabled class="rounded">
                                    <span class="text-sm">Cardboard</span>
                                </label>
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" disabled class="rounded">
                                    <span class="text-sm">Glass Bottles</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                        <div class="flex items-center space-x-2">
                            <i class="ri-calendar-check-line text-blue-600"></i>
                            <span class="text-sm text-blue-800">Pickup scheduled successfully!</span>
                        </div>
                    </div>
                </div>
            `
        },
        3: {
            title: "Rewards System Demo",
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Your Rewards</h4>
                    <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 mb-4">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-green-600 mb-1">1,250</div>
                            <div class="text-sm text-green-700">EcoPoints Available</div>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i class="ri-bottle-line text-blue-600 text-sm"></i>
                                </div>
                                <div>
                                    <div class="font-medium text-sm">Plastic Bottles</div>
                                    <div class="text-xs text-gray-500">2.5 kg collected</div>
                                </div>
                            </div>
                            <div class="text-green-600 font-medium">+125 pts</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <i class="ri-file-paper-line text-yellow-600 text-sm"></i>
                                </div>
                                <div>
                                    <div class="font-medium text-sm">Cardboard</div>
                                    <div class="text-xs text-gray-500">1.8 kg collected</div>
                                </div>
                            </div>
                            <div class="text-green-600 font-medium">+90 pts</div>
                        </div>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                        <div class="flex items-center space-x-2">
                            <i class="ri-coins-line text-yellow-600"></i>
                            <span class="text-sm text-yellow-800">Ready to redeem: ₦625 available</span>
                        </div>
                    </div>
                </div>
            `
        },
        4: {
            title: "Impact Tracking Demo",
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Your Environmental Impact</h4>
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="bg-green-50 rounded-lg p-3 text-center">
                            <div class="text-2xl font-bold text-green-600">12</div>
                            <div class="text-xs text-green-700">Trees Saved</div>
                        </div>
                        <div class="bg-blue-50 rounded-lg p-3 text-center">
                            <div class="text-2xl font-bold text-blue-600">45kg</div>
                            <div class="text-xs text-blue-700">CO₂ Offset</div>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">Waste Diverted</span>
                            <span class="font-medium">28.5 kg</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 75%"></div>
                        </div>
                        <div class="text-xs text-gray-500 text-center">75% of monthly goal achieved</div>
                    </div>
                    <div class="space-y-2 mt-4">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-600">Energy Saved</span>
                            <span class="font-medium">156 kWh</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-600">Water Saved</span>
                            <span class="font-medium">1,240 L</span>
                        </div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                        <div class="flex items-center space-x-2">
                            <i class="ri-leaf-line text-green-600"></i>
                            <span class="text-sm text-green-800">Great job! You're making a real difference!</span>
                        </div>
                    </div>
                </div>
            `
        },
        5: {
            title: "Ready to Start!",
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Congratulations!</h4>
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="ri-trophy-line text-green-600 text-3xl"></i>
                        </div>
                        <p class="text-gray-600">You've completed the EcoMint tutorial and are ready to start earning from your recyclables!</p>
                    </div>
                    <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 mb-4">
                        <h5 class="font-semibold text-gray-800 mb-2">What's Next?</h5>
                        <ul class="space-y-1 text-sm text-gray-600">
                            <li>• Complete your profile setup</li>
                            <li>• Schedule your first pickup</li>
                            <li>• Start earning EcoPoints</li>
                            <li>• Track your environmental impact</li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-600 mb-1">Welcome to EcoMint!</div>
                        <div class="text-sm text-gray-600">Let's make the world greener together</div>
                    </div>
                </div>
            `
        }
    };

    // Initialize onboarding
    initializeOnboarding();
    setupEventListeners();
    updateDemoContent();

    function initializeOnboarding() {
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
        // Welcome section buttons
        document.getElementById('start-tutorial')?.addEventListener('click', startTutorial);
        document.getElementById('skip-to-home')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        document.getElementById('skip-tutorial')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Navigation buttons
        document.getElementById('prev-step')?.addEventListener('click', previousStep);
        document.getElementById('next-step')?.addEventListener('click', nextStep);

        // Final action buttons
        document.getElementById('schedule-first-pickup')?.addEventListener('click', () => {
            window.location.href = 'index.html#schedule-pickup';
        });
        document.getElementById('explore-dashboard')?.addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Step indicators
        const stepIndicators = document.querySelectorAll('.step-indicator');
        stepIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToStep(index + 1);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && currentStep > 1) {
                previousStep();
            } else if (e.key === 'ArrowRight' && currentStep < totalSteps) {
                nextStep();
            } else if (e.key === 'Escape') {
                window.location.href = 'index.html';
            }
        });
    }

    function startTutorial() {
        document.getElementById('welcome-section').classList.add('hidden');
        document.getElementById('tutorial-container').classList.remove('hidden');
        updateProgress();
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStep();
            updateProgress();
        }
    }

    function previousStep() {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
            updateProgress();
        }
    }

    function goToStep(step) {
        if (step >= 1 && step <= totalSteps) {
            currentStep = step;
            updateStep();
            updateProgress();
        }
    }

    function updateStep() {
        // Hide all step content
        const stepContents = document.querySelectorAll('.step-content');
        stepContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Show current step content
        const currentStepContent = document.getElementById(`step-${currentStep}`);
        if (currentStepContent) {
            currentStepContent.classList.remove('hidden');
        }

        // Update step title
        const stepTitles = {
            1: 'Step 1: Account Setup',
            2: 'Step 2: Schedule Pickups',
            3: 'Step 3: Understanding Rewards',
            4: 'Step 4: Track Your Impact',
            5: 'Step 5: You\'re Ready!'
        };
        
        const stepTitle = document.getElementById('step-title');
        if (stepTitle) {
            stepTitle.textContent = stepTitles[currentStep];
        }

        // Update step counter
        const stepCounter = document.getElementById('step-counter');
        if (stepCounter) {
            stepCounter.textContent = `${currentStep} of ${totalSteps}`;
        }

        // Update navigation buttons
        const prevButton = document.getElementById('prev-step');
        const nextButton = document.getElementById('next-step');
        
        if (prevButton) {
            prevButton.disabled = currentStep === 1;
        }
        
        if (nextButton) {
            if (currentStep === totalSteps) {
                nextButton.textContent = 'Get Started';
                nextButton.onclick = () => window.location.href = 'index.html';
            } else {
                nextButton.innerHTML = 'Next <i class="ri-arrow-right-line ml-2"></i>';
                nextButton.onclick = nextStep;
            }
        }

        // Update step indicators
        const stepIndicators = document.querySelectorAll('.step-indicator');
        stepIndicators.forEach((indicator, index) => {
            if (index + 1 === currentStep) {
                indicator.classList.add('bg-secondary');
                indicator.classList.remove('bg-gray-300');
            } else if (index + 1 < currentStep) {
                indicator.classList.add('bg-green-400');
                indicator.classList.remove('bg-gray-300', 'bg-secondary');
            } else {
                indicator.classList.add('bg-gray-300');
                indicator.classList.remove('bg-secondary', 'bg-green-400');
            }
        });

        // Update demo content
        updateDemoContent();

        // Add animation classes
        const stepContent = document.getElementById(`step-${currentStep}`);
        if (stepContent) {
            stepContent.classList.add('slide-in-left');
            setTimeout(() => {
                stepContent.classList.remove('slide-in-left');
            }, 500);
        }
    }

    function updateProgress() {
        const progressPercentage = (currentStep / totalSteps) * 100;
        
        // Update main progress bar
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }

        // Update header progress bar
        const headerProgress = document.getElementById('header-progress');
        if (headerProgress) {
            headerProgress.style.width = `${progressPercentage}%`;
        }
    }

    function updateDemoContent() {
        const demoContainer = document.getElementById('demo-container');
        if (demoContainer && demoContent[currentStep]) {
            demoContainer.innerHTML = demoContent[currentStep].content;
            
            // Add animation
            demoContainer.classList.add('slide-in-right');
            setTimeout(() => {
                demoContainer.classList.remove('slide-in-right');
            }, 500);
        }
    }

    // Auto-advance demo (optional)
    function startAutoAdvance() {
        const autoAdvanceInterval = setInterval(() => {
            if (currentStep < totalSteps) {
                nextStep();
            } else {
                clearInterval(autoAdvanceInterval);
            }
        }, 10000); // Advance every 10 seconds

        // Clear auto-advance on user interaction
        document.addEventListener('click', () => {
            clearInterval(autoAdvanceInterval);
        }, { once: true });
    }

    // Progress tracking
    function trackProgress() {
        const progressData = {
            currentStep: currentStep,
            completedSteps: currentStep - 1,
            totalSteps: totalSteps,
            timestamp: new Date().toISOString()
        };
        
        // Store progress in localStorage
        localStorage.setItem('ecomint_onboarding_progress', JSON.stringify(progressData));
    }

    // Load saved progress
    function loadProgress() {
        const savedProgress = localStorage.getItem('ecomint_onboarding_progress');
        if (savedProgress) {
            const progressData = JSON.parse(savedProgress);
            if (progressData.currentStep && progressData.currentStep <= totalSteps) {
                currentStep = progressData.currentStep;
                updateStep();
                updateProgress();
            }
        }
    }

    // Initialize with saved progress
    loadProgress();

    // Track progress on step changes
    const originalNextStep = nextStep;
    const originalPreviousStep = previousStep;
    
    nextStep = function() {
        originalNextStep();
        trackProgress();
    };
    
    previousStep = function() {
        originalPreviousStep();
        trackProgress();
    };

    // Show completion notification
    function showCompletionNotification() {
        if (currentStep === totalSteps) {
            const notification = document.createElement('div');
            notification.className = 'fixed top-24 right-4 z-50 bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300';
            notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="ri-trophy-line text-2xl"></i>
                    <div>
                        <div class="font-semibold">Tutorial Complete!</div>
                        <div class="text-sm opacity-90">Welcome to EcoMint</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
    }

    // Call completion notification when reaching final step
    const originalGoToStep = goToStep;
    goToStep = function(step) {
        originalGoToStep(step);
        if (step === totalSteps) {
            setTimeout(showCompletionNotification, 500);
        }
    };
});

