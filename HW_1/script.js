
class Api {
  constructor() {
    this.url = 'https://raw.githubusercontent.com/DeevMaks/GB_java_script_part_2/main/goods.json'

    // this.url = 'http://127.0.0.1:5501/HW_1/goods.json'
  }
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
          // success(JSON.parse(xhr.responseText))
          success(xhr.responseText)
        } else if (xhr.status > 400) {
          error('!error!')
        }
      }
    }

    xhr.open('GET', this.url, true)
    xhr.send()
  }

  fromJSON(data) {
    return new Promise((resolve) => {
      resolve(JSON.parse(data))
    })
  }

  fetchPromise() {
    return new Promise((resolve, reject) => {
      this.fetch(reject, resolve)
    })
  }
}

class GoodsItem {
  constructor(title, price) {
    this.title = title,
      this.price = price
  }
  getHtml() {
    return (`
    <div class="goods-item">
    <h3>${this.title}</h3>
    <img src='' alt='${this.title}'>
    <p class="description">Description ${this.title}</p>
    <p class="price">${this.price}</p>
    <button>Add</button>
    </div>
    `)
  }
}
class Header {
  constructor() {
    this.$container = document.querySelector('header')
    this.$button = this.$container.querySelector('.cart-button')
    this.$search = this.$container.querySelector('#search')
  }
  setSearchHandler(callback) {
    this.$search.addEventListener('input', callback)
  }
  setButtonHandler(callback) {
    this.$button.addEventListener('click', callback)
  }
}
class HH {
  constructor() {
    this.$button = document.querySelectorAll('button')
  }
  setButton(callback) {
    this.$button.forEach((item) => item.addEventListener('click', callback))
  }
}

class GoodsList {
  constructor() {
    this.api = new Api()
    this.header = new Header()
    this.$goodsList = document.querySelector('.goods-list')
    this.goods = []
    this.filteredGoods = []

    this.header.setSearchHandler((evt) => {
      this.search(evt.target.value)
    })


    this.api.fetchPromise()
      .then((response) => this.api.fromJSON(response))
      .then((data) => { this.onFetchSuccess(data) })
      .catch((err) => { this.onFetchError(err) })
  }
  search(str) {
    if (str === '') {
      this.filteredGoods = this.goods
    }
    const regexp = new RegExp(str, 'gi')
    this.filteredGoods = this.goods.filter((good) => regexp.test(good.title))
    this.render()
  }
  onFetchSuccess(data) {
    this.goods = data.map(({ title, price }) => new GoodsItem(title, price))
    this.filteredGoods = this.goods
    this.render()
  }

  onFetchError(err) {
    // this.$goodsList.insertAdjacentHTML('beforeend', '<h3>ошибка</h3>')
    this.$goodsList.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`)
  }

  render() {
    this.$goodsList.textContent = ''
    this.filteredGoods.forEach((good) => {
      this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml())
    })
  }
  sumItems() {
    console.log(this.goods.reduce((prev, currentValue) => {
      return prev + currentValue.price
    }, 0))
  }
}

class Bin {
  constructor(title, price) {
    this.but = new HH()
    this.$goodsBin = document.querySelector('.bin')
    this.title = title
    this.price = price
    this.goodsBin = [
      { title: this.title, price: this.price },
    ]

    this.but.setButton(openCart)
  }
  push(title, price) {
    return this.goodsBin.push({ title, price })
  }
  fetchGoods() {
    this.goodsBin = this.goodsBin.map(({ title, price }) => new
      GoodsItem(title, price))
  }
  render() {
    this.$goodsBin.textContent = ''
    this.goodsBin.forEach((good) => {
      this.$goodsBin.insertAdjacentHTML('beforeend', good.getHtml())
    })
  }
  click() {
    window.onload = function () {

      // document.querySelectorAll('.goods-item button').forEach((btn) => btn.addEventListener('click', (event) => {
      //   let title = event.target.parentElement.querySelector('h3').textContent
      //   let price = event.target.parentElement.querySelector('.price').textContent

      //   goodsBin.push(title, price)
      //   goodsBin.load()


      //   document.querySelectorAll('.bin button').forEach((btn) => btn.addEventListener('click', (e) => {
      //     let title = e.target.parentElement.querySelector('h3').textContent
      //     goodsBin.goodsBin.splice(goodsBin.goodsBin.indexOf(goodsBin.goodsBin.find(item => item.title === title)), 1)
      //     console.log(goodsBin.goodsBin)

      //   }))

      // }))

    }

  }
  load() {
    goodsBin.fetchGoods()
    goodsBin.render()
  }
}

function openCart() {
  console.log('cart')
}
// const header = new Header()
// header.setButtonHandler(openCart)


new GoodsList()



const goodsBin = new Bin()
goodsBin.click()
goodsBin.load()




// function a() {
//   document.querySelectorAll('header button').addEventListener('click', (e) => {
//     console.log('e');
//   })
// }
// a()
// function b() {
//   document.querySelectorAll('header button').forEach((item) => item.addEventListener('click', (e) => {
//     console.log('button', e.target);
//   }))
// }
