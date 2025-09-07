// main.js

// ===============================
// Firebase setup
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// ganti pake config project kamu
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ===============================
// Render Functions
// ===============================
function renderServices(services) {
  const container = document.getElementById("services-container");
  if (!container) return;
  container.innerHTML = "";
  services.forEach(service => {
    const div = document.createElement("div");
    div.className = "p-6 bg-white shadow rounded-2xl";
    div.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${service.title}</h3>
      <p class="text-gray-600">${service.description}</p>
    `;
    container.appendChild(div);
  });
}

function renderPortfolio(items) {
  const container = document.getElementById("portfolio-container");
  if (!container) return;
  container.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "rounded-2xl overflow-hidden shadow bg-white";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="text-lg font-bold">${item.title}</h3>
        <p class="text-gray-600">${item.description}</p>
      </div>
    `;
    container.appendChild(div);
  });
}

function renderFAQs(faqs) {
  const container = document.getElementById("faq-container");
  if (!container) return;
  container.innerHTML = "";
  faqs.forEach(faq => {
    const div = document.createElement("div");
    div.className = "border-b py-4";
    div.innerHTML = `
      <h4 class="font-bold text-lg">${faq.question}</h4>
      <p class="text-gray-600 mt-2">${faq.answer}</p>
    `;
    container.appendChild(div);
  });
}

function renderTestimonials(items) {
  const container = document.getElementById("testimonials-container");
  if (!container) return;
  container.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "p-6 bg-white shadow rounded-2xl";
    div.innerHTML = `
      <p class="italic text-gray-600">"${item.message}"</p>
      <div class="mt-4 font-bold">- ${item.name}</div>
    `;
    container.appendChild(div);
  });
}

// ===============================
// Load from Firebase
// ===============================
function loadServices() {
  const servicesRef = ref(db, "services");
  onValue(servicesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) renderServices(Object.values(data));
  });
}

function loadPortfolio() {
  const portfolioRef = ref(db, "portfolio");
  onValue(portfolioRef, (snapshot) => {
    const data = snapshot.val();
    if (data) renderPortfolio(Object.values(data));
  });
}

function loadFAQs() {
  const faqRef = ref(db, "faq");
  onValue(faqRef, (snapshot) => {
    const data = snapshot.val();
    if (data) renderFAQs(Object.values(data));
  });
}

function loadTestimonials() {
  const testimonialsRef = ref(db, "testimonials");
  onValue(testimonialsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) renderTestimonials(Object.values(data));
  });
}

// ===============================
// Init
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadServices();
  loadPortfolio();
  loadFAQs();
  loadTestimonials();
});
