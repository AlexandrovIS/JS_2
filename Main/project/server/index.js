// READ and WRITE

// const fs = require('fs')

// fs.readFile('./goods.json', 'utf-8', (err, data) => {
//   if (!err) {
//     const goods = JSON.parse(data)
//     console.log(goods)

//     goods.push({
//       id: 7,
//       title: 'T-Shirt',
//       price: 220
//     })

//     fs.writeFile('./goods.json', JSON.stringify(goods), (err) => { })
//   }
// })


//SERVER

// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   // res.setHeader('Content-Type', 'text/plain');
//   res.setHeader('Content-Type', 'text/html');
//   res.end('<h1>Hello, World!</h1>\n');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

//    node-static

// const http = require('http')
// const static = require('node-static')
// const file = new static.Server('./public')
// http.createServer((req, res) => {
//   file.serve(req, res)
// }).listen(3000)


//express 

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});

app.use(express.static('../public'))

app.get('/data', (req, res) => {
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
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

app.post('/data', bodyParser.json(), (req, res) => {
  fs.readFile('./goods.json', 'utf-8', (err, data) => {
    if (!err) {
      const goods = JSON.parse(data)

      const id = goods.reduce((acc, good) => acc > good.id ? acc : good.id, 0) + 1

      goods.push({
        id: id,
        title: req.body.title,
        price: req.body.price
      })

      fs.writeFile('./goods.json', JSON.stringify(goods), (err) => {
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
  fs.readFile('./cart.json', 'utf-8', (err, data) => {
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

app.post('/cart', bodyParser.json(), (req, res) => {
  fs.readFile('./cart.json', 'utf-8', (err, data) => {
    if (!err) {
      const goods = JSON.parse(data)

      goods.push(req.body)

      fs.writeFile('./cart.json', JSON.stringify(goods), (err) => {
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