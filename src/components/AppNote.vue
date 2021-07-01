<template>
	<div class="note">
		<div class="note__title">{{note.title}}</div>
		<div class="note__tasks">
			<div
				class="note__task"
				v-for="task in note.tasks"
			>
				<label>
					<input type="checkbox" :checked="task.checked">
					{{task.label}}
				</label>
			</div>
		</div>
		<div class="note__buttons">
			<div
				class="note__button note__button_edit"
				@click="editNote(note.id)"
			>Edit
			</div>
			<div
				class="note__button note__button_delete"
				@click="deleteNote(note.id)"
			>Delete
			</div>
		</div>
	
	</div>
</template>

<script>
	export default {
		props: ['note'],
		name: "AppNote",
		methods: {
			deleteNote(id) {
				this.$store.dispatch('deleteNote', id)
			},
			editNote(id) {
				this.$router.push(`/note/${id}`)
			}
		}
	}
</script>

<style lang="stylus">
	.note
		box-shadow 2px 2px 2px rgba(#000, .1)
		padding: 16px
		border-radius: 4px
		display flex
		flex-direction column
		background: #121212
		
		&__title
			margin-bottom: 8px
			font-weight: 700
		
		&__tasks
			flex 1
			margin-bottom 8px
		
		&__buttons
			display grid
			grid-template-columns 1fr 1fr
			gap: 8px
			grid-gap 8px
		
		&__button
			padding: 4px
			cursor: pointer;
			text-align: center;
			border-radius: 4px
			border 1px solid
			box-shadow 2px 2px 2px rgba(#000, .1)
			background: #1f1f1f
			transition .24s
			
			&_edit
				border-color gold
				&:hover
					background: rgba(gold, .1)
			
			&_delete
				border-color crimson
				&:hover
					background: rgba(crimson, .1)
</style>
