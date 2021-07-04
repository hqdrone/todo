<template>
	<app-confirm ref="appConfirm">
		<div class="title">{{title}}</div>
		<div class="message">{{message}}</div>
		<div class="buttons">
			<div
				class="button button_confirm"
				@click="confirm"
			>{{confirmButton}}
			</div>
			<div
				class="button button_cancel"
				@click="cancel"
			>Cancel
			</div>
		</div>
	</app-confirm>
</template>

<script>
	import AppConfirm from "./AppConfirm";

	export default {
		data() {
			return {
				title: undefined,
				message: undefined,
				confirmButton: undefined,
				resolvePromise: undefined,
				rejectPromise: undefined,
			}
		},
		methods: {
			show(opts = {}) {
				this.title = opts.title
				this.message = opts.message
				this.confirmButton = opts.confirmButton
				this.$refs.appConfirm.open()
				return new Promise((resolve, reject) => {
					this.resolvePromise = resolve
				})
			},
			confirm() {
				this.$refs.appConfirm.close()
				this.resolvePromise(true)
			},
			cancel() {
				this.$refs.appConfirm.close()
				this.resolvePromise(false)
			}
		},
		name: "ConfirmDialogue",
		components: {
			AppConfirm
		}
	}
</script>

<style scoped lang="stylus">
	.title
		margin-bottom: 12px
		font-weight: 700
		font-size 16px
		text-align: center
	
	.message
		margin-bottom: 24px
		font-size: 14px
		text-align center
	
	.buttons
		display grid
		grid-template-columns 1fr 1fr
		gap: 8px
		grid-gap 8px
	
	.button
		padding: 4px
		cursor: pointer;
		text-align: center;
		border-radius: 4px
		border 1px solid
		box-shadow 2px 2px 2px rgba(#000, .1)
		background: #1f1f1f
		transition .24s
		
		&_confirm
			border-color crimson
			
			&:hover
				background: rgba(crimson, .1)
		
		&_cancel
			border-color #888
			
			&:hover
				background: rgba(#888, .1)
</style>
