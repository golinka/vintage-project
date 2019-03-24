import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import VeeValidate from 'vee-validate';
import App from './App.vue';

import './assets/scss/app.scss';

Vue.use(VeeValidate);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBzwLvvBZF16oxLnoThjQgOqhVd2jHLWpg',
    libraries: 'places',
  },
});
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
