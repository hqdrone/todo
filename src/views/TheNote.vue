<template>
	<div class="edit">
		<div class="edit__aside">
		
		</div>
		<div class="edit__body">
			<div class="edit__title">
				<label>
					Title: <input type="text">
				</label>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TheNote"
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
		box-shadow 0 4px 16px rgba(#000, .1)
		border 1px solid #f1f1f1
		&__aside
			background: #f1f1f1
			padding: 16px
			border-radius: 4px 0 0 4px;
		&__body
			padding: 16px
			border-radius: 0  4px 4px 0;
			display grid
			gap: 16px
			grid-gap 16px
			grid-template-columns 1fr 1fr 1fr
			overflow-y auto
</style>
