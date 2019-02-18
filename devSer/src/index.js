import Vue from 'vue'
import App from './app.vue'
import router from './router.js'

import 'babel-polyfill'

new Vue({
	el: '#app',
	router: router,
	render: (c) => {
		return c(App)
	}
});