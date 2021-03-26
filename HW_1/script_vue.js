const API_URL = 'https://raw.githubusercontent.com/DeevMaks/GB_java_script_part_2/main/goods.json'

const vue = new Vue({
  el: '#app',
  data: {
    goods: [],
    filtredGoods: [],
    bin: [],
    // isBinOpen: false,
    quarel: 1,
    show: false,
    search: ''
  },
  methods: {
    searchHandler() {
      if (this.search === '') {
        this.filtredGoods = this.goods
      }
      const regexp = new RegExp(this.search, 'gi')
      this.filtredGoods = this.goods.filter((good) => regexp.test(good.title))
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
    },
    // openBinHandler() {
    //   this.isBinOpen = !this.isBinOpen
    // },
    addToBin(event) {
      // this.bin.forEach((item) => {
      //   if (item.title === event.target.parentElement.querySelector('h3').textContent) {
      //     console.log('1')
      //   }
      // })
      const index = event.target.dataset.index
      this.bin.push(this.filtredGoods[index])
    },
    removeBinHandler(event) {
      const index = event.target.dataset.index
      this.bin.splice(index, 1)
    },
    sumBin() {
      return this.bin.reduce((prev, currentValue) => {
        return prev + currentValue.price
      }, 0)
    },

    imgAlt(index) {
      return "IMG_" + this.filtredGoods[index].title
    },
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
