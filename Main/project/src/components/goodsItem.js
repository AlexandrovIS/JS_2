export default Vue.component('goods-item', {
  template: `<div :data-id="id" class="goods-item" >
  <h3>{{title}}</h3>
  <img src="" alt="img">
  <p>{{price}}</p>
  <button v-on:click="add" class="item-button">add</button>
  </div>`,
  props: ['title', 'price', 'id'],
  methods: {
    add(e) {
      this.$emit('buttoadd', this.id)
    }
  }
})