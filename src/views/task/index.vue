<template>
	<el-container>
		<el-header>
			<head-bar></head-bar>
		</el-header>
		<el-main>
			<router-view />
		</el-main>
		<el-footer>
			<foot-bar></foot-bar>
		</el-footer>
	</el-container>
</template>
<script>
	import headBar from '@/views/head_bar/HeadBar'
	import footBar from '@/views/foot_bar/FootBar'
	export default {
		name: 'task-manage',
		components: {
			headBar,
			footBar
		}
	}
</script>
