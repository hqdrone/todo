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
			<div class="note__button note__button_edit">Edit</div>
			<div class="note__button note__button_delete">Delete</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		props: ['note'],
		name: "AppNote"
	}
</script>

<style lang="stylus">
.note
	box-shadow 0 4px 16px rgba(#000, .1)
	padding: 16px
	border-radius: 4px
	border 1px solid #f1f1f1
	display flex
	flex-direction column
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
		border 1px solid #f1f1f1
		box-shadow 0 4px 16px rgba(#000, .1)
		&:hover
			&.note__button_edit
				border-color gold
			&.note__button_delete
				border-color crimson
</style>
