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
      <style>
        form {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
        }
        input {
          font-size: 2rem;
          padding: 10px 15px;
          border: 0;
          background: #eee;
          font-weight: 700;
          letter-spacing: 1px;
        }
        svg {
          margin-left: -20px;
        }
        gif-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 1200px;
          margin: 0 auto;
        }
      </style>
      <form id="search-form">
        <input type="text" name="keywords" placeholder="search">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13">
          <g stroke-width="2" stroke="#6c6c6c" fill="none">
            <path d="M11.29 11.71l-4-4"/>
            <circle cx="5" cy="5" r="4"/>
          </g>
        </svg>
      </form>
      <gif-list keywords=""></gif-list>
    `;
  }
}

customElements.define("app-container", App);
document.getElementById("root").innerHTML = "<app-container></app-container>";
