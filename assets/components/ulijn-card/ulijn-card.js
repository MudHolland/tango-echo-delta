class TCard extends HTMLElement {
  async connectedCallback() {
    this.classList.add("jobs-list__job");
    
    const href  = this.getAttribute("href");
    const src   = this.getAttribute("src");
    const alt   = this.getAttribute("alt");
    const title = this.getAttribute("title");
    const text  = this.getAttribute("text");

    const shadow = this.attachShadow({ mode: "open" });

    const html = await fetch("/assets/components/ulijn-card/ulijn-card.html").then(r => r.text());
    const css  = await fetch("/assets/components/ulijn-card/ulijn-card.css").then(r => r.text());

    shadow.innerHTML = `
      <link rel="stylesheet" href="/assets/css/style.css">
      <style>${css}</style>
      ${html}
    `;
    

    // Fill dynamic values
    const link = shadow.querySelector("a");
    if (href) link.href = href;

    const img = shadow.querySelector("img");
    if (src) img.src = src;
    if (alt) img.alt = alt;

    if (title) shadow.querySelector("h3").textContent = title;
    if (text)  shadow.querySelector("p").textContent = text;
  }
}

customElements.define("ulijn-card", TCard);
