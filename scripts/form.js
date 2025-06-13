// Product Array as provided in the assignment
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Function to populate product select options
function populateProductOptions() {
    const selectElement = document.getElementById('productName');

    // Clear existing options (except the placeholder)
    selectElement.innerHTML = '<option value="" disabled selected>Select a Product ...</option>';

    // Add product options dynamically
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        selectElement.appendChild(option);
    });
}

// Function to validate form before submission
function validateForm(event) {
    const form = event.target;
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    // Check all required fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e53e3e';
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });

    // Special validation for radio buttons (rating)
    const ratingInputs = form.querySelectorAll('input[name="rating"]');
    const ratingSelected = Array.from(ratingInputs).some(input => input.checked);

    if (!ratingSelected) {
        isValid = false;
        // Highlight rating section
        const ratingContainer = document.querySelector('.rating-container');
        ratingContainer.style.border = '2px solid #e53e3e';
        ratingContainer.style.padding = '10px';
        ratingContainer.style.borderRadius = '5px';
    } else {
        const ratingContainer = document.querySelector('.rating-container');
        ratingContainer.style.border = 'none';
        ratingContainer.style.padding = '0';
    }

    if (!isValid) {
        event.preventDefault();
        alert('Please fill in all required fields.');
        return false;
    }

    return true;
}

// Function to enhance star rating interaction
function enhanceStarRating() {
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const starLabels = document.querySelectorAll('.star-label');

    // Add hover effects
    starLabels.forEach((label, index) => {
        label.addEventListener('mouseenter', () => {
            // Highlight stars up to hovered one
            for (let i = 0; i <= index; i++) {
                starLabels[i].style.backgroundColor = '#667eea';
                starLabels[i].style.color = 'white';
            }
            // Reset stars after hovered one
            for (let i = index + 1; i < starLabels.length; i++) {
                starLabels[i].style.backgroundColor = '';
                starLabels[i].style.color = '';
            }
        });

        label.addEventListener('mouseleave', () => {
            // Reset all stars unless one is checked
            const checkedInput = document.querySelector('input[name="rating"]:checked');
            if (checkedInput) {
                const checkedIndex = Array.from(ratingInputs).indexOf(checkedInput);
                starLabels.forEach((starLabel, i) => {
                    if (i <= checkedIndex) {
                        starLabel.style.backgroundColor = '#667eea';
                        starLabel.style.color = 'white';
                    } else {
                        starLabel.style.backgroundColor = '';
                        starLabel.style.color = '';
                    }
                });
            } else {
                starLabels.forEach(starLabel => {
                    starLabel.style.backgroundColor = '';
                    starLabel.style.color = '';
                });
            }
        });
    });

    // Handle rating selection
    ratingInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            // Update visual feedback for selected rating
            starLabels.forEach((label, i) => {
                if (i <= index) {
                    label.style.backgroundColor = '#667eea';
                    label.style.color = 'white';
                } else {
                    label.style.backgroundColor = '';
                    label.style.color = '';
                }
            });
        });
    });
}

// Function to set max date for installation date
function setMaxInstallationDate() {
    const dateInput = document.getElementById('installDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
}

// Function to enhance form accessibility
function enhanceAccessibility() {
    // Add aria-labels for better screen reader support
    const form = document.getElementById('reviewForm');
    form.setAttribute('aria-label', 'Product Review Form');

    const ratingContainer = document.querySelector('.rating-container');
    ratingContainer.setAttribute('role', 'radiogroup');
    ratingContainer.setAttribute('aria-label', 'Product Rating');

    const checkboxContainer = document.querySelector('.checkbox-container');
    checkboxContainer.setAttribute('role', 'group');
    checkboxContainer.setAttribute('aria-label', 'Useful Features');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Populate product options
    populateProductOptions();

    // Set up form validation
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', validateForm);

    // Enhance star rating
    enhanceStarRating();

    // Set max installation date
    setMaxInstallationDate();

    // Enhance accessibility
    enhanceAccessibility();

    // Add smooth focus transitions
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.transform = 'translateY(-1px)';
        });

        input.addEventListener('blur', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add real-time validation feedback
    const requiredInputs = document.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value.trim()) {
                this.style.borderColor = '#68d391';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
    });

    console.log('Product Review Form initialized successfully!');
    console.log(`Loaded ${products.length} products into the select dropdown.`);
});