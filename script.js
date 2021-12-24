// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const API_URL = 'https://raw.githubusercontent.com/MaximGubanov/online-store-api/main/responses/';
const API_URL_CART = 'https://raw.githubusercontent.com/MaximGubanov/online-store-api/main/responses/';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {
 
  let xhr;

  if (window.XMLHttpRequest) {
    // Chrome, Mozilla, Opera, Safari
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { 
    // Internet Explorer
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  for([key, value] of Object.entries(headers)) {
    xhr.setRequestHeader(key, value)
  }

  xhr.timeout = timeout; 

  xhr.ontimeout = onError;

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if(xhr.status < 400) {
        onSuccess(xhr.responseText)
      } else if (xhr.status >= 400) {
        onError(xhr.status)
      }
    }
  }

  xhr.open(method, url, true);

  xhr.send(data);
}

function getCounter() {
  let last = 0;

  return () => ++last;
}

const stackIDGenrator = getCounter()

class Good {
  constructor({id, title, price, img}) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
  }

  getId() {
    return this.id;
  }

  getPrice() {
    return this.price;
  }

  getTitle() {
    return this.title;
  }

  getImg() {
    return this.img;
  }
}

class GoodStack {
  constructor(good) {
    this.id = stackIDGenrator();
    this.good = good;
    this.count = 1;
  }

  getGoodId() {
    return this.good.id
  }

  getGood(){
    return this.good;
  }

  getCount() {
    return this.count;
  }

  add() {
    this.count++;
    return this.count;
  }

  remove() {
    this.count--;
    return this.count;
  }
}

class Cart {
  constructor(){
    this.list = []
  }

  add(good) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id)

    if(idx >= 0) {
      this.list[idx].add()
    } else {
      this.list.push(new GoodStack(good))
    }
  }

  remove(id) {
    const idx = this.list.findIndex((stack) => stack.getGoodId() == id)

    if(idx >= 0) {
      this.list[idx].remove()

      if(this.list[idx].getCount() <= 0) {
        this.list.splice(idx, 1)
      }
    } 
  }



  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(
        new GoodStack({id: product.id, title: product.title, price: product.price, count: product.count})
      )
    });
  }

  _onError(err) {
    console.log(err);
  }

  fetchCart() {
    send(this._onError, this._onSuccess.bind(this), `${API_URL_CART}cartData.json`)
  }



  counter() {
    const cartCounter = document.querySelector('.cart').querySelector('span');
    let count = 0;
    
    this.list.forEach((product) => {
      count += product.count;
    });

    cartCounter.innerHTML = `${count}`;
  }

  _renderRow({id, good, count}) {
    return `<tr><td>${id}</td><td>${good.title}</td><td>${good.price}</td><td>${count}</td><td><a href="" id="${id} class="remove-button">Удалить</a></td></tr>`;
  }

  render() {
    const $cartBody = document.querySelector('.cart-body');

    this.list.forEach((row) => {
      let goodsList = this._renderRow(row);
      $cartBody.insertAdjacentHTML('beforeend', goodsList);
    });
  }
}

class Showcase {
  constructor(cart){
    this.list = [];
    this.cart = cart;
  }

  _onSuccess(response) {
    const data = JSON.parse(response)
    data.forEach(product => {
      this.list.push(
        // new Good({id: product.id_product, title:product.product_name, price:product.price})
        new Good({id: product.id, title: product.title, price: product.price, img: product.img})
      )
    });
  }

  _onError(err) {
    console.log(err);
  }

  fetchGoods() {
    send(this._onError, this._onSuccess.bind(this), `${API_URL}catalogData.json`)
  }

  addToCart(id) {
    const idx = this.list.findIndex((good) => id == good.id)

    if(idx >= 0) {
      this.cart.add(this.list[idx])
    }
  }

  _renderRow({id, title, price, img}) {
    return `<div class="goods-item"><img src="img/${img}.jpg" alt=""><h3>${title}</h3><p>Цена: ${price}</p><p><a href="#" id="${id}" class="add-button">Добавить</a></p></p></div>`;
  }

  render() {
    const $goodsList = document.querySelector('.goods-list');

    this.list.forEach((row) => {
      let goodsList = this._renderRow(row);
      $goodsList.insertAdjacentHTML('beforeend', goodsList);
    });
  }
}

const cart = new Cart()
const showcase = new Showcase(cart)

showcase.fetchGoods()
cart.fetchCart()

setTimeout(() => {

  // showcase.addToCart(1)
  // showcase.addToCart(1)
  // showcase.addToCart(1)
  // showcase.addToCart(3)
  // showcase.addToCart(2)
  // showcase.addToCart(2)
  // showcase.addToCart(4)
  // showcase.addToCart(4)
  // cart.remove(1)
  // cart.remove(4)

  showcase.render()
  cart.render()
  cart.counter()
  console.log(cart)

}, 1000)

