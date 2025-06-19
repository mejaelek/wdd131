// images.js - Photography Portfolio Image Data
const photoData = [
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

// Utility functions
function getImagesByCategory(category) {
    return category === 'all'
        ? photoData
        : photoData.filter(photo => photo.category === category);
}

function getFeaturedImages(count = 6) {
    return photoData.slice(0, count);
}

function getImageById(id) {
    return photoData.find(photo => photo.id === id);
}

// Export for use in other modules
export {
    photoData,
    getImagesByCategory,
    getFeaturedImages,
    getImageById
}; 