// JavaScript for hashtag-based filtering system

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
            filterByHashtag(tag);
            
            // Update URL with the hashtag
            window.history.pushState({}, '', `?tag=${tag}`);
            
            // Show active filter
            showActiveFilter(tag);
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
}
