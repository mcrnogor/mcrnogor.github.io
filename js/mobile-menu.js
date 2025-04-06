// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Convert hover dropdowns to click dropdowns on mobile
    if (window.innerWidth <= 768) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            
            // Add click event to dropdown buttons
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown && d.classList.contains('active')) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
    }
    
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
        }
    }
    
    // Run on load and resize
    checkViewport();
    window.addEventListener('resize', checkViewport);
});
