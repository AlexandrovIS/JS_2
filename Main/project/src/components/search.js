export default Vue.component('search', {
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