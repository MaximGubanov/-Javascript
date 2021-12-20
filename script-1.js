const goods = [
    { title: 'Shirt', price: 150, img: '1'},
    { title: 'Socks', price: 50, img: '2'},
    { title: 'Jacket', price: 350, img: '3'},
    { title: 'Shoes', price: 250, img: '4'},
    { title: 'Socks', price: 50, img: '2'},
    { title: 'Jacket', price: 350, img: '3'},
];

const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price, img }) => {
    return `<div class="goods-item"><img src="${img}.jpg" alt=""><h3>${title}</h3><p>Цена: ${price}</p><p><a href="#" class="add-button">Добавить</a></p></p></div>`;
};
  
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            (item) =>  {
                return renderGoodsItem(item)
            }
        ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();


