<template>
	<div class="app-container app-panel">
		<el-row type="flex" justify="space-around">
			<el-col>
				<div class="grid-content ">
					<p class="p-box">编辑技能书-列表</p>
					<treeBookList></treeBookList>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	
	import treeBookList from '_c/sys/content/treeBookList/treeBookList'
	export default {
		name: "edit",
		data() {
			return {
				data1: {}
			}
		},
		components: {
			"treeBookList":treeBookList
			// "editimage": editimage,
			// "tree-menu": TreeMenu,
			
		},
		methods: {
			handleMore() {
				this.$router.push('/sys/show/:id')
			}
		}
	}
</script>

<style scoped>
/* .grid-content {
	border-radius: 1px;
	min-height: 630px;
	box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
	background: #ffffff;
} */
.box {
	float: left;
	margin: 41px;
	width: 80%;
	height: 70%;
	max-height: 150px;
}
.p-box{
	float: left;
	margin: 41px;
	color: rgba(80, 80, 80, 1);
	font-size: 20px;
	line-height: 150%;
	text-align: left;
	font-weight: bold;
}
</style>
