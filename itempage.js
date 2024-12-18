const template = document.createElement("template");
template.innerHTML = `

<style>
    .itempage {
        margin: 100px auto;
        width: 70%;
        height: fit-content;
        align-items: center;
    }

    .itempage[aria-hidden="true"] {
        display: none;
    }
    
    .itempage[aria-hidden="false"] {
        display: flex;
    }

    .right {
        display: flex;
        width: fit-content;
        flex-direction: column;
        align-items: flex-start;
        padding: 25px 50px;
        gap: 30px;
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
        font-size: 24px;
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
 
    label {
        font-family: Arial, Helvetica, sans-serif;
    } 
      
 

</style>

<div class="itempage" aria-hidden="false">

<div class="left">
  <p><i class="arrow L"></i></p>
  <div class="image-container">
    <div class="slides"></div>
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
  <form id="dropdown">
    <label for="options">Size:</label>
    <select id="options" name="number"></select>
  </form>
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
        const imageSlot = this.shadowRoot.querySelector('.slides');
        const images = this.querySelectorAll('img');
        const sizes = this.querySelectorAll('option')
        const drop = this.shadowRoot.querySelector('#options')

        sizes.forEach(size => {
            drop.appendChild(size);
        })

        images.forEach(image => {
            image.classList.add('image')
            imageSlot.appendChild(image)
            image.style.display = "none";
        });

        let currIndex = 0;
        images[currIndex].style.display = "block";

        function updateDisplay() {
            images.forEach(image => {
                image.style.display = "none";
            });
            images[currIndex].style.display = "block";
        }

        function changeLeft() {
            currIndex--;
            if (currIndex < 0) {
                currIndex = images.length - 1;
            }
            updateDisplay()
        };
        
        function changeRight() {
            currIndex++;
            if (currIndex >= images.length) {
                currIndex = 0;
            }
            updateDisplay()
        };

        const leftArrowButton = this.shadowRoot.querySelector('.arrow.L');
        const rightArrowButton = this.shadowRoot.querySelector('.arrow.R');
        leftArrowButton.addEventListener('click', changeLeft);
        rightArrowButton.addEventListener('click', changeRight);
    }
}

window.customElements.define("item-page", itempage);