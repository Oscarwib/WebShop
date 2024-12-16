const template = document.createElement("template");
template.innerHTML = `

<style>
    .itempage {
        // border: 1px solid black;
        margin: 100px auto;
        width: 70%;
        height: fit-content;
        display: flex;
        align-items: center;
    }

    .right {
        display: flex;
        width: fit-content;
        flex-direction: column;
        align-items: flex-start;
        padding: 25px 50px;
        gap: 20px;
    }

    .left {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
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
        background-position: center;
        transition: background 0.8s;
    }

    button:hover {
        background-color: #4e4e4e;
        background-image: radial-gradient(circle,transparent 1%, #4e4e4e 1%);
        background-position: center;
        background-size: 15000%;
    }

    button:active {
        transition: background 0s;
        background-color: #c3c3c3;
        background-size: 100%;
    }
  
    .image-container {
        width: 450px; 
        height: 450px;
        background-color: black;
    }

    .slides {
        width: 100%;
        height: 100%;
    }

    .image {
        display: block;
        width: 100%;    
        height: auto;
    }

    .arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 8px;
      }
      
      .R {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }

      .L {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
      }

      .arrow:active {
        border: solid gray;
        border-width: 0 3px 3px 0;
      }
 

</style>

<div class="itempage">

<div class = "left">
<p><i class="arrow L"></i></p>
<div class = "image-container">
    <div class = "slides"></div>
</div>
<p><i class="arrow R"></i></p>
</div>

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
        const imageSlot = this.shadowRoot.querySelector('.slides');
        const lightImage = this.querySelectorAll('img');

        lightImage.forEach(image => {
            image.classList.add('image')
            imageSlot.appendChild(image)
        });

    }
}

window.customElements.define("item-page", itempage);


{/* <div id= "left" class="arrow"></div>
<div id="wrapper">
    <div class = "image-container">
        <div class = "slides">  <!--Detta representerar alla bilder-->
            <!-- varje individuell bild som skapas genom js kommer hamna här -->
        </div>
    </div>
</div>
<div id= "right" class="arrow"></div> */}