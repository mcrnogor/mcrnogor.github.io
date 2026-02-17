// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create and insert hamburger menu button
    createHamburgerMenu();

    // Initialize mobile menu functionality
    initializeMobileMenu();

    // Check viewport size and add appropriate classes
    function checkViewport() {
        const viewportWidth = window.innerWidth;
        document.body.classList.remove('mobile', 'tablet', 'desktop');

        if (viewportWidth <= 480) {
            document.body.classList.add('mobile');
        } else if (viewportWidth <= 768) {
            document.body.classList.add('tablet');
        } else {
            document.body.classList.add('desktop');
            // Close mobile menu if window is resized to desktop
            const mobileNav = document.querySelector('.col-md-12');
            if (mobileNav) {
                mobileNav.classList.remove('mobile-menu-open');
            }
        }
    }

    // Run on load and resize
    checkViewport();
    window.addEventListener('resize', checkViewport);
});

function createHamburgerMenu() {
    // Find the header
    const header = document.querySelector('.header-block');
    if (!header) return;

    // Check if hamburger already exists
    if (document.querySelector('.mobile-menu-toggle')) return;

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'mobile-menu-toggle';
    hamburger.setAttribute('aria-label', 'Toggle mobile menu');
    hamburger.innerHTML = '☰';

    // Insert hamburger button
    header.insertBefore(hamburger, header.firstChild);
}

function initializeMobileMenu() {
    const hamburger = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.col-md-12');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (!hamburger || !mobileNav) return;

    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileNav.classList.toggle('mobile-menu-open');

        // Change icon
        if (mobileNav.classList.contains('mobile-menu-open')) {
            hamburger.innerHTML = '✕';
        } else {
            hamburger.innerHTML = '☰';
            // Close all dropdowns when menu closes
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });

    // Handle dropdown clicks in mobile menu
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');

        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Only toggle dropdowns on mobile
                if (window.innerWidth <= 768) {
                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown && d.classList.contains('active')) {
                            d.classList.remove('active');
                        }
                    });

                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.header-block')) {
                mobileNav.classList.remove('mobile-menu-open');
                hamburger.innerHTML = '☰';
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        }
    });

    // Close mobile menu when clicking a link (but not dropdown button)
    const navLinks = mobileNav.querySelectorAll('a:not(.dropbtn)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileNav.classList.remove('mobile-menu-open');
                hamburger.innerHTML = '☰';
                dropdowns.forEach(d => d.classList.remove('active'));
            }
        });
    });
}
