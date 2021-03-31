const API_URL = 'https://raw.githubusercontent.com/DeevMaks/GB_java_script_part_2/main/goods.json'

Vue.component('goods-item', {
  template: `<div :data-id="id" class="goods-item" >
  <h3>{{title}}</h3>
  <p>{{price}}</p>
  <button v-on:click="add">add</button>
  </div>`,
  props: ['title', 'price', 'id'],
  methods: {
    add(e) {
      this.$emit('buttoadd', e)
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
      this.$emit('buttoadd', e)
    }
  }
})

Vue.component('cart', {
  template: `<div>
  <button class="cart-button" @click="openCartHandler" type="button">
  BIN <span v-if="cart_arr.length>0">{{cart_arr.length}}</span></button> 
  <div v-if="isVisibleCart">
  <slot> </slot>
  <h3>SUM <span v-if="cartSum()>0">{{cartSum()}}</span></h3>
  </div>
  </div>`,
  data() {
    return {
      isVisibleCart: true,
    }
  },
  props: {
    cart_arr: Array
  },
  methods: {
    openCartHandler() {
      this.isVisibleCart = !this.isVisibleCart
    },
    cartSum() {
      return this.cart_arr.reduce((acc, current) => { return acc + current.price }, 0)
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

const vue = new Vue({
  el: '#app',
  data: {
    cart: [],
    goods: [],
    filtredGoods: [],
  },
  methods: {
    addToCartHandler(e) {

      const id = e.target.closest('.goods-item').dataset.id
      const good = this.goods.find((item) => item.id == id)
      this.cart.push(good)

    },
    removeFromCartHandler(e) {
      const id = e.target.closest('.goods-item').dataset.id
      const goodIndex = this.cart.findIndex((item) => item.id == id)
      this.cart.splice(goodIndex, 1)
    },
    searchHandler(e) {
      // const {
      //   target: { value },
      // } = e;
      // if (value === "") {
      //   this.filtredGoods = this.goods;
      // }
      // const regexp = new RegExp(value, "gi");
      // this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
      this.filtredGoods = e

    },

    fetch(error, success) {
      let xhr

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            success(JSON.parse(xhr.responseText))
          } else if (xhr.status > 400) {
            error(`<h3>We appologize for it</h3>`)
          }
        }
      }
      xhr.open('GET', API_URL, true)
      xhr.send()
    },

    fetchPromise() {
      return new Promise((resolve, reject) => {
        this.fetch(reject, resolve)
      })
    }
  },
  mounted() {
    this.fetchPromise()
      .then(data => {
        this.goods = data
        this.filtredGoods = data
      })
      .catch(err => {
        document.querySelector('.goods-list').innerHTML = err
      })
  }
})
