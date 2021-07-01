<template>
	<div class="notes">
		<div class="notes__aside">
			<router-link class="notes__new" to="/note">Add New Note</router-link>
		</div>
		<div class="notes__body">
			<div
				class="notes__empty"
				v-if="notes.length === 0"
			>Notes not found
			</div>
			<app-note
				v-for="note in notes"
				:note="note"
				:key="note.id"
			></app-note>
		</div>
	</div>
</template>

<script>
	import AppNote from "../components/AppNote";

	export default {
		name: 'TheNotes',
		computed: {
			notes() {
				return this.$store.getters.getNotes
			}
		},
		created() {
			this.$store.subscribe(((mutation, state) => {
				localStorage.setItem('notes', JSON.stringify(state.notes))
			}))
		},
		beforeCreate() {
			this.$store.commit('initNotes')
		},
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
		box-shadow 2px 2px 2px rgba(#000, .1)
		border 1px solid #121212
		background: #181818
		
		&__aside
			background: #121212
			padding: 16px
			border-radius: 4px 0 0 4px;
		
		&__body
			padding: 16px
			border-radius: 0 4px 4px 0;
			display grid
			gap: 16px
			grid-gap 16px
			grid-template-columns 1fr 1fr
			overflow-y auto
		
		&__empty
			height: 48px
			display flex
			align-items: center;
			text-align: center
		
		&__new
			background: #181818
			border-radius: 4px
			padding: 0 12px
			height 48px
			display flex
			align-items center
			cursor: pointer
			box-shadow 2px 2px 2px rgba(#000, .1)
			border 1px solid aquamarine
			text-decoration none
			color: #888
			transition .24s
			
			&:hover
				background: rgba(aquamarine, .1)

</style>
