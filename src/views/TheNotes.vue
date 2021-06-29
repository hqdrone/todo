<template>
	<div class="notes">
		<div class="notes__aside">
			<div class="notes__new">Add New</div>
		</div>
		<app-note
			v-for="note in notes"
		></app-note>
	</div>
</template>

<script>
	import AppNote from "../components/AppNote";

	export default {
		data() {
			return {
				notes: []
			}
		},
		name: 'the-notes',
		components: {
			AppNote
		}
	}
</script>

<style lang="stylus">
	.notes
		max-width 800px
		width: 100%
		display grid
		grid-template-columns 250px 1fr
		min-height 400px
		box-shadow 0 4px 16px rgba(#000, .1)
		border-radius: 4px;
		border 1px solid #f1f1f1
		&__aside
			background: #f1f1f1
			padding: 24px
			border-radius: 4px 0 0 4px;
		&__new
			background: #fff
			border-radius: 4px
			padding: 16px
			cursor: pointer

</style>