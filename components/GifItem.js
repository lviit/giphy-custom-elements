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
        margin: 10px;
        position: relative; 
      }
      div {     
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.8) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      ::slotted(img) {
        display: block;
      }
      ::slotted(h2) {
        font-weight: 700;
        margin: 0;
        padding: 15px;
        color: white;
        text-shadow: 2px 2px 7px #071B28;
        letter-spacing: 0.5px;
      }
    </style>
    <slot name="image"></slot> 
    <div><slot name="title"></slot></div>`;
  }
}

export default GifItem;