let gifs = [{ title: "meow" }];
const setGifs = data => {
  gifs = data; 
  render("gif-list");
};

const render = (component, parent = document.body) =>
  parent.innerHTML = `<${component}></${component}>`;

customElements.define(
  "gif-item",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = ` 
      <div>
        <slot></slot>
      </div>
    `;
    }
  }
);

customElements.define(
  "gif-list",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = ` 
      <div>
        ${gifs
          .map(
            gif => `
            <gif-item>${gif.title}</gif-item>
        `
          )
          .join("")}
      </div>
    `;
    }
  }
);

const apiKey = "XL9ssBo4JgPg3UjjDdvmIRal65byInd0";
const host = "https://api.giphy.com";
const path = "/v1/gifs/search";

const url = new URL(host + path);
url.searchParams.set("api_key", apiKey);
url.searchParams.set("q", "cat");

fetch(url).then(res => {
  res.json().then(data => {
    setGifs(data.data);
  });
});
