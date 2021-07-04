<template>
	<div id="app">
		<router-view/>
	</div>

</template>

<script>

	export default {
		beforeCreate() {
			this.$store.dispatch('loadNotes')
		}
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
		padding: 16px
</style>
