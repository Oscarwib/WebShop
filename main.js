document.addEventListener("DOMContentLoaded", (event) => {

    const item = document.querySelector('.fa');
    const myComponent = document.querySelector('cart-page');
    const shadowRoot = myComponent.shadowRoot;
    const internalElement = shadowRoot.querySelector('.checkout');

    item.addEventListener('click', () => {
        internalElement.setAttribute("aria-hidden", "false");
        // console.log(shadowRoot)
    })

  });