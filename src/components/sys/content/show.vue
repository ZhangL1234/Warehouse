<template>
	<div>
		<el-row type="flex" justify="space-around">
			<el-col :span="9">
				<div class="grid-content  ">
					<p class="p-box">技能树-列表</p>
					<p class="text-box">{{title}}</p>
					<div class="sec-box">
						<div>
							<tree-menu 
							v-for="tree in data1" 
							:isEdit="false" 
							:nodes="tree.children" 
							:label2="tree.title" 
							:depth="0" 
							class="root-tree" 
							:key="tree.id" />
							<!-- 遍历根节点 -->
						</div>
					</div>
					<div class="btn-box">
						<el-button style="width: 40%;" type="danger" @click="handleMore()">
							编辑知识库
						</el-button>
						<el-button style="width: 40%;" @click="changeTree()">
							切换
						</el-button>
					</div>
				</div>
			</el-col>
			<el-col :span="14">
				<div class="grid-content1  ">
					<span class="wz2 bk">技能树-脑图</span>
					<span class="wz1 bk">{{title}}</span>
					<div>
						<simage></simage>
						<!-- :data2="data2" -->
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import simage from '@/components/sys/content/image'
	import TreeMenu from './TreeMenu.vue'
	
	export default {
		name: "show",

		data() {
			return {
				
					title:"",
					id:"",
					data1:[],
					// data2:[],
			}
		},
		mounted() {
			this.getTreelist()
		},
		components: {
			"simage": simage,
			"tree-menu": TreeMenu
		},

		methods: {
			getTreelist() {
				const Id = this.$route.params.id;
				this.$axios({
					url: "treeNode/list",
					method: "POST",
					data: {
						id: Id
					}
				}).then(ref => {
					let arr = ref.data.children;
					//为数据库赋值
					this.data1 = arr
					// 赋值标题
					this.title = arr[0].tree.title
					this.id=arr[0].tree.id
				})
			},
			handleMore() {
				const Id = this.$route.params.id;
				this.$router.push({
					name: 'edit',
					params: {
						id: Id
					}})
			},
			changeTree() {
				this.$router.push({
					name:'list'
				})
			}
		},
	}
</script>

<style scoped>
	/* .show {
        margin: 0 auto;
        width: 1452px;
        height: 749px;
        color: rgba(80, 80, 80, 1);

        font-size: 14px;
        line-height: 150%;

        text-align: center;
    } */


	.grid-content {
		border-radius: 1px;
		min-height: 630px;
		box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
		background: #ffffff;
	}

	.grid-content1 {
		border-radius: 1px;
		min-height: 630px;
		box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
		background-color: rgba(251, 251, 251, 1);
	}

	/* .bg-purple {
    background:#ffffff;
  } */
	/* .row-bg {
    padding: 20px 0;
    background-color: #f9fafc;
  }
      .el-row {
    margin-bottom: 20px;
  } */
	/* .el-col {
    border-radius: 4px;
  } */
	.wz1 {
		color: #00aeff;
		float: left;
	}

	.wz2 {
		float: left;
	}

	.bk {
		margin: 10px;
	}

	.p-box {
		float: left;
		margin: 41px;
		color: rgba(80, 80, 80, 1);
		font-size: 20px;
		line-height: 150%;
		text-align: left;
		font-weight: bold;
		/* margin: 37px 0px 19px 43px; */
	}
/* 	.p-title{
		float: left;
		margin: 41px;
		color: rgba(80, 80, 80, 1);
		font-size: 20px;
		line-height: 150%;
		text-align: left;
		font-weight: bold;
		} */
    .text-box {
		float: left;
		width: 80%;
		height: 30px;
		margin: 0px 0px 0px 44px;
		color: #00aeff;
		border-radius: 6px;
		font-size: 18px;
		line-height: 150%;
	}
	.sec-box {
		float: left;
		margin: 15px 0px 15px 41px;
		width: 80%;
		height: 70%;
		max-height: 250px;
		/* 内容超出自动添加滚动条 */
		overflow: auto;
	}

	.btn-box {
		float: left;
		width: 100%;
		margin: 41px;
	}

	.root-tree {
		border: none;
		font-size: 20px;
		/* 实现红色的竖线居于原点之下 */
	}
</style>
