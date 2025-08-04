/* ==============================================
   PART 2: JAVASCRIPT FUNCTIONS DEMONSTRATING
   SCOPE, PARAMETERS, AND RETURN VALUES
   ============================================== */

// Global Variables (Global Scope)
let clickCounter = 0;
let cardIdCounter = 0;
let isFloatingEnabled = false;
const cardData = [
    { icon: '🔮', title: 'Crystal Ball', description: 'Peer into the future with mystical visions' },
    { icon: '⚡', title: 'Lightning Bolt', description: 'Harness the power of electricity' },
    { icon: '🌟', title: 'Shooting Star', description: 'Make a wish upon celestial magic' },
    { icon: '🎭', title: 'Magic Mask', description: 'Transform into anyone you desire' },
    { icon: '🗝️', title: 'Skeleton Key', description: 'Unlock any door or secret' },
    { icon: '💎', title: 'Enchanted Gem', description: 'Grants wisdom and clarity' }
];

/* ==============================================
   UTILITY FUNCTIONS WITH PARAMETERS & RETURN VALUES
   ============================================== */

/**
 * Function demonstrating parameters and return values
 * @param {number} min - Minimum value (parameter)
 * @param {number} max - Maximum value (parameter)
 * @returns {number} Random number between min and max
 */
function getRandomNumber(min, max) {
    // Local scope variables
    const randomDecimal = Math.random();
    const range = max - min + 1;
    const result = Math.floor(randomDecimal * range) + min;
    
    return result; // Return value demonstration
}

/**
 * Function with multiple parameters returning an object
 * @param {string} icon - Card icon
 * @param {string} title - Card title
 * @param {string} description - Card description
 * @returns {Object} Card data object
 */
function createCardData(icon, title, description) {
    // Local scope - these variables only exist within this function
    const cardId = `card-${++cardIdCounter}`;
    const timestamp = Date.now();
    
    // Return object with computed values
    return {
        id: cardId,
        icon: icon,
        title: title,
        description: description,
        createdAt: timestamp,
        clickCount: 0 // Local property that will be unique to each card
    };
}

/**
 * Function demonstrating array manipulation and return values
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array (doesn't modify original)
 */
function shuffleArray(array) {
    // Local scope - create a copy to avoid modifying original array
    const shuffled = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = getRandomNumber(0, i); // Using our custom function
        // Local scope variables for swapping
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    
    return shuffled; // Return new array
}

/**
 * Function with default parameters and conditional return
 * @param {number} count - Number of cards to generate
 * @param {boolean} useRandomData - Whether to use random data
 * @returns {Array} Array of card data objects
 */
function generateCardData(count = 3, useRandomData = false) {
    // Local scope array
    const cards = [];
    
    // Conditional logic affecting return value
    if (useRandomData) {
        // Generate random cards using local scope loop variable
        for (let i = 0; i < count; i++) {
            const randomIndex = getRandomNumber(0, cardData.length - 1);
            const randomCard = cardData[randomIndex];
            cards.push(createCardData(
                randomCard.icon,
                `${randomCard.title} ${i + 1}`,
                randomCard.description
            ));
        }
    } else {
        // Use predefined data (limited by available data)
        const dataToUse = cardData.slice(0, count);
        dataToUse.forEach(card => {
            cards.push(createCardData(card.icon, card.title, card.description));
        });
    }
    
    return cards; // Return computed array
}

/* ==============================================
   DOM MANIPULATION FUNCTIONS
   ============================================== */

/**
 * Function that creates DOM elements with parameters
 * @param {Object} cardData - Card data object
 * @returns {HTMLElement} Created card element
 */
function createCardElement(cardData) {
    // Local scope DOM creation
    const cardElement = document.createElement('div');
    cardElement.className = 'magic-card card-enter';
    cardElement.dataset.cardId = cardData.id;
    
    // Local scope HTML template
    cardElement.innerHTML = `
        <div class="card-icon">${cardData.icon}</div>
        <h3 class="card-title">${cardData.title}</h3>
        <p class="card-description">${cardData.description}</p>
    `;
    
    return cardElement; // Return DOM element
}

/**
 * Function demonstrating event handling and scope
 * @param {HTMLElement} cardElement - Card DOM element
 * @param {Object} cardData - Card data
 */
function addCardEventListeners(cardElement, cardData) {
    // Local scope event handlers that have access to parameters
    cardElement.addEventListener('click', function() {
        handleCardClick(cardElement, cardData); // Function call with parameters
    });
    
    cardElement.addEventListener('mouseenter', function() {
        // Local scope variable
        const icon = cardElement.querySelector('.card-icon');
        animateElement(icon, 'bounce'); // Function call
    });
}

/* ==============================================
   ANIMATION CONTROL FUNCTIONS
   ============================================== */

/**
 * Function that applies CSS animations via JavaScript
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationType - Type of animation
 * @param {number} duration - Animation duration in ms
 */
function animateElement(element, animationType, duration = 300) {
    // Local scope animation handling
    switch (animationType) {
        case 'bounce':
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, duration);
            break;
            
        case 'shake':
            element.classList.add('shuffle-animation');
            setTimeout(() => {
                element.classList.remove('shuffle-animation');
            }, duration);
            break;
            
        case 'flip':
            element.classList.add('clicked');
            setTimeout(() => {
                element.classList.remove('clicked');
            }, 600);
            break;
    }
}

/**
 * Function demonstrating class manipulation for CSS animations
 * @param {string} className - CSS class to toggle
 * @param {boolean} force - Force add/remove
 */
function toggleFloatingAnimation(className = 'floating', force = null) {
    // Local scope DOM query
    const cards = document.querySelectorAll('.magic-card');
    
    // Local scope loop variable
    cards.forEach(card => {
        if (force !== null) {
            // Use parameter to force state
            card.classList.toggle(className, force);
        } else {
            // Toggle based on current state
            card.classList.toggle(className);
        }
    });
    
    // Update global state
    isFloatingEnabled = force !== null ? force : !isFloatingEnabled;
    
    // Return current state
    return isFloatingEnabled;
}

/* ==============================================
   EVENT HANDLER FUNCTIONS
   ============================================== */

/**
 * Card click handler demonstrating scope and state management
 * @param {HTMLElement} cardElement - Clicked card element
 * @param {Object} cardData - Card data object
 */
function handleCardClick(cardElement, cardData) {
    // Access global variable and modify it
    clickCounter++;
    updateClickCounter(clickCounter); // Function call with global variable
    
    // Local scope animation
    animateElement(cardElement, 'flip');
    
    // Local scope data modification
    cardData.clickCount++;
    
    // Show modal with card details
    showModal(cardData); // Function call with parameter
}

/**
 * Function that updates UI elements
 * @param {number} count - New count value
 */
function updateClickCounter(count) {
    // Local scope DOM manipulation
    const counterElement = document.getElementById('click-counter');
    if (counterElement) {
        counterElement.textContent = count;
        
        // Add temporary animation class
        counterElement.style.transform = 'scale(1.2)';
        counterElement.style.color = '#4ecdc4';
        
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
            counterElement.style.color = 'inherit';
        }, 200);
    }
}

/**
 * Modal display function with parameters
 * @param {Object} cardData - Card data to display
 */
function showModal(cardData) {
    // Local scope DOM elements
    const modal = document.getElementById('card-modal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    
    // Update modal content using parameters
    title.textContent = `${cardData.icon} ${cardData.title}`;
    description.textContent = `${cardData.description}\n\nClicked ${cardData.clickCount} times`;
    
    // Show modal with CSS animation
    modal.classList.add('show');
}

/**
 * Function to hide modal
 */
function hideModal() {
    // Local scope DOM manipulation
    const modal = document.getElementById('card-modal');
    modal.classList.remove('show');
}

/* ==============================================
   LOADING ANIMATION FUNCTIONS
   ============================================== */

/**
 * Async function demonstrating promises and loading states
 * @param {number} duration - Loading duration in ms
 * @returns {Promise} Promise that resolves after duration
 */
function showLoadingAnimation(duration = 1500) {
    // Local scope DOM element
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Show loading
    loadingOverlay.classList.remove('hidden');
    
    // Return promise for async handling
    return new Promise(resolve => {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            resolve(); // Resolve promise
        }, duration);
    });
}

/* ==============================================
   MAIN APPLICATION FUNCTIONS
   ============================================== */

/**
 * Function that initializes the application
 */
function initializeApp() {
    // Local scope initialization
    const initialCards = generateCardData(6, false); // Function call with parameters
    renderCards(initialCards); // Function call
    setupEventListeners(); // Function call
    
    console.log('App initialized with', initialCards.length, 'cards');
}

/**
 * Function that renders cards to the DOM
 * @param {Array} cardsData - Array of card data objects
 */
function renderCards(cardsData) {
    // Local scope DOM manipulation
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = ''; // Clear existing cards
    
    // Use parameter to create cards
    cardsData.forEach((cardData, index) => {
        const cardElement = createCardElement(cardData); // Function call with parameter
        
        // Add staggered entrance animation
        setTimeout(() => {
            cardGrid.appendChild(cardElement);
            addCardEventListeners(cardElement, cardData); // Function call with parameters
        }, index * 100); // Staggered timing using loop variable
    });
}

/**
 * Function that sets up all event listeners
 */
function setupEventListeners() {
    // Local scope event listener setup
    const addCardBtn = document.getElementById('add-card-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const toggleAnimationBtn = document.getElementById('toggle-animation-btn');
    const closeBtn = document.querySelector('.close-btn');
    const modalActionBtn = document.getElementById('modal-action-btn');
    
    // Add Card Button
    addCardBtn.addEventListener('click', async function() {
        await showLoadingAnimation(800); // Async function call
        
        // Generate new random card
        const newCards = generateCardData(1, true); // Function call with parameters
        const existingCards = Array.from(document.querySelectorAll('.magic-card'));
        
        // Add to existing cards
        renderCards([...getCardDataFromDOM(existingCards), ...newCards]);
    });
    
    // Shuffle Button
    shuffleBtn.addEventListener('click', function() {
        // Local scope variables
        const existingCards = Array.from(document.querySelectorAll('.magic-card'));
        const cardDataArray = getCardDataFromDOM(existingCards);
        const shuffledData = shuffleArray(cardDataArray); // Function call with parameter
        
        // Add shuffle animation to all cards
        existingCards.forEach(card => {
            animateElement(card, 'shake'); // Function call
        });
        
        // Re-render with shuffled data after animation
        setTimeout(() => {
            renderCards(shuffledData); // Function call
        }, 300);
    });
    
    // Toggle Animation Button
    toggleAnimationBtn.addEventListener('click', function() {
        const isEnabled = toggleFloatingAnimation(); // Function call with return value
        
        // Update button text based on return value
        this.textContent = isEnabled ? 'Stop Floating' : 'Start Floating';
    });
    
    // Modal Close Button
    closeBtn.addEventListener('click', hideModal);
    
    // Modal Action Button
    modalActionBtn.addEventListener('click', function() {
        // Local scope magic effect
        const magicEffects = ['✨ Sparkles appear!', '🌟 Stars align!', '⚡ Lightning strikes!', '🔮 Vision granted!'];
        const randomEffect = magicEffects[getRandomNumber(0, magicEffects.length - 1)];
        
        alert(randomEffect);
        hideModal(); // Function call
    });
    
    // Close modal when clicking outside
    document.getElementById('card-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideModal(); // Function call
        }
    });
}

/**
 * Helper function to extract card data from DOM elements
 * @param {Array} cardElements - Array of card DOM elements
 * @returns {Array} Array of card data objects
 */
function getCardDataFromDOM(cardElements) {
    // Local scope data extraction
    return cardElements.map(card => {
        // Local scope data parsing
        const icon = card.querySelector('.card-icon').textContent;
        const title = card.querySelector('.card-title').textContent;
        const description = card.querySelector('.card-description').textContent;
        
        // Return reconstructed card data
        return createCardData(icon, title, description); // Function call with parameters
    });
}

/* ==============================================
   PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT
   Initialize the application when DOM is loaded
   ============================================== */

// Event listener that starts everything
document.addEventListener('DOMContentLoaded', function() {
    // Function call to initialize the entire application
    initializeApp();
    
    console.log('Magic Card Gallery loaded successfully!');
    console.log('Global scope variables:', { clickCounter, cardIdCounter, isFloatingEnabled });
});

/* ==============================================
   DEMONSTRATION SUMMARY:
   
   SCOPE EXAMPLES:
   - Global variables: clickCounter, cardIdCounter, isFloatingEnabled, cardData
   - Local variables: Used in every function (randomDecimal, range, result, etc.)
   - Function parameters create local scope
   
   PARAMETER EXAMPLES:
   - getRandomNumber(min, max) - numeric parameters
   - createCardData(icon, title, description) - string parameters
   - animateElement(element, animationType, duration) - mixed type parameters
   - generateCardData(count = 3, useRandomData = false) - default parameters
   
   RETURN VALUE EXAMPLES:
   - getRandomNumber() returns a number
   - createCardData() returns*/