import Vue from 'vue'
import App from './App'
import App1 from './App_1'
import App_Axiso from './App_axiso'

new Vue({
    el: "#app",
    render: h => h(App)
})

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

new Vue({
    el: '#app-7',
    render: h => h(App1)
})

new Vue({
    el: '#watch-example',
    render: h => h(App_Axiso)
    
})