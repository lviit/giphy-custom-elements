let gifs = [{ title: "meow" }];
const setGifs = data => {
  gifs = data;
  render("gif-list");
};

const render = (component, parent = document.body) =>
  (parent.innerHTML = `<${component}></${component}>`);

const gifItemImport = document.getElementById("gif-item-import").import;
const gifItemTemplate = gifItemImport.getElementById("gif-item").content;

class GifItem extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" }).appendChild(
      gifItemTemplate.cloneNode(true)
    );
  }
}

customElements.define("gif-item", GifItem);

class GifList extends HTMLElement {
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
              <img slot="image" src="${
                gif.images.fixed_height_downsampled.url
              }"></img>
              <h2 slot="title">${gif.title}</h2>
            </gif-item>
        `
          )
          .join("")}
    `;
  }
}


customElements.define("gif-list", GifList);

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
