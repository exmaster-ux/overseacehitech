/**
 * OVERSEACE HITECH Performance Optimization Script
 * Implements lazy loading, image optimization, and performance enhancements
 */

class PerformanceOptimizer {
    constructor() {
        this.lazyImages = [];
        this.lazyVideos = [];
        this.observer = null;
        this.teamImageObserver = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupOptimizations());
        } else {
            this.setupOptimizations();
        }
    }

    setupOptimizations() {
        this.setupLazyLoading();
        this.optimizeImages();
        this.optimizeVideos();
        this.preloadCriticalResources();
        this.setupProgressiveLoading();
        this.optimizeTeamImages();
        this.enhanceTeamNavigation();
        this.animateTeamCards();
    }

    // Lazy Loading Implementation
    setupLazyLoading() {
        // Check for Intersection Observer support
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadElement(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            this.setupLazyImages();
            this.setupLazyVideos();
        } else {
            // Fallback for older browsers
            this.loadAllElements();
        }
    }

    setupLazyImages() {
        // Find all images that should be lazy loaded
        const images = document.querySelectorAll('img[data-src], img[src*="unsplash"], .gallery-item img');
        
        images.forEach(img => {
            if (!img.dataset.optimized) {
                this.prepareLazyImage(img);
                this.observer.observe(img);
            }
        });
    }

    setupLazyVideos() {
        // Find all videos that should be lazy loaded
        const videos = document.querySelectorAll('video, .gallery-item video');
        
        videos.forEach(video => {
            if (!video.dataset.optimized) {
                this.prepareLazyVideo(video);
                this.observer.observe(video);
            }
        });
    }

    prepareLazyImage(img) {
        // Store original src and create placeholder
        if (img.src && !img.dataset.src) {
            img.dataset.src = img.src;
            img.src = this.createPlaceholder(img.offsetWidth || 300, img.offsetHeight || 200);
        }
        
        img.style.filter = 'blur(5px)';
        img.style.transition = 'filter 0.3s ease';
        img.dataset.lazy = 'true';
    }

    prepareLazyVideo(video) {
        // Remove autoplay and preload for lazy loading
        video.removeAttribute('autoplay');
        video.setAttribute('preload', 'none');
        video.dataset.lazy = 'true';
        
        // Create poster if not exists
        if (!video.poster) {
            video.poster = this.createVideoPlaceholder();
        }
    }

    loadElement(element) {
        if (element.tagName === 'IMG') {
            this.loadImage(element);
        } else if (element.tagName === 'VIDEO') {
            this.loadVideo(element);
        }
    }

    loadImage(img) {
        if (img.dataset.src) {
            const tempImg = new Image();
            tempImg.onload = () => {
                img.src = img.dataset.src;
                img.style.filter = 'none';
                img.dataset.optimized = 'true';
                img.classList.add('loaded');
            };
            tempImg.onerror = () => {
                img.style.filter = 'none';
                img.classList.add('error');
            };
            tempImg.src = img.dataset.src;
        }
    }

    loadVideo(video) {
        video.setAttribute('preload', 'metadata');
        video.dataset.optimized = 'true';
        video.classList.add('loaded');
    }

    // Image Optimization
    optimizeImages() {
        // Add WebP support detection
        this.detectWebPSupport().then(supportsWebP => {
            if (supportsWebP) {
                document.documentElement.classList.add('webp-support');
            }
        });
    }

    detectWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    // Video Optimization
    optimizeVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Optimize video loading
            video.setAttribute('preload', 'none');
            video.setAttribute('playsinline', '');
            
            // Add loading indicator
            this.addVideoLoadingIndicator(video);
        });
    }

    addVideoLoadingIndicator(video) {
        const container = video.parentElement;
        const loader = document.createElement('div');
        loader.className = 'video-loader';
        loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #2563eb;
            font-size: 24px;
            z-index: 10;
        `;
        
        container.style.position = 'relative';
        container.appendChild(loader);
        
        video.addEventListener('loadeddata', () => {
            loader.remove();
        });
    }

    // Progressive Loading
    setupProgressiveLoading() {
        // Load critical images first
        this.loadCriticalImages();
        
        // Defer non-critical resources
        setTimeout(() => {
            this.loadNonCriticalResources();
        }, 1000);
    }

    loadCriticalImages() {
        // Load hero images, logos, and managing director image immediately
        const criticalImages = document.querySelectorAll('.hero img, .company-logo, header img, #team .managing-director-card img');
        criticalImages.forEach(img => {
            if (img.dataset.lazy) {
                this.loadImage(img);
            }
        });
    }

    loadNonCriticalResources() {
        // Load remaining images and videos
        const nonCriticalElements = document.querySelectorAll('.gallery-item img, .gallery-item video, #team .team-member-card img');
        nonCriticalElements.forEach(element => {
            if (element.dataset.lazy && !element.dataset.optimized) {
                this.observer.observe(element);
            }
        });
    }

    // Preload Critical Resources
    preloadCriticalResources() {
        // Preload critical CSS and fonts
        this.preloadResource('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', 'style');
        this.preloadResource('https://cdn.tailwindcss.com', 'script');
        
        // Preload critical team images
        const criticalTeamImages = [
            'images/company-logo/company-logo.png',
            'images/hero/hero-slide-1.jpg',
            'images/team/ernest-mwakasenga.jpg'
        ];

        criticalTeamImages.forEach(src => {
            this.preloadResource(src, 'image');
        });
    }

    preloadResource(href, as) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    }

    // Team Images Optimization
    optimizeTeamImages() {
        const teamImages = document.querySelectorAll('#team img');
        
        teamImages.forEach(img => {
            // Add loading="lazy" for better performance
            img.setAttribute('loading', 'lazy');
            
            // Add error handling for missing images
            img.addEventListener('error', function() {
                console.log(`Team image not found: ${this.src}`);
                // Fallback is handled in HTML with onerror attribute
                this.handleTeamImageError();
            });

            // Add load event for smooth transitions
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 100);
            });

            // Add loading animation
            img.classList.add('team-image-loading');
            img.addEventListener('load', () => {
                img.classList.remove('team-image-loading');
            });
        });
    }

    // Team Image Error Handling
    handleTeamImageError(img) {
        const placeholder = img.nextElementSibling;
        if (placeholder) {
            img.style.display = 'none';
            placeholder.style.display = 'flex';
        }
    }

    // Smooth scroll enhancement for team section
    enhanceTeamNavigation() {
        const teamLinks = document.querySelectorAll('a[href="#team"]');
        teamLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const teamSection = document.getElementById('team');
                if (teamSection) {
                    teamSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Add animation to team cards on scroll
    animateTeamCards() {
        const teamCards = document.querySelectorAll('#team .bg-white.rounded-xl');
        
        if (!teamCards.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate-fade-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        teamCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Animate team statistics
        this.animateTeamStats();
    }

    // Animate team statistics counters
    animateTeamStats() {
        const statNumbers = document.querySelectorAll('#team .text-3xl.font-bold');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent.replace(/\D/g, '');
                    if (finalValue) {
                        this.animateCounter(target, 0, parseInt(finalValue), 2000);
                    }
                    statsObserver.unobserve(target);
                }
            });
        });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Counter animation helper
    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const suffix = element.textContent.replace(/\d/g, '');

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Utility Functions
    createPlaceholder(width, height) {
        // Create a simple SVG placeholder
        return `data:image/svg+xml;base64,${btoa(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f3f4f6"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Loading...</text>
            </svg>
        `)}`;
    }

    createVideoPlaceholder() {
        return `data:image/svg+xml;base64,${btoa(`
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#1f2937"/>
                <circle cx="150" cy="100" r="30" fill="#3b82f6"/>
                <polygon points="140,85 140,115 165,100" fill="white"/>
            </svg>
        `)}`;
    }

    // Fallback for older browsers
    loadAllElements() {
        const allImages = document.querySelectorAll('img[data-src]');
        const allVideos = document.querySelectorAll('video[data-lazy]');
        
        allImages.forEach(img => this.loadImage(img));
        allVideos.forEach(video => this.loadVideo(video));
    }

    // Team member data management
    async loadTeamData() {
        try {
            const response = await fetch('data/team-members.json');
            if (response.ok) {
                const teamData = await response.json();
                this.renderTeamMembers(teamData);
            }
        } catch (error) {
            console.log('Team data file not found, using HTML structure');
        }
    }

    renderTeamMembers(teamData) {
        // This method can be used to dynamically render team members
        // if you want to manage team data through JSON instead of HTML
        console.log('Team data loaded:', teamData);
    }
}

// Global team image error handler
window.handleTeamImageError = function(img) {
    const placeholder = img.nextElementSibling;
    if (placeholder) {
        img.style.display = 'none';
        placeholder.style.display = 'flex';
    }
};

// Initialize performance optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Export for use in other scripts
window.PerformanceOptimizer = PerformanceOptimizer;

// Additional team-specific optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Add team member number badges
    const teamCards = document.querySelectorAll('#team .bg-white.rounded-xl');
    
    teamCards.forEach((card, index) => {
        const teamMemberText = card.querySelector('.text-sm.text-gray-600');
        if (teamMemberText && teamMemberText.textContent.includes('Team Member')) {
            const imageContainer = card.querySelector('.h-64, .w-32.h-32');
            if (imageContainer) {
                const badge = document.createElement('div');
                badge.className = 'team-member-number';
                badge.textContent = teamMemberText.textContent.split('#')[1] || String(index + 1).padStart(3, '0');
                badge.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: rgba(37, 99, 235, 0.9);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    backdrop-filter: blur(4px);
                    z-index: 10;
                `;
                imageContainer.style.position = 'relative';
                imageContainer.appendChild(badge);
            }
        }
    });

    // Add special styling for managing director
    const managingDirectorCard = document.querySelector('#team .bg-white.rounded-xl');
    if (managingDirectorCard && managingDirectorCard.textContent.includes('Managing Director')) {
        managingDirectorCard.classList.add('managing-director-card');
        managingDirectorCard.style.cssText += `
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px solid #3b82f6;
            position: relative;
        `;
        
        // Add star indicator
        const star = document.createElement('div');
        star.innerHTML = '★';
        star.style.cssText = `
            position: absolute;
            top: 15px;
            left: 15px;
            color: #fbbf24;
            font-size: 1.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            z-index: 10;
        `;
        managingDirectorCard.appendChild(star);
    }

    // Enhanced hover effects for team cards
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });

        // Add shimmer effect
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
            z-index: 1;
            pointer-events: none;
        `;
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(shimmer);

        card.addEventListener('mouseenter', function() {
            shimmer.style.left = '100%';
        });

        card.addEventListener('mouseleave', function() {
            shimmer.style.left = '-100%';
        });
    });

    // Optimize team images with progressive loading
    const teamImages = document.querySelectorAll('#team img');
    teamImages.forEach((img, index) => {
        // Stagger loading of team images
        setTimeout(() => {
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
            }
        }, index * 200);

        // Add loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });

    // Team section scroll animations
    const teamSection = document.getElementById('team');
    if (teamSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Trigger team statistics animation
                    const stats = entry.target.querySelectorAll('.text-3xl.font-bold');
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.classList.add('team-stat-number');
                        }, index * 200);
                    });
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(teamSection);
    }

    // Add keyboard navigation for team cards
    teamCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Team member ${index + 1}`);

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Could trigger a modal or detailed view
                console.log('Team member selected:', this.querySelector('h3').textContent);
            }
        });
    });

    // Performance monitoring for team images
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.name.includes('team') && entry.name.includes('.jpg')) {
                    console.log(`Team image loaded: ${entry.name} in ${entry.duration}ms`);
                }
            });
        });
        observer.observe({ entryTypes: ['resource'] });
    }

    // Add error boundary for team section
    window.addEventListener('error', function(e) {
        if (e.filename && e.filename.includes('team')) {
            console.warn('Team section error handled:', e.message);
            // Could show fallback content or retry loading
        }
    });
});

// Team-specific utility functions
window.TeamUtils = {
    // Function to dynamically add new team member
    addTeamMember: function(memberData) {
        const teamGrid = document.querySelector('#team .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
        if (teamGrid && memberData) {
            const memberCard = this.createTeamMemberCard(memberData);
            teamGrid.insertBefore(memberCard, teamGrid.lastElementChild);
        }
    },

    // Function to create team member card HTML
    createTeamMemberCard: function(data) {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300';
        card.innerHTML = `
            <div class="h-64 bg-gray-100 overflow-hidden">
                <img src="${data.image}" 
                     alt="${data.name} - ${data.position}" 
                     class="w-full h-full object-cover hover:scale-105 transition duration-300"
                     onerror="handleTeamImageError(this)">
                <div class="w-full h-full bg-blue-100 flex items-center justify-center" style="display: none;">
                    <i class="${data.icon || 'fas fa-user'} text-blue-600 text-6xl"></i>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold text-blue-800 mb-1">${data.name}</h3>
                <p class="text-blue-600 font-medium mb-2">${data.position}</p>
                <p class="text-sm text-gray-600 mb-3">Team Member #${data.id}</p>
                <p class="text-sm text-gray-700">${data.description}</p>
            </div>
        `;
        return card;
    },

    // Function to update team member info
    updateTeamMember: function(memberId, newData) {
        const memberCard = document.querySelector(`#team [data-member-id="${memberId}"]`);
        if (memberCard) {
            // Update member information
            Object.keys(newData).forEach(key => {
                const element = memberCard.querySelector(`[data-field="${key}"]`);
                if (element) {
                    element.textContent = newData[key];
                }
            });
        }
    },

    // Function to get team member data
    getTeamMemberData: function(memberId) {
        const memberCard = document.querySelector(`#team [data-member-id="${memberId}"]`);
        if (memberCard) {
            return {
                name: memberCard.querySelector('h3').textContent,
                position: memberCard.querySelector('.text-blue-600').textContent,
                description: memberCard.querySelector('.text-gray-700').textContent
            };
        }
        return null;
    }
};

// Export team utilities
window.TeamOptimizer = {
    preloadTeamImages: function() {
        const teamImagePaths = [
            'images/team/ernest-mwakasenga.jpg',
            'images/team/wendo-kaisi.jpg',
            'images/team/fatma-mmwamtemi.jpg',
            'images/team/saumu-shabani.jpg',
            'images/team/joyce-mkamila.jpg',
            'images/team/haule-nicholaus.jpg'
        ];

        teamImagePaths.forEach(path => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = path;
            document.head.appendChild(link);
        });
    },

    optimizeTeamSection: function() {
        // Lazy load team images that are not in viewport
        const teamImages = document.querySelectorAll('#team img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });

        teamImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
};

// Initialize team optimizations
document.addEventListener('DOMContentLoaded', function() {
    if (window.TeamOptimizer) {
        window.TeamOptimizer.preloadTeamImages();
        window.TeamOptimizer.optimizeTeamSection();
    }
});

