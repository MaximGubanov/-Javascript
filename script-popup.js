const cartIcon = document.querySelector('.cart');
const cartList = document.querySelector('.cart-box');
const cartCounter = document.querySelector('.cart').querySelector('span');

cartIcon.addEventListener('mouseover', function() {
    cartList.classList.add('active')
});

cartList.addEventListener('mouseout', function() {
    cartList.classList.remove('active')
});


// cartCounter.innerHTML = '0';
cartCounter.innerHTML = `${cart.list.length}`;
