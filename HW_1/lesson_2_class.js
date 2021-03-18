class Bin {
  constructor() {

  }
  getHtmlBin() { }//метод для верстки товара в корзине или же используем старый
  renderBin() { }// метод который будет создавать экземпляры товаров в корзине
  clearItem() { }//метод для удаления товара из корзины
  // как понимаю нам еще нужно как-то не дублировать одинаковые товары в корзине, а ввести какой-то счетчик товаров каждого экземпляра и увеличивать или уменьшать этот счетчик , т.е.  чтобы кол-во товаров в корзине увеличивалось или уменьшалось при работе внутри корзины
  //нам надо каким-то методом проверять оставшиеся в наличии 
  // еще нам надо какой-то метод, который очистит корзину по прошествию какого-то времени 
  // метод для подсчета суммы товаров в корзине
}

class ApiMock {
  constructor() { }
  fetch() {
    return [
      { title: 'name_1', price: 150 },
      { title: 'name_2', price: 50 },
      { title: 'name_3', price: 350 },
      { title: 'name_4', price: 250 }
    ]
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
class GoodBestSeller extends GoodsItem {
  constructor(title, price) {
    super(title, price)

    this.discount = '15%'
  }
  getHtml() {
    return `<h2>Discount ${this.discount}</h2> ${super.getHtml()}`

  }
}

class GoodsList {
  constructor() {
    this.api = new ApiMock()
    this.$goodsList = document.querySelector('.goods-list')
    this.goods = []
  }
  fetchGoods() {
    this.goods = this.api.fetch().map(({ title, price }) => new
      GoodsItem/*GoodBestSeller*/(title, price))
  }
  render() {
    this.$goodsList.textContent = ''
    this.goods.forEach((good) => {
      this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml())
    })
  }
  sumItems() {
    console.log(this.goods.reduce((prev, currentValue) => {
      return prev + currentValue.price
    }, 0))

    // return this.goods.reduce(function (prev, current) {
    //   return prev + current.price
    // }, 0)

    // const sum = this.goods.reduce((prev, currentValue) => {
    //   return prev + currentValue.price
    // }, 0)
    // console.log(sum)
  }
}

const goodsList = new GoodsList()

goodsList.fetchGoods()
goodsList.render()
goodsList.sumItems()
