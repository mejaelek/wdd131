const temples = [
    {
        name: "Salt Lake Temple",
        location: "Salt Lake City, Utah",
        dedicated: 1893,
        area: "253 000 sq ft",
        image: "images/salt-lake.webp"
    },
    {
        name: "Provo City Center Temple",
        location: "Provo, Utah",
        dedicated: 2016,
        area: "85 084 sq ft",
        image: "images/provo.webp"
    },
    {
        name: "San Diego Temple",
        location: "San Diego, California",
        dedicated: 1993,
        area: "72 000 sq ft",
        image: "images/san-diego.webp"
    },
    {
        name: "Rome Italy Temple",
        location: "Rome, Italy",
        dedicated: 2019,
        area: "41 010 sq ft",
        image: "images/rome.webp"
    },
    {
        name: "Laie Hawaii Temple",
        location: "Laie, Hawaii",
        dedicated: 1919,
        area: "47 224 sq ft",
        image: "images/laie.webp"
    },
    {
        name: "Paris France Temple",
        location: "Paris, France",
        dedicated: 2017,
        area: "44 175 sq ft",
        image: "images/paris.webp"
    },
    {
        name: "Logan Temple",
        location: "Logan, Utah",
        dedicated: 1884,
        area: "115 507 sq ft",
        image: "images/logan.webp"
    },
    {
        name: "Accra Ghana Temple",
        location: "Accra, Ghana",
        dedicated: 2004,
        area: "17 500 sq ft",
        image: "images/accra.webp"
    },
    {
        name: "Mesa Arizona Temple",
        location: "Mesa, Arizona",
        dedicated: 1927,
        area: "113 916 sq ft",
        image: "images/mesa.webp"
    },
    {
        name: "Tokyo Japan Temple",
        location: "Tokyo, Japan",
        dedicated: 1980,
        area: "52 590 sq ft",
        image: "images/tokyo.webp"
    }
];

const container = document.getElementById("temples-container");

// Display all temples initially
function displayTemples(data) {
    container.innerHTML = "";
    data.forEach(temple => {
        const card = document.createElement("div");
        card.classList.add("temple-card");

        card.innerHTML = `
      <img src="${temple.image}" alt="${temple.name}" loading="lazy">
      <div class="card-content">
        <h2>${temple.name}</h2>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area ?? 'N/A'}</p>
      </div>
    `;

        container.appendChild(card);
    });
}

// Filter logic
function filterTemples(criteria) {
    let filtered;
    switch (criteria) {
        case "utah":
            filtered = temples.filter(t => t.location.includes("Utah"));
            break;
        case "non-utah":
            filtered = temples.filter(t => !t.location.includes("Utah"));
            break;
        case "old":
            filtered = temples.filter(t => t.dedicated < 1900);
            break;
        case "new":
            filtered = temples.filter(t => t.dedicated >= 2000);
            break;
        default:
            filtered = temples;
    }
    displayTemples(filtered);
}

// Event listeners for filters
document.querySelectorAll("nav button").forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        filterTemples(filter);
    });
});

// View toggle
document.getElementById("grid-view").addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

document.getElementById("list-view").addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

// Default view
container.classList.add("grid");
displayTemples(temples);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
