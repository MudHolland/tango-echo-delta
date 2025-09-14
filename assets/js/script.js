document.addEventListener('DOMContentLoaded', function() {

  
  const heroSection = document.getElementById('hero');
  const bgImage = heroSection.getAttribute('data-bg');
  if (bgImage) {
      heroSection.style.setProperty('--hero-bg-image', `url(${bgImage})`);
  } else {
      heroSection.style.setProperty('--hero-bg-image', 'url("/assets/images/IMG_4422.png")');
  }

  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-control.next');
    const prevButton = carousel.querySelector('.carousel-control.prev');
    let originalClass = carousel.classList.contains('items-3') ? 'items-3' : 
                        carousel.classList.contains('items-2') ? 'items-2' : 'items-1';
    let itemsPerPage = getItemsPerPage();
    let currentPage = 0;
    let autoSlideInterval;
    let itemWidth = 0;
    let gap = 0;

    function getItemsPerPage() {
      if (window.innerWidth < 900) return 1;
      if (window.innerWidth < 1200) return 2;
      if (carousel.classList.contains('items-1')) return 1;
      if (carousel.classList.contains('items-2')) return 2;
      return 3;
    }

    function updateCarouselClasses() {
      if (window.innerWidth < 900) {
        carousel.classList.remove('items-2', 'items-3');
        carousel.classList.add('items-1');
      } else if (window.innerWidth < 1200) {
        carousel.classList.remove('items-3');
        carousel.classList.add('items-2');
      } else {
        carousel.classList.remove('items-1', 'items-2');
        carousel.classList.add(originalClass); // Restore original class
      }
    }

    // Initialize carousel
    const initCarousel = () => {
      updateCarouselClasses(); // Change classes based on screen width
      itemsPerPage = getItemsPerPage(); // Recalculate on resize
      gap = parseInt(getComputedStyle(track).gap) || 0;
      const containerPadding = parseInt(getComputedStyle(carousel).paddingLeft) - 60;
      const availableWidth = carousel.offsetWidth - containerPadding;
      itemWidth = (availableWidth - (itemsPerPage - 1) * gap) / itemsPerPage;
      
      moveToPage(0); // Reset to first page after recalculating
      
      // items.forEach(item => {
      //   item.style.minWidth = `${itemWidth}px`;
      // });
    };

    // Create indicators
    const createIndicators = () => {
      const numIndicators = Math.ceil(items.length / itemsPerPage);
      const indicatorsContainer = carousel.querySelector('.carousel-indicators');
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i < numIndicators; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
      }
      return Array.from(indicatorsContainer.children);
    };

    let indicators = createIndicators();

    const updateIndicators = () => {
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentPage);
      });
    };

    const moveToPage = (pageIndex) => {
      const totalPages = Math.ceil(items.length / itemsPerPage);
      currentPage = (pageIndex + totalPages) % totalPages;
      
      const offset = currentPage * (itemWidth + gap) * itemsPerPage;
      track.style.transform = `translateX(-${offset}px)`;
      updateIndicators();
    };

    const startAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        moveToPage(currentPage + 1);
      }, 10000);
    };

    // Event listeners
    nextButton.addEventListener('click', () => {
      moveToPage(currentPage + 1);
      startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
      moveToPage(currentPage - 1);
      startAutoSlide();
    });

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', () => moveToPage(i));
    });

    // Initialize and handle resize
    initCarousel();
    startAutoSlide();
    
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initCarousel();
        indicators = createIndicators(); // Recreate indicators on resize
        moveToPage(currentPage);
      }, 250);
    });
  });

});