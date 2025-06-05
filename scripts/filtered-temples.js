// ... (keep all the initial code until the temple data)

const temples = [
    {
        templeName: "Mesa Arizona Temple",
        location: "Mesa, Arizona",
        dedicated: "1927, 10, 23",
        area: 113916,
        imageUrl: "mesa-temple.jpg"  // Changed to just filename
    },
    {
        templeName: "Manti Utah Temple",
        location: "Manti, Utah, United States",
        dedicated: "1888, 5, 21",
        area: 74792,
        imageUrl: "manti-utah-temple.jpg"
    },
    {
        templeName: "Payson Utah Temple",
        location: "Payson, Utah, United States",
        dedicated: "2015, 6, 7",
        area: 96630,
        imageUrl: "payson-utah-temple.jpg"
    },
    {
        templeName: "Johannesburg South Africa Temple",
        location: "Johannesburg, South Africa",
        dedicated: "1985, 8, 24",
        area: 19184,
        imageUrl: "johannesburg-temple.jpg"
    },
    {
        templeName: "Washington D.C. Temple",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, 11, 19",
        area: 156558,
        imageUrl: "washington-dc-temple.jpg"
    },
    {
        templeName: "Lima Perú Temple",
        location: "Lima, Perú",
        dedicated: "1986, 1, 10",
        area: 9600,
        imageUrl: "lima-peru-temple.jpg"
    },
    {
        templeName: "Mexico City Mexico Temple",
        location: "Mexico City, Mexico",
        dedicated: "1983, 12, 2",
        area: 116642,
        imageUrl: "mexico-city-temple.jpg"
    },
    {
        templeName: "Paris France Temple",
        location: "Le Chesnay, France",
        dedicated: "2017, 5, 21",
        area: 44175,
        imageUrl: "paris-temple.jpg"
    },
    {
        templeName: "Rome Italy Temple",
        location: "Rome, Italy",
        dedicated: "2019, 3, 10",
        area: 40000,
        imageUrl: "rome-temple.jpg"
    },
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah",
        dedicated: "1893, 4, 6",
        area: 253015,
        imageUrl: "salt-lake-temple.jpg"
    }
];

// Updated createTempleCard function with absolute paths
function createTempleCard(filteredTemples) {
    const container = document.querySelector(".temples-pics");
    if (!container) {
        console.error("Temples container not found!");
        return;
    }

    container.innerHTML = '<div class="loading">Loading temples...</div>';

    // Remove setTimeout for production (only used for demo)
    container.innerHTML = "";

    filteredTemples.forEach(temple => {
        try {
            const card = document.createElement("figure");
            card.className = "temple-card";

            const img = document.createElement("img");
            // Use absolute path from your root directory
            img.src = `images/temples/${temple.imageUrl}`;
            img.alt = `${temple.templeName} Temple`;
            img.loading = "lazy";
            img.decoding = "async";
            img.width = 400;
            img.height = 300;
            img.onerror = () => {
                console.error("Failed to load image:", temple.imageUrl);
                img.src = "images/placeholder.jpg"; // Create this fallback image
                img.alt = "Temple image not available";
            };

            const name = document.createElement("h3");
            name.textContent = temple.templeName;

            [["Location", temple.location],
            ["Dedicated", temple.dedicated.replace(/,/g, "/")],
            ["Area", `${temple.area.toLocaleString()} sq ft`]
            ].forEach(([label, value]) => {
                const p = document.createElement("p");
                p.className = "inf";
                p.innerHTML = `<span class="label">${label}:</span> ${value}`;
                card.appendChild(p);
            });

            card.prepend(img, name);
            container.appendChild(card);
        } catch (error) {
            console.error("Error creating card for", temple.templeName, error);
        }
    });
}

// ... (rest of your JavaScript remains the same)