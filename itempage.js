const template = document.createElement("template");
template.innerHTML = `
<link
rel="stylesheet"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.2.0/css/fork-awesome.min.css" integrity="sha256-XoaMnoYC5TH6/+ihMEnospgm0J1PM/nioxbOUdnM8HY=" crossorigin="anonymous">

<style>
    .infobox {
        border: 1px solid black;
        margin: 15px auto;
        width: 80vmin;
    }

    .heading {
        display: flex;
        flex-flow: row;
        align-items: center;
        width: 100%;
        background-color: orange;
    }

    .title {
        color: white;
        font-weight: bold;
        font-family: 'Arial';
    }

    .icon {
        margin: 3px;
    }

    .message {
        font-size: 16px;
        padding: 10px;
        font-family: 'Arial';

    }     
</style>

  <div class="infobox">
    <div class="heading">
      <div class="icon center">
        <i
          class="fa fa-info-circle fa-lg fa-inverse fa-fw"
          aria-hidden="true"
        ></i>
      </div>
      <div class="title">
        <p>
          <slot name="title">TITLE GOES HERE</slot>
        </p>
      </div>
    </div>
    <div class="message">
      <slot name="message">MESSAGE</slot>
    </div>
  </div>
  `;

class infobox extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define("info-message", infobox);