Vue.component('goods-item', {
  template: `<div :data-id="id" class="goods-item" >
  <h3>{{title}}</h3>
  <p>{{price}}</p>
  <button v-on:click="add">add</button>
  </div>`,
  props: ['title', 'price', 'id'],
  methods: {
    add(e) {
      this.$emit('buttoadd', this.id)
    }
  }
})

Vue.component('goods-item-cart', {
  template: `<div :data-id="id" class="goods-item" >
  <h3>{{title}}</h3>
  <p>{{price}}</p>
  <button v-on:click="add"> del </button>
  </div>`,
  props: ['title', 'price', 'id'],
  methods: {
    add(e) {
      this.$emit('buttoadd', this.id)
    }
  }
})

Vue.component('search', {
  template: `<input @input="check" v-model="search" placeholder="ПОИСК">`,
  data() {
    return {
      search: '',
      arrFiltered: []
    }
  },
  methods: {
    check() {
      //e.target.value
      if (this.search === '') {
        this.arrFiltered = this.goods_arr
      }
      const regexp = new RegExp(this.search, "i")
      this.arrFiltered = this.goods_arr.filter((good) => regexp.test(good.title));
      this.$emit('filtred', this.arrFiltered)
    }
  },
  props: {
    goods_arr: Array
  }
})

Vue.component('cart', {
  template: `<div>
   <search v-bind:goods_arr="arr" @filtred="filterHandler"></search>
  <button class="cart-button" @click="openCartHandler" type="button">
  BIN <span v-if="cart_arr.length>0">{{cart_arr.length}}</span></button> 
  <div v-if="isVisibleCart">
  <slot> </slot>
  <h3>SUM <span v-if="cartSum()>0">{{cartSum()}}</span></h3>
  </div>
  </div>`,
  data() {
    return {
      isVisibleCart: false,
    }
  },
  props: {
    cart_arr: Array,
    arr: Array
  },
  methods: {
    openCartHandler() {
      this.isVisibleCart = !this.isVisibleCart
    },
    cartSum() {
      return this.cart_arr.reduce((acc, current) => { return acc + current.price }, 0)
    },
    filterHandler(arrFiltered) {
      this.$emit('filter', arrFiltered)
    }
  }
})

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
