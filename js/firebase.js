// Firebase integration for HWeb

// Import Firebase SDK from CDN (we'll add this to HTML)
// This file assumes Firebase is loaded via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

let app, database, auth;

// Initialize Firebase with configuration from the prompt
function initializeFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyACmK4HXW-DQEB-G94-PUFKL60b0xq1pL8",
        authDomain: "hweb-eb26b.firebaseapp.com",
        databaseURL: "https://hweb-eb26b-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "hweb-eb26b",
        storageBucket: "hweb-eb26b.firebasestorage.app",
        messagingSenderId: "298100139949",
        appId: "1:298100139949:web:6cbc848c9f3b3cb2d26324"
    };

    // Initialize Firebase only if it's available (for admin pages)
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        auth = firebase.auth();
        console.log('Firebase initialized successfully');
    }
}

// Firebase helper functions for CRUD operations
async function createData(path, data) {
    try {
        const listRef = database.ref(path);
        const newRef = listRef.push();
        await newRef.set({ ...data, id: newRef.key });
        return newRef.key;
    } catch (error) {
        console.error('Error creating data:', error);
        throw error;
    }
}

async function updateData(path, id, data) {
    try {
        const itemRef = database.ref(`${path}/${id}`);
        await itemRef.set({ ...data, id });
        return true;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

async function deleteData(path, id) {
    try {
        const itemRef = database.ref(`${path}/${id}`);
        await itemRef.remove();
        return true;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

function subscribeToData(path, callback) {
    const listRef = database.ref(path);
    
    listRef.on('value', (snapshot) => {
        const data = snapshot.val();
        const items = data ? Object.values(data) : [];
        callback(items);
    });
    
    // Return unsubscribe function
    return () => listRef.off();
}

async function getData(path) {
    try {
        const snapshot = await database.ref(path).once('value');
        const data = snapshot.val();
        return data ? Object.values(data) : [];
    } catch (error) {
        console.error('Error getting data:', error);
        return [];
    }
}

// Authentication functions
async function loginAdmin(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

async function logoutAdmin() {
    try {
        await auth.signOut();
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

function onAuthStateChange(callback) {
    return auth.onAuthStateChanged(callback);
}

function getCurrentUser() {
    return auth.currentUser;
}

// Functions to load data for main website (fallback to Firebase if available)
async function loadServicesData() {
    if (database) {
        try {
            const services = await getData('services');
            if (services.length > 0) {
                renderServices(services);
                return;
            }
        } catch (error) {
            console.log('Firebase not available or no data, using default data');
        }
    }
    // Fallback to default data (already loaded in main.js)
}

async function loadPortfolioData() {
    if (database) {
        try {
            const portfolio = await getData('portfolio');
            if (portfolio.length > 0) {
                renderPortfolio(portfolio);
                return;
            }
        } catch (error) {
            console.log('Firebase not available or no data, using default data');
        }
    }
    // Fallback to default data (already loaded in main.js)
}

async function loadTestimonialsData() {
    if (database) {
        try {
            const testimonials = await getData('testimonials');
            if (testimonials.length > 0) {
                renderTestimonials(testimonials);
                return;
            }
        } catch (error) {
            console.log('Firebase not available or no data, using default data');
        }
    }
    // Fallback to default data (already loaded in main.js)
}

async function loadFAQsData() {
    if (database) {
        try {
            const faqs = await getData('faqs');
            if (faqs.length > 0) {
                renderFAQs(faqs);
                return;
            }
        } catch (error) {
            console.log('Firebase not available or no data, using default data');
        }
    }
    // Fallback to default data (already loaded in main.js)
}

// Real-time data loading for main website
function setupRealTimeUpdates() {
    if (database) {
        // Subscribe to services updates
        subscribeToData('services', (services) => {
            if (services.length > 0 && typeof renderServices === 'function') {
                renderServices(services);
            }
        });
        
        // Subscribe to portfolio updates
        subscribeToData('portfolio', (portfolio) => {
            if (portfolio.length > 0 && typeof renderPortfolio === 'function') {
                renderPortfolio(portfolio);
            }
        });
        
        // Subscribe to testimonials updates
        subscribeToData('testimonials', (testimonials) => {
            if (testimonials.length > 0 && typeof renderTestimonials === 'function') {
                renderTestimonials(testimonials);
            }
        });
        
        // Subscribe to FAQs updates
        subscribeToData('faqs', (faqs) => {
            if (faqs.length > 0 && typeof renderFAQs === 'function') {
                renderFAQs(faqs);
            }
        });
    }
}

// Utility functions for form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

// Initialize Firebase when this script loads
document.addEventListener('DOMContentLoaded', function() {
    initializeFirebase();
    
    // Only set up real-time updates on main page
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        setupRealTimeUpdates();
    }
});

// Export functions for global access
window.firebase_functions = {
    createData,
    updateData,
    deleteData,
    subscribeToData,
    getData,
    loginAdmin,
    logoutAdmin,
    onAuthStateChange,
    getCurrentUser,
    validateEmail,
    validateUrl,
    validateRequired
};
