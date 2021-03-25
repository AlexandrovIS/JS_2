// new RegExp('само рег выражение без слеша', 'флаги ')

// const regexp =//

// const regexp=/fo{1,3}/ от 1 до 3 символов О
// const regexp = /f[oth]/ набор символов либо один либо другой, перечисляем их в []
// 'fofoofooofoooo'

// const regexp = /[a-zA-z]/ диапазон символов

// const regexp =/.*/ любое количество любых симполов 

// const regexp =/\?/  \ используется , чтобы экранировать

// /abc/            Идущие подряд символы abc
// /[abc]/          Один из символов a, b или c
// /[^abc]/         Ни один из символов, т. е. не а, не b и не c
// /[a-z]/          Диапазон символов, идущих подряд в таблице Unicode
// /\b/             Граница слова
// /\B/             Не граница слова
// /\d/             Цифра
// /\D/             Не цифра
// /\w/             Латинская буква, цифра или _
// /\W/             Не латинская буква, не цифра и не _
// /\s/             Пробельный символ
// /\S/             Непробельный символ
// /a{3}/           Строго 3 символа а подряд
// /a{2,4}/         От 2 до 4 символов а подряд
// /a+/             1 и более символов а подряд
// /a*/             0 и более символов а подряд
// /a?/             0 или 1 символ а
// /./              Один любой символ, кроме переноса строки

// const regexp = /(abc|sos)/ //или 

// ФЛАГИ
// const regexp = /abc/g  //global искать все соответствия ,иначе найдет первое же
// const regexp = /abc/i //ignore case -  рег выражение проверяется без учета регистра символов 

// const regexp = /abc/m //multiline - ищет по многострочному тексту 


// ФУНКИИ
// const regexp = /abc/
// console.log(regexp.test('abcd')) // возвращает булеан
// console.log('abcdef'.match(regexp)) // возвращает массив
// console.log('abcdef'.replace(regexp, 'NEW')) //заменяет 

// ____________________________________________________________
const form = document.querySelector('form')
const input = document.querySelector('form input')
// const regexp_1 = /[a-z]*@[a-z]*\.(ru|com)/i

const regexp = /[a-z]+@[a-z]+\.(ru\b|com\b)/i

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (regexp.test(input.value)) {
    console.log('ok');
  } else {
    console.log("error");
  }
  return false
})
//1 
const regexpText = /(?<= )\'|\'(?= )/g
const text = document.querySelector('.text')
text.innerHTML = text.textContent.replace(regexpText, '"')

//2
const button = document.querySelector('#sentButton').addEventListener('click', checkForm)

const userForm = document.querySelector('.user_form')

const userName = userForm.querySelector('#inputName')
const userTel = userForm.querySelector('#inputTel')
const userEmail = userForm.querySelector('#inputEmail')

const regName = /^[a-zа-яёЁ]+$/i
const regTel = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
const regEmail = /^[a-z0-9]+[_.-]?@[a-z]+\.[a-z]{2,3}$/i

function checkForm(event) {
  event.preventDefault()
  // if(false){

  // }
  if (!regName.test(userName.value)) errorMessage(userName)
  else removeError(userName)
  if (!regTel.test(userTel.value)) errorMessage(userTel, 'некорректный номер')
  else removeError(userTel)
  if (!regEmail.test(userEmail.value)) errorMessage(userEmail)
  else removeError(userEmail)

}

function errorMessage(name, message = 'error') {
  name.value = ''
  name.setAttribute('placeholder', message)
  name.classList = 'errorInput'
}
function removeError(name) {
  name.classList.remove('errorInput')
}



