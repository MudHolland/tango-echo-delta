class TFooter extends HTMLElement {
  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const html = await fetch("/assets/components/ulijn-footer/ulijn-footer.html").then(r => r.text());
    const css  = await fetch("/assets/components/ulijn-footer/ulijn-footer.css").then(r => r.text());

    shadow.innerHTML = `
      <link rel="stylesheet" href="/assets/css/style.css">
      <style>${css}</style>
      ${html}
    `;

    const currentYear = new Date().getFullYear();
    shadow.getElementById("copyrightYear").textContent = currentYear;
  }
}

customElements.define('ulijn-footer', TFooter);