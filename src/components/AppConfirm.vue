<template>
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
</template>

<script>
	export default {
		name: "AppConfirm",
		props: ['confirm-visible'],
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
			deleteNote() {
				this.confirmModal().then(() => {
					this.$store.dispatch('deleteNote', this.$route.params.id)
					this.$store.commit('setNotes')
					this.$router.push('/')
				}).catch(e => {
					console.log(e)
				})
			}

		}
	}
</script>

<style scoped lang="stylus">
	.confirm
		box-shadow 2px 2px 2px rgba(#000, .1)
		padding: 16px
		border-radius: 4px
		display flex
		flex-direction column
		background: #1f1f1f
		position fixed
		left: 0
		right: 0
		width: 240px
		margin: 0 auto
		top: 50%
		transform translateY(-50%)
		
		&__message
			margin-bottom: 24px
			font-weight: 700
			text-align: center
		
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
			
			&_yes
				border-color aquamarine
				
				&:hover
					background: rgba(aquamarine, .1)
			
			&_no
				border-color gold
				
				&:hover
					background: rgba(gold, .1)
</style>
