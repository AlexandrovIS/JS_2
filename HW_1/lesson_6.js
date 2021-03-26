Vue.component('another', {
  template: '<button v-on:click="clickHandler">Button</button>',
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    clickHandler() {
      this.counter++
      this.$emit('greeting', this.counter)
    }
  }
})

Vue.component('hello', {
  // template: '<h1>Hello <slot></slot> {{name}}</h1>',
  template: `
  <h1>
  Hello {{user_name}} {{user_last_name}} 
  <another v-on:greeting="greetingHandler"></another>
  </h1>
  `,
  data() {
    return {
      // name: 'Jan'
    }
  },
  // props: [
  //   'user_name',
  //   'user_last_name'
  // ]
  props: {
    user_name: String,
    user_last_name: String
  },
  methods: {
    greetingHandler(counter) {
      console.log(counter)
    }
  }
})

const vue = new Vue({
  el: "#app",
  data: {
    name: 'Ivan',
    last_name: 'Alexandrov',
    class_name: 'active',
    isActive: true
  }
})