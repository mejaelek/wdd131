// Main JavaScript file for Nature's Canvas Photography Portfolio

// DOM elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const newsletterForm = document.getElementById('newsletter-form');
const featuredGallery = document.getElementById('featured-gallery');
const statNumbers = document.querySelectorAll('.stat-number');

// Photography data array
const photographyData = [
    {
        id: 1,
        title: "Alpine Serenity",
        description: "Majestic mountain peaks at golden hour",
        image: "assets/images/alpine-serenity.webp",
        category: "mountains",
        location: "Swiss Alps",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 2,
        title: "Ocean Majesty",
        description: "Powerful waves crashing against coastal cliffs",
        image: "assets/images/ocean-majesty.webp",
        category: "ocean",
        location: "Big Sur, California",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 3,
        title: "Enchanted Forest",
        description: "Sunlight filtering through ancient redwoods",
        image: "assets/images/enchanted-forest.webp",
        category: "forest",
        location: "Redwood National Park",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 4,
        title: "Desert Solitude",
        description: "Vast sand dunes under starry night sky",
        image: "assets/images/desert-solitude.webp",
        category: "desert",
        location: "Sahara Desert",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 5,
        title: "Mountain Reflection",
        description: "Perfect mirror image in alpine lake",
        image: "assets/images/mountain-reflection.webp",
        category: "lake",
        location: "Canadian Rockies",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 6,
        title: "Autumn Colors",
        description: "Vibrant fall foliage in New England",
        image: "assets/images/autumn-colors.webp",
        category: "forest",
        location: "Vermont, USA",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 7,
        title: "Coastal Sunset",
        description: "Dramatic colors over ocean horizon",
        image: "assets/images/coastal-sunset.webp",
        category: "ocean",
        location: "Oregon Coast",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 8,
        title: "Misty Peaks",
        description: "Fog rolling through mountain valleys",
        image: "assets/images/misty-peaks.webp",
        category: "mountains",
        location: "Dolomites, Italy",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 9,
        title: "Canyon Depth",
        description: "Towering rock formations in desert canyon",
        image: "assets/images/canyon-depth.webp",
        category: "desert",
        location: "Grand Canyon",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 10,
        title: "Northern Lights",
        description: "Aurora borealis over frozen lake",
        image: "assets/images/northern-lights.webp",
        category: "lake",
        location: "Iceland",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 11,
        title: "Waterfall Mist",
        description: "Powerful waterfall in lush rainforest",
        image: "assets/images/waterfall-mists.webp",
        category: "forest",
        location: "Pacific Northwest",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    },
    {
        id: 12,
        title: "Desert Bloom",
        description: "Wildflowers in arid landscape",
        image: "assests/images/desert-bloom.webp",
        category: "desert",
        location: "Arizona, USA",
        width: 1200,
        height: 800,
        aspectRatio: "3:2"
    }
];


// User preferences object
const userPreferences = {
    favoriteImages: [],
    visitCount: 0,
    lastVisit: null,
    emailSubscribed: false
};

// Initialize the website
function initializeWebsite() {
    loadUserPreferences();
    updateVisitCount();
    setupEventListeners();
    loadFeaturedGallery();
    setupLazyLoading();
    animateStats();
    checkFirstVisit();
}

// Load user preferences from localStorage
function loadUserPreferences() {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
        Object.assign(userPreferences, JSON.parse(savedPreferences));
    }
}

// Save user preferences to localStorage
function saveUserPreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

// Update visit count
function updateVisitCount() {
    userPreferences.visitCount += 1;
    userPreferences.lastVisit = new Date().toISOString();
    saveUserPreferences();
}

// Check if this is user's first visit
function checkFirstVisit() {
    if (userPreferences.visitCount === 1) {
        setTimeout(() => {
            showWelcomeMessage();
        }, 2000);
    }
}

// Show welcome message for first-time visitors
function showWelcomeMessage() {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-toast';
    welcomeMessage.innerHTML = `
        <div class="toast-content">
            <h4>Welcome to Nature's Canvas!</h4>
            <p>This is your first visit. Explore our stunning photography collection!</p>
            <button onclick="dismissWelcome()" class="toast-close">×</button>
        </div>
    `;

    // Add toast styles
    welcomeMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 1500;
        max-width: 300px;
        animation: slideIn 0.5s ease;
    `;

    document.body.appendChild(welcomeMessage);
}

// Dismiss welcome message
function dismissWelcome() {
    const welcomeToast = document.querySelector('.welcome-toast');
    if (welcomeToast) {
        welcomeToast.remove();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Close mobile nav when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Window scroll event for header effects
    window.addEventListener('scroll', handleScroll);

    // Keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Toggle mobile navigation
function toggleMobileNav() {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile navigation
function closeMobileNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

// Handle scroll events
function handleScroll() {
    const header = document.querySelector('.header');
    const scrolled = window.scrollY > 50;

    if (scrolled) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    if (event.key === 'Escape') {
        closeMobileNav();
        closeModal();
    }
}

// Handle newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('newsletter-message');
    const email = emailInput.value.trim();

    // Validate email
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Check if already subscribed
    if (userPreferences.emailSubscribed) {
        showFormMessage('You are already subscribed to our newsletter!', 'error');
        return;
    }

    // Simulate API call with setTimeout
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';

    setTimeout(() => {
        // Save subscription status
        userPreferences.emailSubscribed = true;
        userPreferences.subscribedEmail = email;
        saveUserPreferences();

        // Show success message
        showFormMessage(`Thank you! You've been subscribed with ${email}`, 'success');
        emailInput.value = '';

        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
    }, 1500);
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('newsletter-message');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Load featured gallery
function loadFeaturedGallery() {
    if (!featuredGallery) return;

    // Get first 6 images for featured section
    const featuredImages = photographyData.slice(0, 6);

    featuredImages.forEach((photo, index) => {
        const photoElement = createPhotoElement(photo, index);
        featuredGallery.appendChild(photoElement);
    });
}

// Create photo element
function createPhotoElement(photo, index) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'featured-item fade-in';
    photoDiv.style.animationDelay = `${index * 0.1}s`;

    // Check if image is in favorites
    const isFavorite = userPreferences.favoriteImages.includes(photo.id);

    photoDiv.innerHTML = `
        <img src="${photo.image}" 
             alt="${photo.description}" 
             loading="lazy"
             data-photo-id="${photo.id}">
        <div class="featured-content">
            <h3 class="featured-title">${photo.title}</h3>
            <p class="featured-description">${photo.description}</p>
            <div class="photo-actions">
                <span class="photo-location">📍 ${photo.location}</span>
                <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" 
                        data-photo-id="${photo.id}"
                        aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
        </div>
    `;

    // Add click event for modal
    const img = photoDiv.querySelector('img');
    img.addEventListener('click', () => openModal(photo));

    // Add favorite button event
    const favoriteBtn = photoDiv.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(photo.id, favoriteBtn);
    });

    return photoDiv;
}

// Toggle favorite status
function toggleFavorite(photoId, button) {
    const index = userPreferences.favoriteImages.indexOf(photoId);

    if (index === -1) {
        // Add to favorites
        userPreferences.favoriteImages.push(photoId);
        button.textContent = '❤️';
        button.classList.add('favorited');
        button.setAttribute('aria-label', 'Remove from favorites');
        showToast('Added to favorites!');
    } else {
        // Remove from favorites
        userPreferences.favoriteImages.splice(index, 1);
        button.textContent = '🤍';
        button.classList.remove('favorited');
        button.setAttribute('aria-label', 'Add to favorites');
        showToast('Removed from favorites!');
    }

    saveUserPreferences();
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c5530;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        z-index: 1500;
        animation: slideUp 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Open image modal
function openModal(photo) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close" aria-label="Close modal">&times;</button>
            <img src="${photo.image}" alt="${photo.description}" class="modal-image">
            <div class="modal-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <p><strong>Location:</strong> ${photo.location}</p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Add event listeners
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => closeModal());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Setup lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const fadeElements = document.querySelectorAll('.fade-in');

    // Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger loading
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    // Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                fadeObserver.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
    fadeElements.forEach(el => fadeObserver.observe(el));
}

// Animate statistics counters
function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate individual counter
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Search functionality
function searchPhotos(query) {
    const searchTerm = query.toLowerCase();
    return photographyData.filter(photo =>
        photo.title.toLowerCase().includes(searchTerm) ||
        photo.description.toLowerCase().includes(searchTerm) ||
        photo.location.toLowerCase().includes(searchTerm) ||
        photo.category.toLowerCase().includes(searchTerm)
    );
}

// Filter photos by category
function filterByCategory(category) {
    if (category === 'all') {
        return photographyData;
    }
    return photographyData.filter(photo => photo.category === category);
}

// Get user's favorite photos
function getFavoritePhotos() {
    return photographyData.filter(photo =>
        userPreferences.favoriteImages.includes(photo.id)
    );
}

// Export user data (for potential future use)
function exportUserData() {
    const userData = {
        preferences: userPreferences,
        exportDate: new Date().toISOString(),
        favoritePhotos: getFavoritePhotos()
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'nature-canvas-data.json';
    link.click();
}

// Add CSS animations dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .photo-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
        }
        
        .photo-location {
            font-size: 0.9rem;
            color: #666;
        }
        
        .favorite-btn {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .favorite-btn:hover {
            transform: scale(1.2);
        }
        
        .favorite-btn.favorited {
            animation: heartBeat 0.5s ease;
        }
        
        @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        .modal-info {
            padding: 1rem;
            text-align: center;
            color: white;
        }
        
        .modal-info h3 {
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }
        
        .modal-info p {
            margin-bottom: 0.5rem;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
    addAnimationStyles();
});

// Performance monitoring
const performanceData = {
    pageLoadTime: 0,
    imagesLoaded: 0,
    totalImages: 0
};

// Monitor page load performance
window.addEventListener('load', () => {
    performanceData.pageLoadTime = performance.now();
    performanceData.totalImages = document.querySelectorAll('img').length;

    console.log(`Page loaded in ${Math.round(performanceData.pageLoadTime)}ms`);
});

// Export functions for potential use in other files
window.NatureCanvas = {
    searchPhotos,
    filterByCategory,
    getFavoritePhotos,
    exportUserData,
    scrollToSection
};
