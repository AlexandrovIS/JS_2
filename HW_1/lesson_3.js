// function makeGetRequest(url, callback) {
//   var xhr

//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest()
//   } else if (window.ActiveXObject) {  //для Internet Explorer 
//     xhr = new ActiveXObject('Microsoft.XMLHTTP')
//   }

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       callback(xhr.responseText)
//     }
//   }

//   xhr.open('GET', url, true)
//   xhr.send()
// }

// PROMISE
//resolve 

// const live = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('message')
//     resolve('Message_2')
//   }, 1500)
// }
// )
// // live.then((data) => {
// //   console.log(data)
// // })

// live.then((data) => {
//   console.log(data)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("message 3!")
//     }, 2000)
//   })
// }).then(data => {
//   console.log(data)
// })

// reject 
// const live = new Promise((resolve, reject) => {
//   setTimeout(() => {

//     reject('Message_1')
//   }, 1500)
// }
// )

// live.then((data) => {
//   console.log(data)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("message 33")
//     }, 2000)
//   })
// }).then(data => {
//   console.log(data)
// }).catch(() => {
//   console.log('Reject message');
// })

//___________________________________________________________________




class Bin {
  constructor() { }
}

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
    this.$goodsList.textContent = ''
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


new GoodsList()

