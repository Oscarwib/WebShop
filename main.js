document.addEventListener("DOMContentLoaded", (event) => {

    const item = document.querySelector('.fa');
    const myComponent = document.querySelector('cart-page');
    const shadowRoot = myComponent.shadowRoot;
    const internalElement = shadowRoot.querySelector('.checkout');

    const page = document.querySelector('item-page');
    const pageRoot = page.shadowRoot;
    const intr = pageRoot.querySelector('.itempage');

    item.addEventListener('click', () => {
        internalElement.setAttribute("aria-hidden", "false");
        intr.setAttribute("aria-hidden", "true");
        // console.log(shadowRoot)
    })

  });