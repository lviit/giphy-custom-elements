import GifList from "./components/GifList.js";
import GifItem from "./components/GifItem.js";

customElements.define("gif-list", GifList);
customElements.define("gif-item", GifItem);

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.search = this.search.bind(this);
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
document.body.innerHTML = "<app-container></app-container>";
