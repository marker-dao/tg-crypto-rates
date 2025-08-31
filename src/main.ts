import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import { router } from './router.ts'
import './style.css'

import { provideWebApp } from './shared/telegram/web-app-plugin.ts'

const app = createApp(App)

app.use(createPinia())
// app.use(router)

provideWebApp()

app.mount('#app')
