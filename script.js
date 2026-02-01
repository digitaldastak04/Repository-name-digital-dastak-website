// Typing Animation Settings
const textElement = document.getElementById("typing-text");
const words = [
    "Website Development", "Mobile App Design", "Web Application Design",
    "Digital Graphics", "Creative Arts", "UI/UX Illustrate",
    "Brand Design", "Motion Animations"
];

let wordIdx = 0, charIdx = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        textElement.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && charIdx === currentWord.length) {
        isDeleting = true;
        speed = 2000; // Pause at end
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        speed = 500;
    }
    setTimeout(type, speed);
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const workDrop = document.getElementById('workDropdown');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Dropdown click for mobile
workDrop.addEventListener('click', () => {
    if(window.innerWidth <= 992) {
        workDrop.classList.toggle('active');
    }
});

document.addEventListener("DOMContentLoaded", type);

// Is line ki movement ko hamesha smooth rakhne ke liye check karein
window.addEventListener('load', () => {
    const ticker = document.querySelector('.skills-ticker');
    // Agar content kam ho toh aap isko double bhi kar sakte hain programmatically
});

/**
 * DIGITAL DASTAK - Artwork Slider Logic
 * Includes: 3D Coverflow, Thumbs Sync, Lazy Loading, and Auto-Counter
 */

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Thumbnail Slider Initialization
    // Yeh niche wali choti images ki line ko control karta hai
    var swiperThumbs = new Swiper(".thumbsSlider", {
        spaceBetween: 15,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        // Lazy loading for thumbnails
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 4,
        },
        // Hover effects ke liye mouse cursor support
        grabCursor: true,
    });

    // 2. Main Slider Initialization
    // Yeh bari images aur center focus ko control karta hai
    var swiperMain = new Swiper(".mainArtworkSwiper", {
        effect: "coverflow", // 3D Effect
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true, // Infinite scrolling
        speed: 1000, // Smooth movement speed
        
        // Autoplay settings (Auto-scroll)
        autoplay: {
            delay: 3000, // 3 seconds per slide
            disableOnInteraction: false, // User click ke baad bhi chalta rahe
        },

        // Lazy Loading Settings
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2, // Aage peeche ki images pehle se load rakhega
        },

        // 3D Coverflow Design settings
        coverflowEffect: {
            rotate: 0,      // Tilt angle (0 for straight)
            stretch: 70,    // Gap between slides
            depth: 200,     // 3D perspective depth
            modifier: 1,    // Effect strength
            slideShadows: false, // Cleaner look ke liye shadows off
        },

        // Navigation Arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        // Progress Bar (Niche wali moving line)
        pagination: {
            el: ".progress-bar-line",
            type: "progressbar",
        },

        // Connecting both sliders
        thumbs: {
            swiper: swiperThumbs,
        },

        // Click on side image to bring it to center
        slideToClickedSlide: true,
    });

    // 3. Counter Logic (01 / 15)
    // Jab slide change ho toh number update karne ke liye
    const currentIdxElement = document.getElementById('current-idx');
    const totalIdxElement = document.getElementById('total-idx');
    
    // Total slides count set karna (agar dynamic ho)
    // Agar fix 15 hain toh HTML mein 15 likha rehne dein
    if (totalIdxElement) {
        totalIdxElement.textContent = "16"; 
    }

    swiperMain.on('slideChange', function () {
        // realIndex loop hone ki wajah se actual image ka number deta hai
        let currentIndex = swiperMain.realIndex + 1;
        
        // Number ko 01, 02 ke format mein convert karna
        if (currentIdxElement) {
            currentIdxElement.textContent = currentIndex < 10 ? '0' + currentIndex : currentIndex;
        }
    });

});

// 1. Particles Config
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": ["#ff9d00", "#ffffff"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": false },
        "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": { "events": { "onhover": { "enable": true, "mode": "bubble" } } }
});

// 2. On-Scroll Counting Animation
const counters = document.querySelectorAll('.counter');
const statsSection = document.getElementById('stats-section');
let started = false;

const startCount = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = 2000; // 2 seconds
        const inc = target / (speed / 16);

        const update = () => {
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count) + "+";
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "+";
            }
        };
        update();
    });
};

// Intersection Observer for scroll check
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
        startCount();
        started = true;
    }
}, { threshold: 0.5 });

observer.observe(statsSection);

// Function to Open Lightbox
function openLightbox(imgSrc, captionText) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    lightbox.style.display = "flex";
    lightboxImg.src = imgSrc;
    lightboxCaption.innerHTML = captionText;

    // Scroll lock (optional)
    document.body.style.overflow = "hidden";
}

// Function to Close Lightbox
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    
    // Scroll unlock
    document.body.style.overflow = "auto";
}

// Escape key se popup close ho jaye
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});

function filterData(cat) {
    const items = document.querySelectorAll('.p-item');
    const btns = document.querySelectorAll('.filter-btn');

    // Active button toggle
    btns.forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.toLowerCase().includes(cat) || (cat==='all' && btn.textContent==='All Work')) 
            btn.classList.add('active');
    });

    // Filtering items with animation
    items.forEach(item => {
        item.style.display = "none";
        if(cat === 'all' || item.classList.contains(cat)) {
            item.style.display = "block";
        }
    });
}

// Lightbox Open/Close
function openMedia(type, src) {
    const lb = document.getElementById('mediaLightbox');
    const img = document.getElementById('lb-img');
    const vid = document.getElementById('lb-video');

    lb.style.display = 'flex';
    if(type === 'image') {
        vid.style.display = 'none';
        img.style.display = 'block';
        img.src = src;
    } else {
        img.style.display = 'none';
        vid.style.display = 'block';
        vid.src = src;
        vid.play();
    }
}

function closeMedia() {
    const lb = document.getElementById('mediaLightbox');
    const vid = document.getElementById('lb-video');
    lb.style.display = 'none';
    vid.pause(); vid.src = "";
}

function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.tab-btn');

    // Button active state handle karein
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Images filter karein
    items.forEach(item => {
        item.classList.remove('show'); // Pehle sab hide karein
        if (item.classList.contains(category)) {
            item.classList.add('show'); // Sirf selected dikhaein
        }
    });
}

// Page load par 'Website Development' (web) dikhane ke liye
document.addEventListener("DOMContentLoaded", function() {
    filterPortfolio('web');
});

function toggleVideo(container) {
    // Container ke andar wali video select karo
    const video = container.querySelector('.portfolio-video');
    
    if (video.paused) {
        video.play();
        container.classList.add('playing');
    } else {
        video.pause();
        container.classList.remove('playing');
    }
}

// Filtering wala purana logic yahan zaroor rakhein taake buttons kaam karein
function filterPortfolio(category) {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        item.classList.remove('show');
        // Video ko pause kar do agar wo category change kar raha hai
        const video = item.querySelector('video');
        if(video) video.pause();
        item.classList.remove('playing');

        if (item.classList.contains(category)) {
            item.classList.add('show');
        }
    });
}

//about script start //

let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

// Header Hide/Show on Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { // Thoda scroll hone ke baad logic chale
        if (lastScrollY < window.scrollY) {
            header.classList.add("header-hidden");
        } else {
            header.classList.remove("header-hidden");
        }
    }
    lastScrollY = window.scrollY;
});

// Randomize stars delay for natural blinking
document.querySelectorAll('.star').forEach((star, index) => {
    star.style.animationDelay = `${index * 0.4}s`;
});

//card //
// Header Scroll Logic);

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("header-hidden");
    } else {
        header.classList.remove("header-hidden");
    }
    lastScroll = currentScroll;
});

// Stars Timing Randomizer
document.querySelectorAll('.star').forEach((star, i) => {
    star.style.animationDelay = `${(i % 4) * 0.3}s`;
});

// card //
// Mobile Click Flip Support
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            const inner = this.querySelector('.card-inner');
            // Toggle rotation manually for touch screens
            inner.classList.toggle('is-flipped');
            if(inner.classList.contains('is-flipped')){
                inner.style.transform = "rotateY(180deg)";
            } else {
                inner.style.transform = "rotateY(0deg)";
            }
        }
    });
});

// Scroll Animation Logic journey
const timelineItems = document.querySelectorAll('.timeline-item');

const showItems = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if(itemTop < triggerBottom) {
            item.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', showItems);
// Initial check
showItems();

// Function to toggle Answer
function toggleFaq(element) {
    const card = element.parentElement;
    card.classList.toggle('open');
}

// Function to search Questions
function faqSearchLogic() {
    let input = document.getElementById('faqInput').value.toLowerCase();
    let cards = document.querySelectorAll('.faq-card');

    cards.forEach(card => {
        let questionText = card.querySelector('h3').innerText.toLowerCase();
        if (questionText.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}