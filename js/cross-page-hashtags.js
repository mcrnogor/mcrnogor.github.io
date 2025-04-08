// Cross-page hashtag system design
// This file will replace the current hashtag-system.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hashtag click events
    initHashtagSystem();
    
    // Check if there's a hashtag in the URL
    checkUrlForHashtag();
});

function initHashtagSystem() {
    // Add click events to all hashtags
    const hashtags = document.querySelectorAll('.hashtag');
    
    hashtags.forEach(hashtag => {
        hashtag.addEventListener('click', function(e) {
            e.preventDefault();
            const tag = this.getAttribute('data-tag');
            
            // If on main research page, redirect to appropriate subpage with tag
            if (window.location.pathname.endsWith('research.html')) {
                redirectToRelevantPage(tag);
            } else {
                // On subpage, filter locally
                filterByHashtag(tag);
                
                // Update URL with the hashtag
                window.history.pushState({}, '', `?tag=${tag}`);
                
                // Show active filter
                showActiveFilter(tag);
            }
        });
    });
    
    // Add click event to reset filters button if it exists
    const resetButton = document.querySelector('.reset-filters');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            resetFilters();
            
            // Remove hashtag from URL
            window.history.pushState({}, '', window.location.pathname);
            
            // Hide active filter
            hideActiveFilter();
        });
    }
}

function redirectToRelevantPage(tag) {
    // Map of tags to their primary research areas
    // This can be expanded as needed
    const tagToPageMap = {
        'DarkMatter': 'dmnp.html',
        'GammaRay': 'dmnp.html',
        'Fermi': 'dmnp.html',
        'Axions': 'dmnp.html',
        'MMA': 'mma.html',
        'GRB': 'mma.html',
        'Neutrino': 'mma.html',
        'Thesis': 'past.html'
    };
    
    // Default to dmnp if tag not found
    const targetPage = tagToPageMap[tag] || 'dmnp.html';
    
    // Redirect to the appropriate page with the tag parameter
    window.location.href = `research-pages/${targetPage}?tag=${tag}`;
}

function filterByHashtag(tag) {
    const publications = document.querySelectorAll('.publication');
    
    publications.forEach(pub => {
        const pubHashtags = pub.querySelectorAll('.hashtag');
        let hasTag = false;
        
        pubHashtags.forEach(hashtag => {
            if (hashtag.getAttribute('data-tag') === tag) {
                hasTag = true;
            }
        });
        
        if (hasTag) {
            pub.classList.remove('filtered-out');
        } else {
            pub.classList.add('filtered-out');
        }
    });
}

function resetFilters() {
    const publications = document.querySelectorAll('.publication');
    
    publications.forEach(pub => {
        pub.classList.remove('filtered-out');
    });
}

function checkUrlForHashtag() {
    const urlParams = new URLSearchParams(window.location.search);
    const tag = urlParams.get('tag');
    
    if (tag) {
        filterByHashtag(tag);
        showActiveFilter(tag);
        
        // Add a "View All Research Areas" link when filtered
        addViewAllResearchLink();
    }
}

function showActiveFilter(tag) {
    // Remove any existing active filter
    hideActiveFilter();
    
    // Create active filter element
    const filtersContainer = document.querySelector('.filters-container');
    if (!filtersContainer) return;
    
    const activeFilter = document.createElement('div');
    activeFilter.classList.add('active-filter');
    activeFilter.textContent = `#${tag}`;
    activeFilter.id = 'active-filter';
    
    filtersContainer.appendChild(activeFilter);
    filtersContainer.style.display = 'flex';
}

function hideActiveFilter() {
    const activeFilter = document.getElementById('active-filter');
    if (activeFilter) {
        activeFilter.remove();
    }
    
    const filtersContainer = document.querySelector('.filters-container');
    if (filtersContainer) {
        filtersContainer.style.display = 'none';
    }
    
    // Remove the "View All Research Areas" link if it exists
    const viewAllLink = document.getElementById('view-all-research');
    if (viewAllLink) {
        viewAllLink.remove();
    }
}

function addViewAllResearchLink() {
    // Check if link already exists
    if (document.getElementById('view-all-research')) return;
    
    const filtersContainer = document.querySelector('.filters-container');
    if (!filtersContainer) return;
    
    const viewAllLink = document.createElement('a');
    viewAllLink.href = '../research.html';
    viewAllLink.textContent = 'View All Research Areas';
    viewAllLink.id = 'view-all-research';
    viewAllLink.classList.add('view-all-link');
    
    filtersContainer.appendChild(viewAllLink);
}

// Function to check if a tag exists across multiple pages
// This will be used for the global search functionality
function findPagesWithTag(tag) {
    // This would ideally be generated from a site map or content index
    // For now, we'll hardcode the mapping of tags to pages
    const tagPageMap = {
        'DarkMatter': ['dmnp.html'],
        'GammaRay': ['dmnp.html', 'mma.html'],
        'Fermi': ['dmnp.html', 'mma.html'],
        'Axions': ['dmnp.html'],
        'MMA': ['mma.html'],
        'GRB': ['mma.html'],
        'Neutrino': ['mma.html'],
        'Thesis': ['past.html']
    };
    
    return tagPageMap[tag] || [];
}
