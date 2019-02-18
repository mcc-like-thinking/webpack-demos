<template>
	<div>
	    <div>
	    	<router-link :to="{ name: 'home' }">Go to Home</router-link>
            <router-link :to="{ name: 'my' }">Go to Bar</router-link>
	    </div>
	    <router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style></style>