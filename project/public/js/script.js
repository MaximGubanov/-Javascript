// const API_URL = "http//localhost/api/v1"
const API_URL_SHOWCASE = "https://raw.githubusercontent.com/MaximGubanov/online-store-api/main/responses"
const API_URL_CART = "https://raw.githubusercontent.com/MaximGubanov/online-store-api/main/responses"

new Vue({
    el: '#app',
    data: {
        showcase: [],
        basket: [],
        basketCounter: 3,
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
})