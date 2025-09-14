class TContact extends HTMLElement {
  async connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    // Fetch HTML and CSS
    const html = await fetch("/assets/components/ulijn-contact/ulijn-contact.html").then(r => r.text());
    const css  = await fetch("/assets/components/ulijn-contact/ulijn-contact.css").then(r => r.text());

    shadow.innerHTML = `
      <link rel="stylesheet" href="/assets/css/style.css">
      <style>${css}</style>
      ${html}
    `;
  }
}

customElements.define("ulijn-contact", TContact);
