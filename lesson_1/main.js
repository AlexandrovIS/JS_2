//          Variable

// var x = 'global var x'
// let y = 'global let y'

// function fn() {
//   console.log(x)
//   console.log(y)

//   var z = 'fn var z'
//   let j = 'fn let j'
//   if (true) {
//     console.log(x)
//     console.log(y)

//     console.log(z)
//     console.log(j)

//     var q = 'fn var z'
//     let p = 'fn let j'
//   }
//   console.log(q)
//   console.log(j);
//   // console.log(p) //error
// }

// fn()

// console.log(x)
// console.log(y)
// // console.log(z) //error
// // console.log(j) //error

//CONST
// const a = 42
// // a = 22 //error

// const b = [1, 2, 3, 4]
// b[1] = 42
// // b = ['a', 'b']  //error
// b.push(42)
// console.log(b)

// const c = { name: 'Jan', lastName: 'Al' }
// c.name = 'Jane'
// console.log(c)



//       DESTRUCTURING

// const array = ['first', 'second', 'three']
// const [a, b] = array
// console.log(a)
// console.log(b)
// const array = [1, 2, 3, 4, 5, 6, 7, 8]
// let [, , a, , , b] = array
// console.log(a, b)

// const person = { name: 'Jan', lastName: 'Ale' }
// const { name, lastName } = person
// console.log(name)
// console.log(lastName)

// const { name, lastName: newName } = person
// console.log(newName)
// // console.log(lastName)//error 

// let user = {
//   param: {
//     firstName: 'Jan',
//     lastName: 'Ale'
//   },
//   goods: [`Book`, `Phone`]
// }

// let { param: { firstName, lastName }, goods: [good1, good2] } = user
// console.log(firstName)
// console.log(lastName)
// console.log(good1)
// console.log(good2)

// const person = { name: 'Jan', lastName: 'Ale' }
// function fn({ name }) {
//   const str = `hello ${name}`
//   console.log(str)
// }
// fn(person)



//          FUNCTIONS

// const person1 = {
//   name: 'Jan',
//   lastName: 'Alex',

//   getFullName: function () {
//     console.log(this)
//     return `${this.name} ${this.lastName}`
//   },
//   getFullNameArrow: () => {
//     console.log(this)
//     // return `${person1.name}`
//     return `${this.name} ${this.lastName}`
//   }
// }
// console.log(person1.getFullName())
// console.log(person1.getFullNameArrow())


