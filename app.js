import request from "./request.js";

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.search = this.search.bind(this);
    this.state = {
      keywords: ""
    };
  }

  connectedCallback() {
    this.render();
    this.searchForm = this.shadowRoot.querySelector("#search-form");
    this.gifList = this.shadowRoot.querySelector("gif-list");
    this.searchForm.addEventListener("submit", this.search, false);
  }

  search(e) {
    e.preventDefault();
    const keywords = this.searchForm.elements["keywords"].value;
    this.gifList.setAttribute("keywords", keywords);
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/ ` 
      <form id="search-form">
        <input type="text" name="keywords">
      </form>
      <gif-list keywords=""></gif-list>
    `;
  }
}

customElements.define("app-container", App);

class GifList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      data: []
    };
  }

  static get observedAttributes() {
    return ['keywords'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.fetchData(newValue);
  }

  connectedCallback() {
    this.fetchData();
  }

  async fetchData(keywords = "dog") {
    console.log(keywords);
    this.state.data = await request(keywords);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      ${this.state.data
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
document.body.innerHTML = "<app-container></app-container>";
