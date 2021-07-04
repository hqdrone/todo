<template>
	<transition name="fade">
		<div class="confirm" v-if="isVisible">
			<div class="confirm__window">
				<slot></slot>
			</div>
		</div>
	</transition>
	<!--		<div-->
	<!--			class="confirm"-->
	<!--			v-if="getConfirmVisible"-->
	<!--		>-->
	<!--			<div class="confirm__message">Are you sure?</div>-->
	<!--			<div class="confirm__buttons">-->
	<!--				<div-->
	<!--					class="confirm__button confirm__button_no"-->
	<!--					@click="confirmNo"-->
	<!--				>No-->
	<!--				</div>-->
	<!--				<div-->
	<!--					class="confirm__button confirm__button_yes"-->
	<!--					@click="confirmYes"-->
	<!--				>Yes-->
	<!--				</div>-->
	<!--			</div>-->
	<!--		</div>-->
</template>

<script>
	export default {
		name: 'Confirm',
		data() {
			return {
				isVisible: false
			}
		},
		methods: {
			open() {
				this.isVisible = true
			},
			close() {
				this.isVisible = false
			}
		}
	}
	// import {mapGetters} from 'vuex'
	//
	// export default {
	// 	name: "AppConfirm",
	// 	computed: {
	// 		...mapGetters['getConfirmVisible']
	// 	},
	// 	methods: {
	// 		confirmModal() {
	// 			const self = this
	// 			return new Promise((resolve, reject) => {
	// 				this.$store.commit('setConfirmVisible', true)
	//
	// 				self.confirmYes = () => {
	// 					resolve()
	// 					this.$store.commit('setConfirmVisible', false)
	// 				}
	// 				self.confirmNo = () => {
	// 					reject('cancel')
	// 					this.$store.commit('setConfirmVisible', false)
	// 				}
	// 			})
	// 		},
	// 		deleteNote() {
	// 			this.confirmModal().then(() => {
	// 				this.$store.dispatch('deleteNote', this.$route.params.id)
	// 				this.$store.commit('setNotes')
	// 				this.$router.push('/')
	// 			}).catch(e => {
	// 				console.log(e)
	// 			})
	// 		},
	// 	}
	// }
</script>

<style scoped lang="stylus">
	.fade-enter-active,
	.fade-leave-active
		transition opacity 0.3s
	
	.fade-enter,
	.fade-leave-to
		opacity: 0
	
	.confirm
		position fixed
		background: rgba(0, 0, 0, .88)
		top: 0
		left: 0
		right: 0
		bottom: 0
		padding: 32px 16px
		display grid
		place-items center
		z-index 999
	
		&__window
			box-shadow 2px 2px 2px rgba(#000, .1)
			padding: 16px
			border-radius: 4px
			background: #1f1f1f
			max-width: 240px
			width 100%
</style>
