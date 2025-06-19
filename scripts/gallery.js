// Gallery Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Load initial images
    loadGallery();

    // Setup event listeners
    setupEventListeners();
});

// Load gallery with first 12 images
function loadGallery() {
    const initialImages = photoData.slice(0, 12);
    displayImages(initialImages);
    updateImageCount();
    loadFavorites();
}

// Display images in gallery
function displayImages(images) {
    const gallery = document.getElementById('gallery-grid');

    // Clear existing when filtering
    if (!gallery.innerHTML.includes('gallery-item')) {
        gallery.innerHTML = '';
    }

    images.forEach((image, index) => {
        const photoElement = createPhotoElement(image, index);
        gallery.appendChild(photoElement);
    });

    // Lazy load images
    lazyLoadImages();
}

// Create photo element
function createPhotoElement(photo, index) {
    const photoDiv = document.createElement('div');
    photoDiv.className = `gallery-item fade-in delay-${index % 5}`;

    // Check if favorited
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.includes(photo.id);

    photoDiv.innerHTML = `
        <div class="photo-card">
            <img src="placeholder.jpg" 
                 data-src="${photo.image}" 
                 alt="${photo.description}"
                 loading="lazy"
                 width="${photo.width}"
                 height="${photo.height}"
                 class="gallery-image">
            <div class="photo-overlay">
                <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" 
                        data-id="${photo.id}"
                        aria-label="${isFavorite ? 'Remove favorite' : 'Add favorite'}">
                    ${isFavorite ? '❤️' : '🤍'}
                </button>
                <div class="photo-info">
                    <h3>${photo.title}</h3>
                    <p>${photo.location}</p>
                </div>
            </div>
        </div>
    `;

    return photoDiv;
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('.gallery-image');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    images.forEach(img => observer.observe(img));
}

// Toggle favorite
function toggleFavorite(e) {
    const btn = e.currentTarget;
    const photoId = parseInt(btn.dataset.id);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(photoId)) {
        favorites = favorites.filter(id => id !== photoId);
        btn.textContent = '🤍';
        btn.classList.remove('favorited');
    } else {
        favorites.push(photoId);
        btn.textContent = '❤️';
        btn.classList.add('favorited');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

// Load favorite images
function loadFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const noFavorites = document.getElementById('no-favorites');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favoritesGrid.innerHTML = '';

    if (favorites.length === 0) {
        noFavorites.style.display = 'block';
        return;
    }

    noFavorites.style.display = 'none';

    favorites.forEach(favId => {
        const photo = photoData.find(p => p.id === favId);
        if (photo) {
            const photoElement = createPhotoElement(photo, 0);
            favoritesGrid.appendChild(photoElement);
        }
    });
}

// Filter images
function filterImages(category) {
    const filtered = category === 'all'
        ? photoData
        : photoData.filter(photo => photo.category === category);

    document.getElementById('gallery-grid').innerHTML = '';
    displayImages(filtered.slice(0, 12));
    updateImageCount();
}

// Search images
function searchImages(query) {
    const results = photoData.filter(photo =>
        photo.title.toLowerCase().includes(query) ||
        photo.description.toLowerCase().includes(query) ||
        photo.location.toLowerCase().includes(query)
    );

    document.getElementById('gallery-grid').innerHTML = '';
    displayImages(results);
    updateImageCount();
}

// Update image count display
function updateImageCount() {
    const count = document.querySelectorAll('.gallery-item').length;
    const total = photoData.length;
    document.querySelector('.image-count').textContent = `Showing ${count} of ${total} photos`;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            filterImages(btn.dataset.filter);
        });
    });

    // Search
    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        searchImages(query);
    });

    // Load more
    document.getElementById('load-more-btn').addEventListener('click', () => {
        const currentCount = document.querySelectorAll('.gallery-item').length;
        const newImages = photoData.slice(currentCount, currentCount + 6);
        displayImages(newImages);
        updateImageCount();
    });

    // Favorite buttons (delegated)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite-btn')) {
            toggleFavorite(e);
        }
    });
}