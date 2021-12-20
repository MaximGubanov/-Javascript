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

  fetchGoods() {
    this.list = [
      new Good({id: 1, title: 'Футболка', price: 140, img: '1'}),
      new Good({id: 2, title: 'Кроссовки', price: 320, img: '4'}),
      new Good({id: 3, title: 'Куртка', price: 24, img: '3'}),
      new Good({id: 4, title: 'Футболка', price: 130, img: '6'}),
      new Good({id: 5, title: 'Кроссовки', price: 390, img: '5'}),
      new Good({id: 6, title: 'Куртка', price: 24, img: '7'}),
      new Good({id: 7, title: 'Носки', price: 25, img: '2'}),
      new Good({id: 8, title: 'Кроссовки', price: 245, img: '8'}),
    ]
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

showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(1)
showcase.addToCart(3)
showcase.addToCart(2)
showcase.addToCart(2)
showcase.addToCart(4)
showcase.addToCart(4)
cart.remove(1)

showcase.render()
cart.render()

