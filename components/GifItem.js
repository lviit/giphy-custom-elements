class GifItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
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
    <div><slot name="image"></slot> <slot name="title"></slot></div>`;
  }
}

export default GifItem;