const template = document.createElement("template");
template.innerHTML = `

<style>
    .itempage {
        border: 1px solid black;
        margin: 100px auto;
        width: 70%;
        height: fit-content;
        display: flex;
    }

    .right {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        padding: 25px 50px;
        gap: 20px;
        // text-align; center;
    }

    .title {
        font-size: 24px;
        color: black;
        font-weight: bold;
        font-family: 'Arial';
    }

    .price {
        font-size: 36px;
        font-weight: bold;
        font-family: arial;
    }

    img {
        width: 40vw;
        height: 40vh;
    }

    .info {
        font-size: 16px;
        // padding: 10px;
        font-family: 'Arial';

    }

    button {
        all: unset;
        padding: 10px 15px;
        border-radius: 30px;
        color: white;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        background-color: black;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.5;
    }



  

</style>

<div class="itempage">
  <div class="image"></div>
  <div class="right">
  <div class="title">
    <slot name="title">TITLE GOES HERE</slot>
  </div>
  <div class="price">
    <slot name="price">MESSAGE</slot>
  </div>
  <div class="info">
    <slot name="info">MESSAGE</slot>
  </div>
  <button>Add to Shopping Cart</button>
  </div>
</div>

  `;

class itempage extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Check for <img> tags inside the light DOM
        const imageSlot = this.shadowRoot.querySelector('.image');
        const lightImage = this.querySelector('img');

        if (lightImage) {
            // Move the <img> tag into the shadow DOM's .image div
            imageSlot.appendChild(lightImage);
        }
    }
}

window.customElements.define("item-page", itempage);