class THero extends HTMLElement {
  async connectedCallback() {
    const title = this.getAttribute("title");
    const text = this.getAttribute("text");
    const showDiensten = this.hasAttribute("secondary");

    const shadow = this.attachShadow({ mode: "open" });

    const html = await fetch("/assets/components/ulijn-hero/ulijn-hero.html").then(r => r.text());
    const css  = await fetch("/assets/components/ulijn-hero/ulijn-hero.css").then(r => r.text());

    shadow.innerHTML = `
      <link rel="stylesheet" href="/assets/css/style.css">
      <style>${css}</style>
      ${html}
    `;

    // Fill in dynamic content
    shadow.querySelector("h1").textContent = title;
    shadow.querySelector("p").textContent = text;

    // Conditional logic
    if (!showDiensten) {
      shadow.querySelector("#diensten-button").remove();
    }
  }
}

customElements.define("ulijn-hero", THero);
