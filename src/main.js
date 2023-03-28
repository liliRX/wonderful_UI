import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createWebHashHistory, createRouter } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'

const history = createWebHashHistory()
const router = createRouter({
    history:history,
    routes: [
        {path:'/', component:HelloWorld}
    ]
})

createApp(App).use(router).mount('#app')
