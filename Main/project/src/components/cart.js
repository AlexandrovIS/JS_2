import { search } from "./search"

export default Vue.component('cart', {
  template: `<div class="container">
  <div class="header_top">
   <search v-bind:goods_arr="arr" @filtred="filterHandler"></search>
  <button class="cart-button" @click="openCartHandler" type="button">
  BIN <span v-if="cart_arr.length>0">{{cart_arr.length}}</span></button> 
</div>
  <div v-if="isVisibleCart" class="header_bottom">
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