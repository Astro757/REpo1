const API_URL = 'http://localhost:5000/api';

// DOM Elements
const placesGrid = document.getElementById('places-grid');
const guidesGrid = document.getElementById('guides-grid');
const placeSelect = document.getElementById('place-select');
const bookingForm = document.getElementById('booking-form');
const reviewsContainer = document.getElementById('reviews-carousel');

document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // Page Specific Logic
    if (window.location.pathname.includes('explore.html')) {
        loadPlaces();
    }

    if (window.location.pathname.includes('booking.html')) {
        checkAuth(); // Protect Route
        loadPlacesForBooking();
        if (bookingForm) {
            bookingForm.addEventListener('submit', handleBookingSubmit);
        }
    }

    if (window.location.pathname.includes('guide.html')) {
        loadGuides();
        if (placeSelect) {
            placeSelect.addEventListener('change', (e) => loadGuides(e.target.value));
            loadPlaceOptions();
        }
    }

    if (window.location.pathname.includes('login.html')) {
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.addEventListener('submit', handleLogin);
    }

    if (window.location.pathname.includes('signup.html')) {
        const signupForm = document.getElementById('signup-form');
        if (signupForm) signupForm.addEventListener('submit', handleSignup);
    }

    updateAuthUI();

    // Load Footer Reviews everywhere
    loadReviews();
});

// Auth Functions
function updateAuthUI() {
    const token = localStorage.getItem('token');
    const authBtns = document.querySelector('.auth-btns');

    // If we are on pages that might not have auth-btns (like login/signup themselves if header is minimal)
    if (!authBtns) return;

    if (token) {
        authBtns.innerHTML = `<button onclick="logout()" class="btn" style="padding: 8px 20px;">Logout</button>`;
    } else {
        authBtns.innerHTML = `<a href="login.html" class="btn" style="padding: 8px 20px;">Sign In</a>`;
    }
}

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        // Only redirect if valid session required?
        alert('Please login to continue');
        window.location.href = 'login.html';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'index.html';
        } else {
            alert(data.msg || 'Login Failed');
        }
    } catch (err) {
        console.error(err);
        alert('Error logging in');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'index.html';
        } else {
            alert(data.msg || 'Signup Failed');
        }
    } catch (err) {
        console.error(err);
        alert('Error signing up');
    }
}

window.logout = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
};

// Data Fetching

async function loadPlaces() {
    try {
        const response = await fetch(`${API_URL}/places`);
        const places = await response.json();

        if (!placesGrid) return;
        placesGrid.innerHTML = '';

        places.forEach(place => {
            const card = document.createElement('div');
            card.className = 'card place-card';
            card.innerHTML = `
                <img src="${place.image.startsWith('http') || place.image.startsWith('/') ? place.image : 'http://localhost:5000' + place.image}" alt="${place.name}">
                <div class="card-content">
                    <h3>${place.name}</h3>
                    <p>${place.description.substring(0, 100)}...</p>
                    <a href="#" class="btn" style="margin-top:10px;">Explore</a>
                </div>
            `;
            placesGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading places:', error);
    }
}

async function loadPlacesForBooking() {
    const select = document.getElementById('booking-place');
    if (!select) return;

    try {
        const response = await fetch(`${API_URL}/places`);
        const places = await response.json();

        select.innerHTML = ''; // clear loading
        places.forEach(place => {
            const option = document.createElement('option');
            option.value = place._id;
            option.textContent = place.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading places:', error);
        select.innerHTML = '<option>Error loading places</option>';
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();

    // Auth Check
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('Please login to book');
        window.location.href = 'login.html';
        return;
    }

    const formData = {
        userId: user.id,
        placeId: document.getElementById('booking-place').value,
        type: document.getElementById('booking-type').value,
        date: document.getElementById('booking-date').value,
        paymentDetails: {
            method: 'Credit Card',
            amount: 100 // Placeholder
        }
    };

    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Booking Confirmed!');
            bookingForm.reset();
        } else {
            alert('Booking Failed');
        }
    } catch (error) {
        console.error('Error booking:', error);
    }
}

async function loadPlaceOptions() {
    if (!placeSelect) return;
    try {
        const response = await fetch(`${API_URL}/places`);
        const places = await response.json();
        places.forEach(place => {
            const option = document.createElement('option');
            option.value = place._id;
            option.textContent = place.name;
            placeSelect.appendChild(option);
        });
    } catch (err) {
        console.error(err);
    }
}

async function loadGuides(placeId = '') {
    const womenContainer = document.getElementById('women-guides');
    const menContainer = document.getElementById('men-guides');
    if (!womenContainer && !menContainer) return;

    let url = `${API_URL}/guides`;
    if (placeId) url += `?placeId=${placeId}`;

    // Clear prev
    if (womenContainer) womenContainer.innerHTML = '';
    if (menContainer) menContainer.innerHTML = '';

    try {
        const response = await fetch(url);
        const guides = await response.json();

        guides.forEach(guide => {
            const card = document.createElement('div');
            card.className = 'card guide-card';
            card.innerHTML = `
                <img src="${guide.image}" alt="${guide.name}">
                <div class="card-content">
                    <h3>${guide.name}</h3>
                    <p>Contact: ${guide.contact}</p>
                </div>
            `;

            if (guide.gender.toLowerCase() === 'female') {
                womenContainer?.appendChild(card);
            } else {
                menContainer?.appendChild(card);
            }
        });

    } catch (error) {
        console.error('Error loading guides:', error);
    }
}

async function loadReviews() {
    if (!reviewsContainer) return;
    try {
        const response = await fetch(`${API_URL}/reviews`);
        const reviews = await response.json();

        if (reviews.length === 0) {
            reviewsContainer.innerHTML = '<p style="color:var(--text-muted); padding:20px;">No reviews yet.</p>';
            return;
        }

        reviewsContainer.innerHTML = '';

        reviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="rating">★ ${review.rating}</div>
                <p>"${review.comment}"</p>
                <small>- ${review.userId?.name || 'User'}</small>
            `;
            reviewsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}
