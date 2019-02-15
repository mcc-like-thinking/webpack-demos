<template>
	<div>vue文件</div>
</template>

<script>
	import Axios from 'axios'
	export default {
		data() {
			return {

			}
		},
		created() {
			console.log(123)
			this.getData()
		},
		methods: {
			getData(){
				Axios.get('http://www.yideschool.com/mhh/data.json')
				.then(function (response) {
				    console.log(response)
				})
				.catch(function (error) {})
			}
		}
	}
</script>

<style></style>