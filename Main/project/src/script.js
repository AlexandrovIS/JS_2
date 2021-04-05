import { cart } from './components/cart'
import { goodsItem } from './components/goodsItem'
import { goodsItemCart } from "./components/goodsItemCart";

const vue = new Vue({
  el: '#app',
  data: {
    cart: [],
    goods: [],
    filtredGoods: [],
    isLoaded: false,
  },
  methods: {
    addToCartHandler(id) {
      // const id = e.target.closest('.goods-item').dataset.id
      const good = this.goods.find((item) => item.id == id)

      fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good)
      })
      this.cart.push(good)

    },
    removeFromCartHandler(id) {
      // const id = e.target.closest('.goods-item').dataset.id
      const goodIndex = this.cart.findIndex((item) => item.id == id)
      this.cart.splice(goodIndex, 1)

      fetch('/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.cart)
        // body: JSON.stringify({id})
      })
    },
    searchHandler(e) {
      this.filtredGoods = e
    }
  },
  mounted() {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        this.goods = data
        this.filtredGoods = data
        this.isLoaded = true
      })
      .catch(err => {
        document.querySelector('.goods-list').innerHTML = err
      })

    fetch('/cart')
      .then(response => response.json())
      .then(data => {
        this.cart = data
      })
      .catch(err => {
        console.log(err)
      })
  }
})
