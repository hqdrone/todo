<template>
	<div class="notes">
		<div class="notes__aside">
			<router-link class="notes__new" tag="div" to="/note">
				Add New
			</router-link>
		</div>
		<div class="notes__body">
			<app-note
				v-for="note in notes"
				:note="note"
			></app-note>
		</div>
	</div>
</template>

<script>
	import AppNote from "../components/AppNote";

	export default {
		data() {
			return {
				notes: [
					{
						title: 'Note 1',
						tasks: [
							{
								label: 'Task 1',
								checked: false
							}
						]
					},
					{
						title: 'Note 2',
						tasks: [
							{
								label: 'Task 1',
								checked: true
							},
							{
								label: 'Task 2',
								checked: false
							}
						]
					}
				]
			}
		},
		name: 'TheNotes',
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
		border-radius: 4px;
		box-shadow 0 4px 16px rgba(#000, .1)
		border 1px solid #f1f1f1
		
		&__aside
			background: #f1f1f1
			padding: 16px
			border-radius: 4px 0 0 4px;
		
		&__body
			padding: 16px
			border-radius: 0 4px 4px 0;
			display grid
			gap: 16px
			grid-gap 16px
			grid-template-columns 1fr 1fr 1fr
			overflow-y auto
		
		&__new
			background: #fff
			border-radius: 4px
			padding: 12px
			cursor: pointer
			box-shadow 0 4px 16px rgba(#000, .1)
			border 1px solid #f1f1f1

</style>
