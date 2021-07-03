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
				>Delete Note
				</div>
			</div>
		
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
							<span>{{task.text}}</span>
						</label>
						<div
							class="tasks__button tasks__button_edit"
							@click="editTask(task.id)"
						>Edit
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
						>Add
						</div>
						<div
							class="tasks__button tasks__button_save"
							@click="saveTask(task.id)"
							v-if="isEditTask"
						>Save
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
		
		<div
			class="confirm"
			v-if="confirmVisible"
		>
			<div class="confirm__message">Are you sure?</div>
			<div class="confirm__buttons">
				<div
					class="confirm__button confirm__button_no"
					@click="confirmNo"
				>No
				</div>
				<div
					class="confirm__button confirm__button_yes"
					@click="confirmYes"
				>Yes
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {cloneDeep} from 'lodash'

	export default {
		name: "TheNote",
		data() {
			return {
				note: {
					title: '',
					tasks: []
				},
				task: {
					text: '',
					status: false
				},
				isEditTask: false,
				confirmVisible: false,
				initNote: {}
			}
		},
		methods: {
			confirmModal() {
				const self = this
				return new Promise((resolve, reject) => {
					self.confirmVisible = true
					self.confirmYes = () => {
						resolve()
						self.confirmVisible = false
					}
					self.confirmNo = () => {
						reject('cancel')
						self.confirmVisible = false
					}
				})
			},
			cancelNoteEdit() {
				// console.log(this.note.title, this.initNote.title)
				// this.$store.dispatch('saveNote', {
				// 	id: this.$route.params.id,
				// 	note: this.initNote
				// })
				this.note = cloneDeep(this.initNote)
				this.initNote = {}
				this.$router.push('/')
			},
			addNote() {
				this.note.id = `${Math.random().toFixed(6) * 1000000}`
				this.$store.dispatch('addNote', this.note)
				this.$router.push('/')
			},
			saveNote() {
				this.$store.dispatch('saveNote', {
					id: this.$route.params.id,
					note: this.note
				})
				this.$router.push('/')
			},
			deleteNote() {
				this.confirmModal().then(() => {
					this.$store.dispatch('deleteNote', this.$route.params.id)
					this.$router.push('/')
				}).catch(e => {
					console.log(e)
				})
			},
			addTask() {
				this.task.id = `${Math.random().toFixed(6) * 1000000}`
				this.note.tasks.push(this.task)
				this.task = {
					text: '',
					status: false
				}
			},
			editTask(id) {
				this.isEditTask = true
				this.task = this.note.tasks.find(task => task.id === id)

			},
			saveTask(id) {
				// this.$store.dispatch('saveNote', {
				// 	id: this.$route.params.id,
				// 	note: this.note
				// })
				this.note.tasks.forEach(task => {
					if (task.id === id) {
						task.title = this.task.title
					}
				})
				this.task = {
					text: '',
					status: false
				}
				this.isEditTask = false
			},
			deleteTask(id) {
				this.note.tasks = this.note.tasks.filter(task => task.id !== id)
				this.task = {
					text: '',
					status: false
				}
				this.isEditTask = false
			}
		},
		computed: {
			...mapGetters(['getNotes']),
			getNote() {
				return this.getNotes.find(note => note.id === this.$route.params.id)
			}
		},
		mounted() {
			if (this.$route.params.id) {
				this.note = this.getNotes.find(note => note.id === this.$route.params.id)
				this.initNote = cloneDeep(this.note)
			}
		},
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

</style>
