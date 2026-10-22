const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");
const counter = document.getElementById("counter");

let currentIndex = 0;
let autoPlayTimer;

const totalSlides = slides.length;

// Create one indicator for every slide.
slides.forEach((slide, index) => {
    const indicator = document.createElement("button");

    indicator.className = "indicator";
    indicator.type = "button";
    indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);

    indicator.addEventListener("click", () => {
        showSlide(index);
        restartAutoPlay();
    });

    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll(".indicator");

function showSlide(index) {
    // Wrap around when reaching either end.
    currentIndex = (index + totalSlides) % totalSlides;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle("active", i === currentIndex);
        indicator.setAttribute(
            "aria-current",
            i === currentIndex ? "true" : "false"
        );
    });

    counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function previousSlide() {
    showSlide(currentIndex - 1);
}

function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 3000);
}

function restartAutoPlay() {
    startAutoPlay();
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoPlay();
});

prevBtn.addEventListener("click", () => {
    previousSlide();
    restartAutoPlay();
});

// Pause when the pointer is over the carousel.
carousel.addEventListener("mouseenter", () => {
    clearInterval(autoPlayTimer);
});

// Resume when the pointer leaves.
carousel.addEventListener("mouseleave", startAutoPlay);

// Start from the first slide.
showSlide(0);
startAutoPlay();
