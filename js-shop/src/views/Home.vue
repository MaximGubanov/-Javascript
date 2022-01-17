<template>
  <div class="home">
    <header class="header">
      <div class="container">
        <div class="header__row">
          <li class="header__item">
            <a href="#">Главная</a>
          </li>
          <div class="header_search">
            <input type="text" id="search-input">
            <div class="header__item">
              <a href="#"><i class="fas fa-search" id="search-btn"></i></a>
            </div>
          </div>
          <li class="header__item header__item--size cart">
            <a href="#"><i class="fas fa-shopping-cart"></i><span>0</span></a>
            <div class="cart-box">
              <basket v-bind:list="basket"></basket>
            </div>
          </li>
        </div>
      </div>
    </header>
    <main class="main">
      <div class="container">
        <!-- <div id="app"> -->
          <showcase v-bind:list="showcase"></showcase>
        <!-- </div> -->
      </div>
    </main>
  </div>
</template>

<script>
const API_URL_SHOWCASE = "https://raw.githubusercontent.com/MaximGubanov/online-store-api/main/responses"

import cart from '../components/cart.vue'
import showcase from '../components/showcase.vue'

export default {
  name: 'Home',
  components: {
    cart, showcase,
  },
    data() {
       return {
        showcase: [],
        basket: [],
        basketCounter: 3,
       }
     },
    mounted() {
        // fetch(`${API_URL}/showcase`)
        fetch(`${API_URL_SHOWCASE}/catalogData.json`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.showcase = data
            })
        
        // fetch(`${API_URL}/cart`)
        fetch(`${API_URL_CART}/cartData.json`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.basket = data
            })
    }
}
</script>
