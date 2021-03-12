const baseGood = {
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
function Good(title, price) {
  this.title = title,
    this.price = price
  // this.__proto__ = baseGood
}
Good.prototype = baseGood

function GoodBestSeller(title, price) {
  this.__proto__ = new Good(title, price)
  this.getHtml = function () {//переопределяем метод 
    return (`
    <div class="goods-item-bestseller">
    <h3>${this.title}</h3>
    <p class="price">${this.price}</p>
    </div>
    `)
  }
}

// function GoodBestSeller() {
//   this.getHtml = function () {
//     return (`
//     <div class="goods-item-bestseller">
//     <h3>Хит продаж</h3>
//     </div>
//     `)
//   }
// }

const api = {
  fetch() {
    const goods = [
      { title: 'name_1', price: '100' },
      { title: 'name_2', price: '200' },
      { title: 'name_3', price: '300' },
    ]// обращение к серверу
    return goods
  }
}

const apiMock = {
  names: ['Shirt', 'Socks', 'Jacket', 'Shoes'],
  colors: ['red', 'blue', 'yellow', 'black'],

  getNumber(max) {
    return Math.floor(Math.random() * (max))
  },

  getRandomName() {
    return `${this.colors[this.getNumber(this.colors.length)]} ${this.names[this.getNumber(this.names.length)]}`
  },

  fetch() {
    return Array(this.getNumber(10)).fill('').map(() => ({ title: this.getRandomName(), price: this.getNumber(999) }))
  }
}

const goodsList = {
  apiObject: apiMock,
  goods: [
    // new Good('Shirt', 150),
    // new Good('Socks', 50),
    // new Good('Jacket', 350),
    // new Good('Shoes', 250),
    // new GoodBestSeller()
  ],
  getData() {
    this.goods = this.apiObject.fetch().map(({ title, price }) => new Good/*GoodBestSeller*/(title, price))
  },
  container: document.querySelector('.goods-list'),

  render() {
    this.goods.forEach(item => this.container.insertAdjacentHTML('beforeend', item.getHtml())
    );
  }
}


// goodsList.render()
goodsList.getData()
goodsList.render()