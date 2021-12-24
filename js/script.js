const API_URL = 'https://raw.githubusercontent.com/MaximGubanov/online-store-api/main/responses/';
const API_URL_CART = 'https://raw.githubusercontent.com/MaximGubanov/online-store-api/main/responses/';

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

    this.counter();
  }
}

class Showcase {
  constructor(cart){

    this.list = [];
    this.cart = cart;
    this.filtred = [];

    this.$goodsList = document.querySelector('.goods-list');
    this.searchInput = document.getElementById('search-input');
    this.searchBtn = document.getElementById('search-btn');

    this.searchBtn.addEventListener('click', this.filter.bind(this));
  }

  filter() {
    const search = new RegExp(this.searchInput.value, 'i');
    this.filtred = this.list.filter((good) => search.test(good.title));
    this.$goodsList.innerHTML = '';
    this.render(this.filtred);
  }

  _onSuccess(response) {
    // const data = JSON.parse(response)
    const data = response;

    data.forEach(product => {
      this.list.push(
        new Good({id: product.id, title: product.title, price: product.price, img: product.img})
      )
    });
  }

  _onError(err) {
    console.log(err);
  }

  fetchGoods() {
    return fetch(`${API_URL}catalogData.json`)
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      this._onSuccess(response)
      return response
    })
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

  render(list = this.list) {
    list.forEach((row) => {
      let goodsList = this._renderRow(row);
      this.$goodsList.insertAdjacentHTML('beforeend', goodsList);
    });
  }
}

const cart = new Cart()
const showcase = new Showcase(cart)

const promise = showcase.fetchGoods()

promise.then(() => {
  showcase.addToCart(1)
  showcase.addToCart(1)
  showcase.addToCart(1)
  showcase.addToCart(3)
  showcase.addToCart(2)
  showcase.addToCart(2)
  showcase.addToCart(4)
  showcase.addToCart(4)
  cart.remove(1)
  cart.remove(4)

  showcase.render()
  
  cart.render()
})
.catch((error) => {console.log(error)})