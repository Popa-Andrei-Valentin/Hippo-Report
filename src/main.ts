import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
const icons = {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
}

// Vue-Data-Table ( experimental )
import { VDataTable } from 'vuetify/labs/VDataTable'
// @ts-ignore
components["VDataTable"] = VDataTable


const vuetify = createVuetify({
    components,
    directives,
   // @ts-ignore
    icons
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')
