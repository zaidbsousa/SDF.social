document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.stories-swiper-wrapper');
    const slides = document.querySelectorAll('.stories-swiper-slide');
    const dotsContainer = document.querySelector('.stories-swiper-dots');
    let current = 0;
    let interval;
    const slideCount = slides.length;

    // Create dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'stories-swiper-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.stories-swiper-dot');

    function goToSlide(idx) {
        current = idx;
        update();
        resetInterval();
    }

    function update() {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === current);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === current);
        });
    }

    function nextSlide() {
        current = (current + 1) % slideCount;
        update();
    }

    function prevSlide() {
        current = (current - 1 + slideCount) % slideCount;
        update();
    }

    function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 3500);
    }

    update(); // Show the first slide
    resetInterval();

    // Pause on hover
    wrapper.addEventListener('mouseenter', () => clearInterval(interval));
    wrapper.addEventListener('mouseleave', resetInterval);

    // Optional: swipe gesture support for touch devices
    let startX = null;
    wrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    wrapper.addEventListener('touchend', (e) => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) prevSlide();
        else if (startX - endX > 40) nextSlide();
        startX = null;
        resetInterval();
    });

    // RTL support (if needed, reverse slide order)
}); 