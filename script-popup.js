const cartIcon = document.querySelector('.cart');
const cartList = document.querySelector('.cart-box');

cartIcon.addEventListener('mouseover', function() {
    cartList.classList.add('active')
});

cartList.addEventListener('mouseout', function() {
    cartList.classList.remove('active')
});