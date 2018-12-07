import request from "../request.js";

class GifList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      data: []
    };
  }

  static get observedAttributes() {
    return ["keywords"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.fetchData(newValue);
  }

  connectedCallback() {
    this.fetchData();
  }

  async fetchData(keywords = "dog") {
    this.state.data = await request(keywords);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        ${this.state.data
          .map(
            gif => `
            <gif-item>
              <img slot="image" src="${gif.images.fixed_height.url}"></img>
              <h2 slot="title">${gif.title}</h2>
            </gif-item>
        `
          )
          .join("")}
        `;
  }
}

export default GifList;
