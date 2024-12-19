const template = document.createElement("template");
template.setAttribute('id', "custom-home");   
template.innerHTML = `

<style>

.homepage {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.new-releases {
    font-size: 24px;
    font-family: Arial, Helvetica, sans-serif;
    margin: 50px;
  }
  
  .new-releases img {
    width: 400px;
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
  
  .heading {
    display: flex;
    justify-content: space-between;
  }
  
  .arrows {
    display: flex;
  }

  ::slotted(img[slot="header"]) {
    width: 100%;
    height: auto;
}

 ::slotted(img[slot="new-shoes"]) {
     width: 400px;
    height: auto;
}
    

</style>

<div class="homepage">
  <slot name="header"></slot>
  <div class="new-releases">
    <div class="heading">
      <p>New releases</p>
      <div class="arrows">
        <p><i class="arrow L"></i></p>
        <p><i class="arrow R"></i></p>
      </div>
    </div>
    <slot name="new-shoes"></slot>
  </div>
</div>


  `;

class homepage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const headerImg = this.querySelector('img[alt="headerimg"]');
        if (headerImg) {
            headerImg.setAttribute('slot', 'header');
        }
    
        const newShoes = this.querySelectorAll('.new-shoe');
        newShoes.forEach(img => {
            img.setAttribute('slot', 'new-shoes');
        });
    }
}

window.customElements.define("home-page", homepage);