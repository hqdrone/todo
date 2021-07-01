<template>
	<div class="edit">
		<div class="edit__aside">
			<div class="edit__buttons">
				<div
					class="edit__button edit__button_save"
					@click="addNote"
					v-if="!$route.params.id"
				>Add Note
				</div>
				<div
					class="edit__button edit__button_edit"
					@click="$router.push('/')"
					v-if="!$route.params.id"
				>Back
				</div>
				<div
					class="edit__button edit__button_save"
					@click="saveNote"
					v-if="$route.params.id"
				>Save Note
				</div>
				<div
					class="edit__button edit__button_edit"
					@click="cancelNoteEdit"
					v-if="$route.params.id"
				>Cancel Edit
				</div>
				<div
					class="edit__button edit__button_delete"
					@click="deleteNote"
					v-if="$route.params.id"
				>Delete Note</div>
			</div>
		
		</div>
		<div class="edit__body">
			<div class="edit__title">
				<label>
					Note Title: <input type="text" v-model="note.title">
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TheNote",
		data() {
			return {
				note: {
					title: ''
				}
			}
		},
		methods: {
			cancelNoteEdit() {
				this.$router.push('/')
			},
			addNote() {
				this.note.id = `${Math.random().toFixed(6) * 1000000}`
				this.$store.dispatch('addNote', this.note)
				this.$router.push('/')
			},
			saveNote() {
				this.$store.dispatch('saveNote', this.note)
				this.$router.push('/')
			},
			deleteNote() {
				this.$store.dispatch('deleteNote', this.$route.params.id)
				this.$router.push('/')
			},
		},
		mounted() {
			if (this.$route.params.id) {
				this.note = this.$store.getters.getNote(this.$route.params.id)
			}
		}
	}
</script>

<style lang="stylus">
	.edit
		max-width 800px
		width: 100%
		display grid
		grid-template-columns 250px 1fr
		min-height 400px
		border-radius: 4px;
		box-shadow 2px 2px 2px rgba(#000, .1)
		border 1px solid #121212
		
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
			overflow-y auto
			background: #181818
			
			label
				display flex
				align-items center
				white-space nowrap
			
			input
				background: #121212
				border none
				box-shadow 2px 2px 2px rgba(#000, .1)
				border-radius: 4px
				height: 48px
				color: #888
				width 100%
				margin-left: 12px
				padding: 0 12px;
		
		&__buttons
			display grid
			gap 12px
			grid-gap 12px
		
		&__button
			border-radius: 4px
			padding: 0 12px
			height 48px
			display flex
			align-items center
			cursor: pointer
			box-shadow 2px 2px 2px rgba(#000, .1)
			border 1px solid #f1f1f1
			background: #181818
			transition .24s
			
			
			&_save
				border-color aquamarine
				
				&:hover
					background: rgba(aquamarine, .1)
			
			&_edit
				border-color gold
				
				&:hover
					background: rgba(gold, .1)
			
			&_delete
				border-color crimson
				
				&:hover
					background: rgba(crimson, .1)
</style>
