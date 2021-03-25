const vue = new Vue({
  el: '#app',
  data: {
    name: 'Jan',
    title: '',
    price: 0,
    goods: [
      // { title: "Shoes", price: 150 },
      // { title: "Bag", price: 350 },
      // { title: "Shirt", price: 250 },
      // { title: "Noname", price: 320 },
      // { title: "T-Shirt", price: 100 },
      // { title: "Jacket", price: 450 }
    ]
  },
  methods: {
    add() {
      this.goods.push({ title: this.title, price: this.price })
    },
    getNameToUpperCase() {
      return this.name.toUpperCase()
    }
  },
  computed: {
    fullName() {
      return this.name + " Alexandrov"
    }
  },
  mounted() {
    setTimeout(() => {
      this.goods = [
        { title: "Shoes", price: 150 },
        { title: "Bag", price: 350 },
        { title: "Shirt", price: 250 },
        { title: "T-Shirt", price: 100 },
        { title: "Jacket", price: 450 }
      ]
    }, 1000)
  }
})
