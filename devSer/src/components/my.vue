<template>
	<div>
		<a href="javascript:;" @click="getData">点击我</a>
	    <h1>{{msg}}</h1>
	</div>
</template>

<script>
	import Axios from 'axios'
	export default {
		data() {
			return {
				msg: ''
			}
		},
		created() {
			//this.getData()
		},
		methods: {
			getData(){
				const vm = this
				Axios.get('api/data.json').then(function (response) {
				    console.log(response)
				    vm.msg = response.data.msg
				}).catch(function (error) {})

				// Axios.get('api/data.json').then(function (response) {
				//     console.log(response)
				//     vm.msg = response.data.msg
				// }).catch(function (error) {})

				Axios({
				  method: 'post',
				  url: '/test/recode/pageSelect',
				  headers: {'Cookie': 'JSESSIONID=143F4B934D986C6557612E4DF5C9F67E'},
				  params: {
				    page: 1,
				    rows: 10
				  }
				});
			}
		}
	}
</script>

<style></style>