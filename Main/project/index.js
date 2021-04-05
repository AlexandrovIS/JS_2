const express = require('express')
// const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use('/', express.static('./dist'))
app.use(express.json()) //вместо body-parser

app.get('/data', (req, res) => {
  fs.readFile('./server/goods.json', 'utf-8', (err, data) => {
    if (!err) {
      res.setHeader('Content-Type', 'Application/json')
      res.end(data)
    }
    else {
      console.log(err)
      res.end(JSON.stringify(err))
    }
  })
})

app.post('/data', (req, res) => {
  fs.readFile('./server/goods.json', 'utf-8', (err, data) => {
    if (!err) {
      const goods = JSON.parse(data)

      const id = goods.reduce((acc, good) => (acc < good.id ? good.id : acc), 0) + 1

      goods.push({
        id: id,
        title: req.body.title,
        price: req.body.price
      })

      fs.writeFile('./server/goods.json', JSON.stringify(goods), (err) => {
        if (!err) {
          res.end()
        } else {
          console.log(err)
          res.end(JSON.stringify(err))
        }
      })
    } else {
      console.log(err)
      end(JSON.stringify(err))
    }
  })
})

app.get('/cart', (req, res) => {
  fs.readFile('./server/cart.json', 'utf-8', (err, data) => {
    if (!err) {
      res.setHeader('Content-Type', 'Application/json')
      res.end(data)
    }
    else {
      console.log(err)
      res.end(JSON.stringify(err))
    }
  })
})

app.delete('/cart', (req, res) => {
  fs.readFile('./server/cart.json', 'utf-8', (err, data) => {
    if (!err) {
      fs.writeFile('./server/cart.json', JSON.stringify(req.body), (err) => {
        if (!err) {
          res.end()
        } else {
          console.log(err)
          res.end(JSON.stringify(err))
        }
      })
    } else {
      console.log(err)
      end(JSON.stringify(err))
    }
  })
})

app.post('/cart', (req, res) => {
  fs.readFile('./server/cart.json', 'utf-8', (err, data) => {
    if (!err) {
      const goods = JSON.parse(data)

      goods.push(req.body)

      fs.writeFile('./server/cart.json', JSON.stringify(goods), (err) => {
        if (!err) {
          res.end()
        } else {
          console.log(err)
          res.end(JSON.stringify(err))
        }
      })
    } else {
      console.log(err)
      end(JSON.stringify(err))
    }
  })
})

app.listen(3000, () => {
  console.log('server is running on port 3000!')
})
