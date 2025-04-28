// Preloader Script
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;

    setTimeout(() => {
        body.classList.add('loaded');
    }, 3000);
});

// Navigation and Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Dynamic Year Update
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('footer-year').textContent = currentYear - 5;

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animation Observers
const createObserver = (elements, threshold = 0.15) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });

    elements.forEach(element => observer.observe(element));
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = [
        ...document.querySelectorAll('.property-card, .gallery-item, .neighborhood-card, .testimonial-card')
    ];
    createObserver(animatableElements);
});

// Testimonials Read More Functionality
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
        const testimonialCard = e.target.closest('.testimonial-card');
        const testimonialText = testimonialCard.querySelector('.testimonial-text');
        const loadingState = testimonialCard.querySelector('.loading-state');

        if (testimonialText.classList.contains('expanded')) {
            testimonialText.classList.remove('expanded');
            e.target.textContent = 'Read More';
        } else {
            e.target.style.display = 'none';
            loadingState.style.display = 'block';

            await new Promise(resolve => setTimeout(resolve, 1000));
            testimonialText.classList.add('expanded', 'expanding');
            
            requestAnimationFrame(() => {
                testimonialText.style.opacity = '1';
                testimonialText.classList.remove('expanding');
            });

            e.target.textContent = 'Read Less';
            e.target.style.display = 'inline-block';
            loadingState.style.display = 'none';
        }
    });
});

// Form Submission Handling
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());

    console.log('Form Data:', formObject);
    alert('Thank you for contacting us! We will get back to you shortly.');
    e.target.reset();
});
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const suggestionsList = document.getElementById("suggestions-list");

    // Available locations with property listings
    const availableLocations = {
        "Karen": "karen.html",
        "Lavington": "lavington.html",
        "Runda": "runda.html",
        "Westlands": "westlands.html",
        "Muthaiga": "muthaiga.html",
        "Kilimani": "kilimani.html"
    };

    // All possible locations for suggestions
    const locations = Object.keys(availableLocations).concat([
        "Kileleshwa", "Parklands", "Ngong Road", "Lang'ata", "Gigiri",
        "Spring Valley", "Riverside", "Hurlingham", "Thindigua"
    ]);

    // Create loader element
    const loader = document.createElement("div");
    loader.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Searching...`;
    loader.classList.add("loader");
    document.body.appendChild(loader);

    // Event listener for input
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionsList.innerHTML = "";
        
        if (query) {
            const filteredLocations = locations.filter(location => 
                location.toLowerCase().includes(query)
            );

            filteredLocations.forEach(location => {
                const listItem = document.createElement("li");
                listItem.textContent = location;
                listItem.addEventListener("click", () => handleLocationSelection(location));
                suggestionsList.appendChild(listItem);
            });

            suggestionsList.style.display = filteredLocations.length > 0 ? "block" : "none";
        } else {
            suggestionsList.style.display = "none";
        }
    });

    function handleLocationSelection(location) {
        searchInput.value = location;
        suggestionsList.style.display = "none";
        
        loader.style.display = "block"; // Show loading animation
        
        setTimeout(() => {
            loader.style.display = "none"; // Hide loader

            if (availableLocations[location]) {
                // Redirect to the location's page if available
                window.location.href = availableLocations[location];
            } else {
                // Show an alert if location is unavailable
                alert(`Sorry, there are no lands available in ${location} at the moment.`);
            }
        }, 2000); // Simulate loading time
    }

    // Hide suggestions when clicking outside
    document.addEventListener("click", (event) => {
        if (!searchInput.contains(event.target) && !suggestionsList.contains(event.target)) {
            suggestionsList.style.display = "none";
        }
    });
});

