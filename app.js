let gifs = [{ title: "meow" }];
const setGifs = data => {
  gifs = data;
  render("gif-list");
};

const render = (component, parent = document.body) =>
  (parent.innerHTML = `<${component}></${component}>`);

customElements.define(
  "gif-item",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = ` 
      <style>
        :host {
        }
        div {
          background-color: black;
          position: relative;
          height: 200px;
        }
        ::slotted(img) {
          position: absolute;
        }
        ::slotted(h2) {
          font-weight: 600;
          position: absolute;
          bottom: 0;
        }
      </style>
      <div>
        <slot name="image"></slot>
        <slot name="title"></slot>
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
        <style>
          :host {
           
          }
        </style>
        ${gifs
          .map(
            gif => `
            <gif-item>
              <img slot="image" src="${gif.images.fixed_height_downsampled.url}"></img>
              <h2 slot="title">${gif.title}</h2>
            </gif-item>
        `
          )
          .join("")}
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
