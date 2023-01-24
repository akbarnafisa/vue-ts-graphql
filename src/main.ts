import { createApp } from 'vue'
import urql, { createClient } from '@urql/vue'
import App from './App.vue'

createApp(App)
.use(urql, createClient({
  url: 'http://localhost:4000/graphql'
}))
.mount('#app')
