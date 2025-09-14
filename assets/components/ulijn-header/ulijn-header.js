class THeader extends HTMLElement {
  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const html = await fetch("/assets/components/ulijn-header/ulijn-header.html").then(r => r.text());
    const css  = await fetch("/assets/components/ulijn-header/ulijn-header.css").then(r => r.text());

    shadow.innerHTML = `
      <link rel="stylesheet" href="/assets/css/style.css">
      <style>${css}</style>
      ${html}
    `;

    const hamburger = shadow.querySelector('.hamburger');
    const navLinks  = shadow.querySelector('.nav__links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    navLinks.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  }
}

customElements.define('ulijn-header', THeader);