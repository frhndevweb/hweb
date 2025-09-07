// Main JavaScript functionality for HWeb

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
});

function initializePage() {
    // Add smooth scrolling behavior
    initSmoothScrolling();
    
    // Initialize FAQ accordions
    initFAQAccordions();
    
    // Initialize animations
    initAnimations();
    
    // Load default data
    loadDefaultData();
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        // Close mobile menu if open
        closeMobileMenu();
    }
}

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
}

// Smooth scrolling initialization
function initSmoothScrolling() {
    // Add click event listeners to all navigation links
    const navLinks = document.querySelectorAll('[onclick^="scrollToSection"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('onclick').match(/scrollToSection\('(.+)'\)/)[1];
            scrollToSection(sectionId);
        });
    });
}

// FAQ accordion functionality
function initFAQAccordions() {
    // This will be populated when FAQ data is loaded
    // The actual accordion functionality is in the loadFAQs function
}

// Animation initialization
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
}

// Load default data for services, portfolio, testimonials, and FAQs
function loadDefaultData() {
    loadDefaultServices();
    loadDefaultPortfolio();
    loadDefaultTestimonials();
    loadDefaultFAQs();
}

// Default services data
function loadDefaultServices() {
    const defaultServices = [
        {
            id: '1',
            title: 'Website Portofolio',
            description: 'Tampilkan karya dan kemampuan Anda dengan website portofolio pribadi yang menarik dan profesional.',
            features: ['Desain modern & responsive', 'Gallery karya interaktif', 'Form kontak terintegrasi', 'SEO optimized'],
            price: 'Mulai dari 50k',
            icon: 'user',
            popular: false
        },
        {
            id: '2',
            title: 'Website Bisnis',
            description: 'Tingkatkan kredibilitas bisnis Anda dengan website company profile yang profesional dan berkualitas tinggi.',
            features: ['Company profile lengkap', 'Katalog produk/jasa', 'WhatsApp integration', 'Google Maps embed'],
            price: 'Mulai dari 50k',
            icon: 'building',
            popular: true
        },
        {
            id: '3',
            title: 'Blog & Custom',
            description: 'Website blog personal atau custom sesuai kebutuhan spesifik Anda dengan fitur lengkap.',
            features: ['CMS untuk posting artikel', 'Kategori & tag system', 'Komentar & sharing', 'Custom functionality'],
            price: 'Mulai dari 50K',
            icon: 'blog',
            popular: false
        }
    ];
    
    renderServices(defaultServices);
}

// Default portfolio data
function loadDefaultPortfolio() {
    const defaultPortfolio = [
        {
            id: '1',
            title: 'Toko Online Fashion',
            description: 'Website e-commerce modern dengan sistem pembayaran terintegrasi',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
            tags: ['E-Commerce', 'Responsive'],
            category: 'E-Commerce'
        },
        {
            id: '2',
            title: 'PT Maju Bersama',
            description: 'Company profile professional untuk perusahaan konstruksi',
            imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
            tags: ['Company Profile', 'SEO Ready'],
            category: 'Corporate'
        },
        {
            id: '3',
            title: 'Portofolio Fotografer',
            description: 'Website portofolio kreatif dengan galeri foto interaktif',
            imageUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
            tags: ['Portfolio', 'Creative'],
            category: 'Portfolio'
        }
    ];
    
    renderPortfolio(defaultPortfolio);
}

// Default testimonials data
function loadDefaultTestimonials() {
    const defaultTestimonials = [
        {
            id: '1',
            name: 'Andi Pratama',
            position: 'Owner Toko Online',
            content: 'Pelayanan sangat memuaskan! Website saya selesai dalam 20 jam dan hasilnya melebihi ekspektasi. Desainnya modern dan responsive.',
            rating: 5
        },
        {
            id: '2',
            name: 'Sarah Indah',
            position: 'Marketing Manager',
            content: 'Tim HWeb sangat profesional dan responsif. Website company profile kami jadi terlihat lebih berkelas dan menarik klien baru.',
            rating: 5
        },
        {
            id: '3',
            name: 'Budi Santoso',
            position: 'Fotografer Freelance',
            content: 'Harga terjangkau dengan kualitas premium. Plus dapat domain gratis! Recommended banget untuk yang butuh website cepat.',
            rating: 5
        }
    ];
    
    renderTestimonials(defaultTestimonials);
}

// Default FAQs data
function loadDefaultFAQs() {
    const defaultFAQs = [
        {
            id: '1',
            question: 'Berapa lama proses pembuatan website?',
            answer: 'Proses pembuatan website kami paling cepat 24 jam untuk website sederhana. Untuk website yang lebih kompleks, biasanya membutuhkan 3-7 hari kerja tergantung tingkat kerumitan dan fitur yang diminta.',
            order: 0
        },
        {
            id: '2',
            question: 'Domain gratis apa saja yang tersedia?',
            answer: 'Kami menyediakan domain gratis untuk ekstensi .xyz, .my.id, dan .biz.id. Domain ini gratis untuk tahun pertama. Jika Anda membutuhkan domain .com atau .id, kami dapat bantu dengan biaya tambahan.',
            order: 1
        },
        {
            id: '3',
            question: 'Apakah website akan responsive di mobile?',
            answer: 'Ya, semua website yang kami buat 100% responsive dan mobile-friendly. Website akan tampil sempurna di berbagai perangkat mulai dari smartphone, tablet, hingga desktop dengan berbagai ukuran layar.',
            order: 2
        },
        {
            id: '4',
            question: 'Bagaimana sistem pembayaran?',
            answer: 'Sistem pembayaran kami fleksibel. Anda bisa membayar DP 50% di awal, sisanya setelah website selesai. Kami menerima pembayaran via transfer bank, e-wallet (Dana, OVO, GoPay), dan cryptocurrency.',
            order: 3
        },
        {
            id: '5',
            question: 'Apakah ada garansi dan after-sales support?',
            answer: 'Ya, kami memberikan garansi 30 hari untuk bug fixing dan minor adjustment. Kami juga menyediakan layanan maintenance dan update konten dengan biaya yang sangat terjangkau.',
            order: 4
        }
    ];
    
    renderFAQs(defaultFAQs);
}

// Render functions
function renderServices(services) {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = createServiceCard(service);
        container.appendChild(serviceCard);
    });
}

function renderPortfolio(portfolio) {
    const container = document.getElementById('portfolio-container');
    container.innerHTML = '';
    
    portfolio.forEach(item => {
        const portfolioCard = createPortfolioCard(item);
        container.appendChild(portfolioCard);
    });
}

function renderTestimonials(testimonials) {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = '';
    
    testimonials.forEach(testimonial => {
        const testimonialCard = createTestimonialCard(testimonial);
        container.appendChild(testimonialCard);
    });
}

function renderFAQs(faqs) {
    const container = document.getElementById('faq-container');
    container.innerHTML = '';
    
    faqs.sort((a, b) => a.order - b.order).forEach((faq, index) => {
        const faqItem = createFAQItem(faq, index);
        container.appendChild(faqItem);
    });
}

// Create card elements
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = `service-card rounded-2xl p-8 border shadow-sm ${
        service.popular 
            ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
            : 'bg-white border-gray-200'
    }`;
    
    const icon = getServiceIcon(service.icon, service.popular);
    const featuresHTML = service.features.map(feature => `
        <li class="flex items-center text-sm">
            <svg class="mr-3 w-4 h-4 ${service.popular ? 'text-yellow-400' : 'text-green-500'}" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>${feature}</span>
        </li>
    `).join('');
    
    card.innerHTML = `
        <div class="${service.popular ? 'bg-white/20' : 'bg-blue-600/10'} w-14 h-14 rounded-xl flex items-center justify-center mb-6">
            ${icon}
        </div>
        <h3 class="text-2xl font-bold mb-4 ${service.popular ? 'text-white' : 'text-gray-900'}">
            ${service.title}
        </h3>
        <p class="mb-6 ${service.popular ? 'text-white/80' : 'text-gray-600'}">
            ${service.description}
        </p>
        <ul class="space-y-3 mb-8">
            ${featuresHTML}
        </ul>
        <div class="text-2xl font-bold mb-4 ${service.popular ? 'text-yellow-400' : 'text-blue-600'}">
            ${service.price}
        </div>
        ${service.popular ? '<div class="bg-yellow-400/20 text-yellow-400 text-xs font-semibold px-3 py-2 rounded-lg inline-block">MOST POPULAR</div>' : ''}
    `;
    
    return card;
}

function createPortfolioCard(item) {
    const card = document.createElement('div');
    card.className = 'portfolio-item service-card bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm';
    
    const tagsHTML = item.tags.map(tag => `
        <span class="px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}">
            ${tag}
        </span>
    `).join('');
    
    card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-48 object-cover" />
        <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
            <p class="text-gray-600 mb-4">${item.description}</p>
            <div class="flex flex-wrap gap-2">
                ${tagsHTML}
            </div>
        </div>
    `;
    
    return card;
}

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card service-card';
    
    const starsHTML = Array.from({ length: 5 }, (_, index) => `
        <svg class="w-4 h-4 ${index < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
    `).join('');
    
    const iconColors = ['bg-blue-600/20 text-blue-600', 'bg-yellow-400/20 text-yellow-400', 'bg-green-500/20 text-green-500'];
    const iconColor = iconColors[Math.floor(Math.random() * iconColors.length)];
    
    card.innerHTML = `
        <div class="flex items-center mb-4">
            <div class="flex text-sm">
                ${starsHTML}
            </div>
        </div>
        <p class="text-gray-600 mb-6 italic">"${testimonial.content}"</p>
        <div class="flex items-center">
            <div class="w-10 h-10 ${iconColor} rounded-full flex items-center justify-center mr-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
            <div>
                <p class="font-semibold">${testimonial.name}</p>
                <p class="text-sm text-gray-600">${testimonial.position}</p>
            </div>
        </div>
    `;
    
    return card;
}

function createFAQItem(faq, index) {
    const item = document.createElement('div');
    item.className = 'faq-item';
    
    item.innerHTML = `
        <button class="faq-button" onclick="toggleFAQ(${index})">
            <span class="font-semibold text-gray-900">${faq.question}</span>
            <svg class="faq-icon w-5 h-5 text-gray-600 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div class="faq-content">
            <p class="text-gray-600">${faq.answer}</p>
        </div>
    `;
    
    return item;
}

// Helper functions
function getServiceIcon(iconName, isPopular) {
    const iconColor = isPopular ? 'text-white' : 'text-blue-600';
    
    switch (iconName) {
        case 'user':
            return `<svg class="w-8 h-8 ${iconColor}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
        case 'building':
            return `<svg class="w-8 h-8 ${iconColor}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`;
        case 'blog':
            return `<svg class="w-8 h-8 ${iconColor}" fill="currentColor" viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>`;
        default:
            return `<svg class="w-8 h-8 ${iconColor}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
    }
}

function getTagColor(tag) {
    switch (tag.toLowerCase()) {
        case 'e-commerce':
            return 'bg-blue-600/10 text-blue-600';
        case 'responsive':
            return 'bg-yellow-400/10 text-yellow-600';
        case 'company profile':
            return 'bg-blue-600/10 text-blue-600';
        case 'seo ready':
            return 'bg-green-500/10 text-green-600';
        case 'portfolio':
            return 'bg-blue-600/10 text-blue-600';
        case 'creative':
            return 'bg-purple-500/10 text-purple-600';
        default:
            return 'bg-gray-200 text-gray-600';
    }
}

// FAQ toggle functionality
let openFAQIndex = null;

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqItem = faqItems[index];
    const faqContent = faqItem.querySelector('.faq-content');
    const faqIcon = faqItem.querySelector('.faq-icon');
    
    if (openFAQIndex === index) {
        // Close current FAQ
        faqContent.classList.remove('open');
        faqIcon.classList.remove('rotated');
        openFAQIndex = null;
    } else {
        // Close previously open FAQ
        if (openFAQIndex !== null) {
            const prevFaqItem = faqItems[openFAQIndex];
            const prevFaqContent = prevFaqItem.querySelector('.faq-content');
            const prevFaqIcon = prevFaqItem.querySelector('.faq-icon');
            prevFaqContent.classList.remove('open');
            prevFaqIcon.classList.remove('rotated');
        }
        
        // Open current FAQ
        faqContent.classList.add('open');
        faqIcon.classList.add('rotated');
        openFAQIndex = index;
    }
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleFAQ = toggleFAQ;