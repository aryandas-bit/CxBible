// Main JavaScript for CodeX
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeSearchToggle();
    initializeScrollEffects();
    initializeContent();
});

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });

            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });

            // Close mobile menu if open
            const navList = document.getElementById('navList');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });
}

function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
            }
        });
    }
}

function initializeSearchToggle() {
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');

    if (searchToggle && searchInput) {
        searchToggle.addEventListener('click', function() {
            searchInput.focus();
        });
    }
}

function initializeScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow to header on scroll
        if (scrollTop > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Navigation function for overview cards
function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
            navLink.classList.add('active');
        }

        // Scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open
        const navList = document.getElementById('navList');
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();

            // Clear search results
            const existingResults = document.querySelector('.search-results');
            if (existingResults) {
                existingResults.remove();
            }

            // Show overview
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById('overview').classList.add('active');
        }
    }
});



// Performance monitoring
if ('performance' in window && 'timing' in performance) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`CodeX loaded in ${loadTime}ms`);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('CodeX Error:', e.error);
    // Could send error reports to monitoring service here
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('CodeX Unhandled Promise Rejection:', e.reason);
    // Could send error reports to monitoring service here
});
