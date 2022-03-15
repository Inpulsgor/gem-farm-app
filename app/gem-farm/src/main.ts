import { createApp } from 'vue';
import * as Toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import App from './App.vue';
import router from './router';
import './index.css';

// Toastr.options.closeButton = true;
Toastr.options.timeOut = 3000;
Toastr.options.showDuration = 1000;
Toastr.options.extendedTimeOut = 3000;
Toastr.options.positionClass = 'toast-top-right';

createApp(App).use(router).mount('#app');
