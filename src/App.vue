<template>
	<div id="app">
		<router-view/>
		<app-confirm
			:confirm-visible="confirmVisible"
			@show-confirm="confirmVisible = true"
			
		></app-confirm>
	</div>

</template>

<script>
	import AppConfirm from "./components/AppConfirm";

	export default {
		beforeCreate() {
			this.$store.dispatch('loadNotes')
		},
		data() {
			return {
				confirmVisible: false
			}
		},
		components: {
			AppConfirm
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
</style>
