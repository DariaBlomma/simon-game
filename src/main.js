import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.component('part', {
    template: "<div class='red' data-index='0'></div>"
})
app.mount('#app')
