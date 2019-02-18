import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	scrollBehavior: () => ({
		y: 0
	}),
	routes: [{
		path: '',
		name: 'default',
		redirect: 'home'
	}, {
		path: '/home',
		name: 'home',
		component: () => import ('./components/home.vue')
	}, {
		path: '/my',
		name: 'my',
		component: () => import ('./components/my.vue')
	}]
})