import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowUp, faHospital, faPenToSquare, faCircleCheck} from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faArrowUp,faHospital, faPenToSquare, faCircleCheck)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
