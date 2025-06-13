// Function to get URL parameters
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const reviewData = {};

    for (const [key, value] of params.entries()) {
        if (key === 'features') {
            // Handle multiple checkbox values
            if (reviewData[key]) {
                if (Array.isArray(reviewData[key])) {
                    reviewData[key].push(value);
                } else {
                    reviewData[key] = [reviewData[key], value];
                }
            } else {
                reviewData[key] = [value];
            }
        } else {
            reviewData[key] = value;
        }
    }

    return reviewData;
}

// Function to format rating display
function formatRating(rating) {
    const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
    return `${stars} (${rating}/5)`;
}

// Function to format date display
function formatDate(dateString) {
    if (!dateString) return 'Not specified';

    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to format features list
function formatFeatures(features) {
    if (!features) return 'None selected';

    if (Array.isArray(features)) {
        return features.join(', ');
    } else {
        return features;
    }
}

// Function to display review details
function displayReviewDetails() {
    const reviewData = getUrlParams();
    const detailsContainer = document.getElementById('reviewDetails');

    if (Object.keys(reviewData).length === 0) {
        detailsContainer.innerHTML = '<p>No review data found. Please submit a review first.</p>';
        return;
    }

    let detailsHTML = '';

    // Product Name
    if (reviewData.productName) {
        detailsHTML += `
            <div class="review-detail">
                <strong>Product:</strong> ${reviewData.productName}
            </div>
        `;
    }

    // Rating
    if (reviewData.rating) {
        detailsHTML += `
            <div class="review-detail">
                <strong>Rating:</strong> ${formatRating(reviewData.rating)}
            </div>
        `;
    }

    // Installation Date
    if (reviewData.installDate) {
        detailsHTML += `
            <div class="review-detail">
                <strong>Installation Date:</strong> ${formatDate(reviewData.installDate)}
            </div>
        `;
    }

    // Useful Features
    if (reviewData.features) {
        detailsHTML += `
            <div class="review-detail">
                <strong>Useful Features:</strong> ${formatFeatures(reviewData.features)}
            </div>
        `;
    }

    // Written Review
    if (reviewData.writtenReview && reviewData.writtenReview.trim()) {
        detailsHTML += `
            <div class="review-detail">
                <strong>Written Review:</strong><br>
                <em>"${reviewData.writtenReview}"</em>
            </div>
        `;
    }

    // User Name
    if (reviewData.userName && reviewData.userName.trim()) {
        detailsHTML += `
            <div class="review-detail">
                <strong>Reviewer:</strong> ${reviewData.userName}
            </div>
        `;
    }

    // Submission Date
    const submissionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    detailsHTML += `
        <div class="review-detail">
            <strong>Submitted:</strong> ${submissionDate}
        </div>
    `;

    detailsContainer.innerHTML = detailsHTML;
}

// Function to update and display review counter
function updateReviewCounter() {
    const counterKey = 'reviewCounter';

    // Get current count from localStorage
    let currentCount = parseInt(localStorage.getItem(counterKey)) || 0;

    // Increment the counter
    currentCount++;

    // Store updated count
    localStorage.setItem(counterKey, currentCount.toString());

    // Display the count
    const countElement = document.getElementById('reviewCount');
    if (countElement) {
        countElement.textContent = currentCount;
    }

    // Add animation to counter
    if (countElement) {
        countElement.style.transform = 'scale(1.2)';
        countElement.style.transition = 'transform 0.3s ease';

        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 300);
    }

    console.log(`Review counter updated: ${currentCount} reviews completed`);

    return currentCount;
}

// Function to add celebration animation
function addCelebrationEffect() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.style.animation = 'celebrationPulse 2s ease-in-out';
    }

    // Add CSS for celebration animation if not already present
    if (!document.querySelector('#celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes celebrationPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(104, 211, 145, 0.5); }
                100% { transform: scale(1); }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .fade-in-up {
                animation: fadeInUp 0.6s ease-out;
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to add smooth entrance animations
function addEntranceAnimations() {
    const elements = document.querySelectorAll('.confirmation-container > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        setTimeout(() => {
            element.classList.add('fade-in-up');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Function to handle localStorage errors gracefully
function safeLocalStorage() {
    try {
        // Test if localStorage is available
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        console.warn('localStorage is not available:', e);
        return false;
    }
}

// Function to update counter with fallback
function updateReviewCounterSafe() {
    if (!safeLocalStorage()) {
        // Fallback to session-based counter
        console.log('Using session-based counter fallback');
        const countElement = document.getElementById('reviewCount');
        if (countElement) {
            countElement.textContent = '1';
        }
        return 1;
    }

    return updateReviewCounter();
}

// Function to validate that we actually have review data
function validateReviewSubmission() {
    const reviewData = getUrlParams();

    // Check if we have at least the required fields
    const hasRequiredData = reviewData.productName && reviewData.rating && reviewData.installDate;

    if (!hasRequiredData) {
        // Show error message
        const detailsContainer = document.getElementById('reviewDetails');
        detailsContainer.innerHTML = `
            <div style="color: #e53e3e; text-align: center; padding: 2rem;">
                <h3>⚠️ Invalid Submission</h3>
                <p>It appears this page was accessed directly without submitting a review.</p>
                <p>Please <a href="form.html" style="color: #667eea;">submit a review</a> to see your confirmation.</p>
            </div>
        `;

        // Hide counter section
        const counterDisplay = document.querySelector('.counter-display');
        if (counterDisplay) {
            counterDisplay.style.display = 'none';
        }

        return false;
    }

    return true;
}

// Function to add interactive elements
function addInteractiveElements() {
    // Add click tracking for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add hover effects for review details
    const reviewDetails = document.querySelectorAll('.review-detail');
    reviewDetails.forEach(detail => {
        detail.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#f8f9fa';
            this.style.padding = '0.5rem';
            this.style.borderRadius = '5px';
            this.style.transition = 'all 0.2s ease';
        });

        detail.addEventListener('mouseleave', function () {
            this.style.backgroundColor = '';
            this.style.padding = '0.5rem 0';
        });
    });
}

// Function to log review analytics (for development purposes)
function logReviewAnalytics() {
    const reviewData = getUrlParams();

    console.log('=== Review Submission Analytics ===');
    console.log('Product:', reviewData.productName || 'Not specified');
    console.log('Rating:', reviewData.rating || 'Not specified');
    console.log('Features selected:', reviewData.features ?
        (Array.isArray(reviewData.features) ? reviewData.features.length : 1) : 0);
    console.log('Has written review:', !!(reviewData.writtenReview && reviewData.writtenReview.trim()));
    console.log('Has user name:', !!(reviewData.userName && reviewData.userName.trim()));
    console.log('Submission time:', new Date().toISOString());
    console.log('=====================================');
}

// Main initialization function
function initializeReviewPage() {
    console.log('Initializing review confirmation page...');

    // Validate submission
    if (!validateReviewSubmission()) {
        console.log('Invalid review submission detected');
        return;
    }

    // Display review details
    displayReviewDetails();

    // Update counter
    const reviewCount = updateReviewCounterSafe();

    // Add visual effects
    addCelebrationEffect();
    addEntranceAnimations();
    addInteractiveElements();

    // Log analytics
    logReviewAnalytics();

    // Show success message based on review count
    if (reviewCount > 1) {
        const successMessage = document.querySelector('.success-message p');
        if (successMessage) {
            successMessage.textContent = `Thank you for your continued feedback! This is your ${reviewCount}${getOrdinalSuffix(reviewCount)} review.`;
        }
    }

    console.log('Review confirmation page initialized successfully!');
}

// Helper function to get ordinal suffix
function getOrdinalSuffix(number) {
    const j = number % 10;
    const k = number % 100;

    if (j === 1 && k !== 11) {
        return 'st';
    }
    if (j === 2 && k !== 12) {
        return 'nd';
    }
    if (j === 3 && k !== 13) {
        return 'rd';
    }
    return 'th';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeReviewPage();
});

// Handle page visibility changes (for potential future enhancements)
document.addEventListener('visibilitychange', function () {
    if (!document.hidden) {
        console.log('Review page became visible');
    }
});