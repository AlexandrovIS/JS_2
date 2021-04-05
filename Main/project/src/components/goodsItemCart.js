export default Vue.component('goods-item-cart', {
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