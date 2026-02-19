console.log("INFINITE CAROUSEL ENABLED");

document.addEventListener('DOMContentLoaded', () => {

const wrapper = document.getElementById('slider-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let slideElements = [];
let slideWidth = 0;
let isScrolling = false;


// =========================
// CREATE SLIDES (INFINITE)
// =========================

// 원본 3번 복제
const infiniteSlides = [
...slides,
...slides,
...slides
];

infiniteSlides.forEach((s, index) => {

const slide = document.createElement('a');

slide.className = 'slide';

slide.href = s.link;

slide.dataset.index = index;

const img = document.createElement('img');
img.src = s.src;

const overlay = document.createElement('div');
overlay.className = 'slide-overlay';
overlay.textContent = s.id.toUpperCase();

slide.appendChild(img);
slide.appendChild(overlay);


// 클릭
slide.addEventListener('click', (e) => {

const isActive = slide.classList.contains('active');

if (!isActive) {

e.preventDefault();

centerSlide(slide);

} else {

// 중앙이면 페이지 이동
window.location.href = slide.href;

}

});

wrapper.appendChild(slide);

});


slideElements = document.querySelectorAll('.slide');


// =========================
// INITIAL POSITION (CENTER)
// =========================

function initPosition() {

slideWidth = slideElements[0].offsetWidth + 80;

const startIndex = slides.length;

wrapper.scrollLeft = slideWidth * startIndex;

}

setTimeout(initPosition, 100);


// =========================
// CENTER SLIDE
// =========================

function centerSlide(slide) {

wrapper.scrollTo({

left:
slide.offsetLeft
- wrapper.offsetWidth / 2
+ slide.offsetWidth / 2,

behavior: 'smooth'

});

}


// =========================
// INFINITE RESET
// =========================

function infiniteScrollFix() {

const maxScroll =
wrapper.scrollWidth - wrapper.offsetWidth;

if (wrapper.scrollLeft <= slideWidth) {

wrapper.scrollLeft += slideWidth * slides.length;

}

if (wrapper.scrollLeft >= maxScroll - slideWidth) {

wrapper.scrollLeft -= slideWidth * slides.length;

}

}


// =========================
// UPDATE ACTIVE + EFFECT
// =========================

function updateCarousel() {

const center =
wrapper.scrollLeft + wrapper.offsetWidth / 2;

let closestSlide = null;
let closestDistance = Infinity;

slideElements.forEach(slide => {

const slideCenter =
slide.offsetLeft + slide.offsetWidth / 2;

const distance =
Math.abs(center - slideCenter);

if (distance < closestDistance) {

closestDistance = distance;
closestSlide = slide;

}

const normalized =
Math.min(distance / (wrapper.offsetWidth / 2), 1);

const scale =
1.18 - normalized * 0.55;

const y =
normalized * 28;

const opacity =
0.5 + (1 - normalized) * 0.5;

slide.style.transform =
`translateY(${y}px) scale(${scale})`;

slide.style.opacity =
opacity;

slide.classList.remove('active');

});

if (closestSlide)
closestSlide.classList.add('active');

}


// =========================
// SCROLL EVENT
// =========================

wrapper.addEventListener('scroll', () => {

if (!isScrolling) {

requestAnimationFrame(() => {

updateCarousel();
infiniteScrollFix();

});

}

});


// =========================
// BUTTONS
// =========================

function scrollNext() {

wrapper.scrollBy({

left: slideWidth,
behavior: 'smooth'

});

}

function scrollPrev() {

wrapper.scrollBy({

left: -slideWidth,
behavior: 'smooth'

});

}

prevBtn.addEventListener('click', scrollPrev);
nextBtn.addEventListener('click', scrollNext);


// =========================
// WHEEL
// =========================

wrapper.addEventListener('wheel', (e) => {

e.preventDefault();

wrapper.scrollBy({

left: e.deltaY,
behavior: 'auto'

});

}, { passive:false });


// =========================
// INIT
// =========================

setTimeout(updateCarousel, 200);


// =========================
// NAVBAR EFFECT
// =========================

window.addEventListener('scroll', () => {

const navbar =
document.querySelector('.navbar');

if (window.scrollY > 50)
navbar.classList.add('scrolled');
else
navbar.classList.remove('scrolled');

});

});
