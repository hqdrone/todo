<template>
	<div id="app">
		<router-view/>
	</div>

</template>

<script>
	export default {
		beforeCreate() {
			if (localStorage.getItem('notes')) {
				this.$store.dispatch('initNotes', JSON.parse(localStorage.getItem('notes')))
			}
		},
	}

</script>

<style lang="stylus">
	#app
		font-family Rubik
		display grid
		min-height 100vh
		place-items center
		color #888
		background: #1f1f1f
		font-size: 14px
</style>
