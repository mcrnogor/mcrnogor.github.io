// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.setAttribute('title', 'Toggle dark mode');
    
    // Create icons for sun and moon
    const moonIcon = document.createElement('span');
    moonIcon.className = 'icon-moon';
    moonIcon.innerHTML = '🌙';
    
    const sunIcon = document.createElement('span');
    sunIcon.className = 'icon-sun';
    sunIcon.innerHTML = '☀️';
    
    // Add icons to button
    toggleButton.appendChild(moonIcon);
    toggleButton.appendChild(sunIcon);
    
    // Add button to body
    document.body.appendChild(toggleButton);
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    // Apply theme based on saved preference or OS preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    toggleButton.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme === 'light') {
            newTheme = 'dark';
        }
        
        // Apply new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
    });
    
    // Listen for OS theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        // Only apply OS preference if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
});
