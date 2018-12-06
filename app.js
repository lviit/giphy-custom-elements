import request from "./request.js";

class GifList extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.state = {
      data: []
    };
  }

  connectedCallback() {
    this.fetchData();
  }

  async fetchData() {
    this.state.data = await request("dog");
    this.render();
  }

  render() {
    this.root.innerHTML = `
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
document.body.innerHTML = "<gif-list></gif-list>";
