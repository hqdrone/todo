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
				>Cancel
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
				>Delete Note
				</div>
			</div>
<!--			<div class="edit__history history" v-if="this.$route.params.id">-->
<!--				<div class="history__button" @click="historyPrev">Prev</div>-->
<!--				<div class="history__button">Next</div>-->
<!--			</div>-->
		</div>
		<div class="edit__body">
			<div class="edit__title">
				<label>
					Note Title: <input type="text" v-model="note.title">
				</label>
			</div>
			<div class="edit__tasks tasks">
				<div class="tasks__title">Tasks</div>
				<div class="tasks__list">
					<div
						class="tasks__empty"
						v-if="note.tasks.length === 0"
					>Tasks not found
					</div>
					<div
						class="tasks__task"
						v-for="task in note.tasks"
						:key="task.id"
					>
						<label>
							<input type="checkbox" v-model="task.status">
							<span :class="{'done':task.status}">{{task.text}}</span>
						</label>
						<div
							class="tasks__button tasks__button_edit"
							@click="editTask(task.id)"
						>{{!task.isEdit ? 'Edit' : 'Editing...'}}
						</div>
					</div>
				</div>
				<div class="tasks__form">
					<label>
						Task Text: <input type="text" v-model="task.text">
					</label>
					<div class="tasks__buttons">
						<div
							class="tasks__button tasks__button_add"
							@click="addTask"
							v-if="!isEditTask"
						>Add New Task
						</div>
						<div
							class="tasks__button tasks__button_save"
							@click="saveTask(task.id)"
							v-if="isEditTask"
						>Ок
						</div>
						<div
							class="tasks__button tasks__button_delete"
							@click="deleteTask(task.id)"
							v-if="isEditTask"
						>Delete
						</div>
					</div>
				</div>
			
			</div>
		</div>
		<confirm-dialogue
			ref="confirmDialogue"
		></confirm-dialogue>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	import ConfirmDialogue from "../components/ConfirmDialogue";

	export default {
		components: {
			ConfirmDialogue
		},
		name: "TheNote",
		data() {
			return {
				note: {
					title: '',
					tasks: []
				},
				task: {
					text: '',
					status: false,
					isEdit: false
				},
				isEditTask: false

			}
		},
		methods: {
			historyPrev() {
				// this.$store.dispatch('historyPrev')
			},
			cancelNoteEdit() {
				this.$store.dispatch('loadNotes')
				this.$router.push('/')
			},
			addNote() {
				if (!this.note.title) return
				this.note.id = `${Math.random().toFixed(6) * 1000000}`
				this.$store.dispatch('addNote', this.note)
				this.$store.commit('setNotes')
				this.$router.push('/')
			},
			saveNote() {
				this.$store.dispatch('saveNote', {
					id: this.$route.params.id,
					note: this.note
				})
				this.$store.commit('setNotes')
				this.$router.push('/')
			},
			async deleteNote() {
				if (await this.$refs.confirmDialogue.show({
					title: 'Confirm Delete',
					message: `You want to delete "${this.note.title}" note`,
					confirmButton: 'Delete'
				})) {
					await this.$store.dispatch('deleteNote', this.$route.params.id)
					this.$store.commit('setNotes')
					await this.$store.dispatch('historyPush')
					await this.$router.push('/')
				}
			},
			addTask() {
				if (!this.task.text) return
				this.task.id = `${Math.random().toFixed(6) * 1000000}`
				this.note.tasks.push(this.task)
				this.clearTask()
			},
			editTask(id) {
				this.isEditTask = true
				this.note.tasks.forEach(task => {
					task.isEdit = false
				})
				this.task = this.note.tasks.find(task => task.id === id)
				this.task.isEdit = true
			},
			clearTask() {
				this.task = {
					text: '',
					status: false
				}
				this.isEditTask = false
			},
			saveTask(id) {
				this.note.tasks.forEach(task => {
					if (task.id === id) {
						task.isEdit = false
					}
				})
				this.clearTask()
			},
			deleteTask(id) {
				this.note.tasks = this.note.tasks.filter(task => task.id !== id)
				this.clearTask()
			}
		},
		computed: {
			...mapGetters(['getNotes', 'getHistory']),
			getNote() {
				return this.getNotes.find(note => note.id === this.$route.params.id)
			}
		},
		mounted() {
			if (this.$route.params.id) {
				this.note = this.getNote
			}
			if (this.getHistory.length === 0) {
				this.$store.dispatch('historyPush')
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
		min-height 100%
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
			overflow-y auto
			background: #181818
			
			label
				display flex
				align-items center
				white-space nowrap
			
			input
				&[type="text"]
					background: #121212
					border none
					box-shadow 2px 2px 2px rgba(#000, .1)
					border-radius: 4px
					height: 48px
					color: #888
					width 100%
					margin-left: 12px
					padding: 0 12px;
				
				&[type="checkbox"]
					margin-right: 12px
		
		&__title
			margin-bottom: 16px
			padding-bottom: 16px
			border-bottom: 1px solid #1f1f1f
		
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
	
	.tasks
		&__task
			display flex
			align-items center
			user-select none
			
			span
				&.done
					text-decoration line-through
			
			&:not(:last-child)
				margin-bottom: 4px
		
		&__title
			margin-bottom: 16px
		
		&__list
			margin-bottom: 16px
			padding-bottom: 16px
			border-bottom: 1px solid #1f1f1f
		
		&__buttons
			display grid
			grid-template-columns repeat(auto-fit, minmax(0px, 1fr))
			gap: 8px
			grid-gap 8px
			margin-top: 16px
		
		&__button
			padding: 4px
			cursor: pointer;
			text-align: center;
			border-radius: 4px
			border 1px solid
			box-shadow 2px 2px 2px rgba(#000, .1)
			background: #1f1f1f
			transition .24s
			
			&_add
				border-color aquamarine
				
				&:hover
					background: rgba(aquamarine, .1)
			
			&_save
				border-color aquamarine
				
				&:hover
					background: rgba(aquamarine, .1)
			
			&_edit
				border-color gold
				margin-left: auto
				
				&:hover
					background: rgba(gold, .1)
			
			&_delete
				border-color crimson
				
				&:hover
					background: rgba(crimson, .1)
	
	.history
		display grid
		grid-template-columns 1fr 1fr
		gap: 8px
		grid-gap 8px
		margin-top: 24px
		
		&__button
			padding: 4px
			cursor: pointer;
			text-align: center;
			border-radius: 4px
			border 1px solid aquamarine
			box-shadow 2px 2px 2px rgba(#000, .1)
			transition .24s
			background: #1f1f1f
			
			&:hover
				background: rgba(aquamarine, .1)
	
	@media (max-width: 699.99px) {
	}
	
	@media (max-width: 499.99px)
		.edit
			grid-template-columns 1fr
</style>
