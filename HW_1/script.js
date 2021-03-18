
class Api {
  constructor() {
    // this.url = 'https://raw.githubusercontent.com/DeevMaks/GB_java_script_part_2/main/goods.json'

    this.url = 'http://127.0.0.1:5501/HW_1/goods.json'
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

class GoodsList {
  constructor() {
    this.api = new Api()
    this.$goodsList = document.querySelector('.goods-list')
    this.goods = []

    // this.api.fetch(this.onFetchError.bind(this), this.onFetchSuccess.bind(this))
    this.api.fetchPromise()
      .then((response) => this.api.fromJSON(response))
      .then((data) => { this.onFetchSuccess(data) })
      .catch((err) => { this.onFetchError(err) })
  }

  onFetchSuccess(data) {
    this.goods = data.map(({ title, price }) => new GoodsItem(title, price))
    this.render()

  }

  onFetchError(err) {
    // this.$goodsList.insertAdjacentHTML('beforeend', '<h3>ошибка</h3>')
    this.$goodsList.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`)
  }

  render() {
    // this.$goodsList.textContent = ''
    this.goods.forEach((good) => {
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
    this.$goodsBin = document.querySelector('.bin')
    this.title = title
    this.price = price
    this.goodsBin = [
      { title: this.title, price: this.price },
    ]
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
      document.querySelectorAll('.goods-item button').forEach((btn) => btn.addEventListener('click', (event) => {
        let title = event.target.parentElement.querySelector('h3').textContent
        let price = event.target.parentElement.querySelector('.price').textContent

        goodsBin.push(title, price)
        goodsBin.load()


        document.querySelectorAll('.bin button').forEach((btn) => btn.addEventListener('click', (e) => {
          let title = e.target.parentElement.querySelector('h3').textContent
          goodsBin.goodsBin.splice(goodsBin.goodsBin.indexOf(goodsBin.goodsBin.find(item => item.title === title)), 1)
          console.log(goodsBin.goodsBin)

        }))

      }))
    }
  }
  load() {
    goodsBin.fetchGoods()
    goodsBin.render()
  }
}
new GoodsList()
const goodsBin = new Bin()
goodsBin.click()
goodsBin.load()



// чего - то я попплыл! в промисах вообще толком не разобрался! если не сложно дайте, плж, комментариии. 
//1) я вешаю слушителя на кнопки товара! он может работать только через window.onload. Я думал, что как-то можно через промисы сделать, типа пока не отрисуте товары - не начинать слушать, но ничего не получается у меня
// 2) я на каждый клик на кнопку товара отрисовываю его в корзине, т.е. на каждое нажатие идет отрисова - новый рендер. Но у меня получается, чтобы удалить товар, я должен слушать кнопки после того, как товар попал в корзину, получается, что я слушаю внуутри слушателя. Я тоже пытался через промисы это организовать, но вообще не понял как то сделать. 
//3) по итогу получается, что я на втором кругу слушанья кнопок товаров в корзине смог за счет клика удалить товар из массива, но я не могу его отрисовать иначе все ломается. Проверьте пожалуйста, потому что это какое-то мое глобальное непонимание! Я зациклился на этом моменте! Я либо могу отрисовать один раз новую корзину и дальше уже ничего не работает! либо могу кликом удалять товары с массива корзины, но вызвать новую отрисовку могу только нажав уже на сам товар! 
//4) я абсолютно не понимаю как работаю промисы для событий клика и т.д. 
//5) ну и у меня косяк с созданием корзины! Дело в том, что создавая корзину изначально она не создается пустой, там по умолчанию пустой товар в нулевом индеке , это явно мое концептуальное недопанимание ! Но при этом я ж не могу на каждый клик создавать новый экземпляр корзины! Как мне кажется , я на клик должен пушить товар в массив корзицы и на клике в корзине удалять указанный товар из массива. 

//ПОМОГИТЕ РАЗОБРАТЬСЯ 