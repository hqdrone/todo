<template>
	<div class="notes">
		<div class="notes__aside">
			<router-link class="notes__new" to="/note">Add New Note</router-link>
			
			<div class="history">
				<div class="history__button" @click="historyPrev">Prev</div>
				<div class="history__button">Next</div>
			</div>
		
		</div>
		<div class="notes__body">
			<div
				class="notes__empty"
				v-if="getNotes.length === 0"
			>Notes not found
			</div>
			<app-note
				v-for="note in getNotes"
				:note="note"
				:key="note.id"
			></app-note>
		
		
		</div>
	</div>
</template>

<script>
	import AppNote from "../components/AppNote";
	import {mapGetters} from 'vuex'

	export default {
		name: 'TheNotes',
		computed: {
			...mapGetters(['getNotes', 'getHistory'])
		},
		methods: {
			historyPrev(){
				this.$store.dispatch('historyPrev')
			}
		},
		mounted() {
			if (this.getHistory.length === 0) {
				this.$store.dispatch('historyPush')
			}
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
		min-height 100%
		display grid
		grid-template-columns 250px 1fr
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
			align-content start
		
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
	
	@media (max-width: 699.99px)
		.notes__body
			grid-template-columns 1fr
	
	@media (max-width: 499.99px)
		.notes
			grid-template-columns 1fr
</style>
