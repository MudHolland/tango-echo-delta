class TLightbox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `  
      <div id="lightbox" class="lightbox">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" id="lightbox-img">
        <div id="lightbox-caption" class="lightbox-caption"></div>
      </div>
    `;

    // Query elements AFTER they exist
    const lightbox = this.querySelector('#lightbox');
    const lightboxImg = this.querySelector('#lightbox-img');
    const lightboxCaption = this.querySelector('#lightbox-caption');
    const lightboxClose = this.querySelector('.lightbox-close');

    document.querySelector('main').addEventListener('click', function (event) {
      if (event.target.tagName === 'IMG' && event.target.classList.contains('lightbox-enabled')) {
        lightbox.style.display = 'block';
        lightboxImg.src = event.target.src;
        lightboxCaption.textContent = event.target.alt;
        setTimeout(() => lightboxImg.classList.add('zoom-in'), 10);
      }
    });

    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox || event.target === lightboxClose) {
        lightbox.style.display = 'none';
        lightboxImg.classList.remove('zoom-in');
      }
    });
  }
}

customElements.define("ulijn-lightbox", TLightbox);
