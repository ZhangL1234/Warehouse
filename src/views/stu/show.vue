<template>
	<div>

		<el-row type="flex" justify="space-around">
			<el-col :span="9">
				<div class="grid-content  ">
					<p class="p-box">技能树-列表</p>

					<div class="sec-box">
						<div>
							<tree-menu :label="data1.name" :nodes="data1.children" :depth="0" class="root-tree"></tree-menu>
						</div>
					</div>

					<div class="btn-box">
						<el-button style="width: 40%;" type="danger" @click="handleMore()">
						编辑知识库
						</el-button>
					</div>
				</div>
			</el-col>
			<el-col :span="14">
				<div class="grid-content1  ">

					<span class="wz2 bk">技能树-脑图</span>
					<span class="wz1 bk">JAVA技能树</span>
					<div>
						<showimage v-bind:data1="data1"></showimage>
					</div>



				</div>
			</el-col>

		</el-row>


	</div>
</template>

<script>
	// import TreeV from '@/components/sys/content/TreeV'
	// import btnFQ from '@/components/sys/content/btnBJ'
	import showimage from '@/components/sys/content/showimage'
	import TreeMenu from './TreeMenu.vue'
	export default {
		name: "show",
		data() {
			return {
				data1: {
					name: '家装小程序',
					id: "1",
					children: [{
							name: '首页',
							id: "1.1",
						},
						{
							name: '智能推荐',
							id: "1.2",
							children: [{
								name: '装修计算机',
								id: "1.2.1",
							}]
						},
						{
							name: '家装分享',
							id: "1.3",
							children: [{
									name: '屋主',
									id: '1.3.1',
									children: [{
											name: '分享',
											id: '1.3.1.1'
										},
										{
											name: '收藏',
											id: '1.3.1.2'
										},
										{
											name: '评论',
											id: '1.3.1.3'
										},
										{
											name: '点赞',
											id: '1.3.1.4'
										}
									]
								},
								{
									name: '设计师',
									id: '1.3.2',
									children: [{
											name: '分享',
											id: '1.3.2.1'
										},
										{
											name: '收藏',
											id: '1.3.2.2'
										},
										{
											name: '评论',
											id: '1.3.2.3'
										},
										{
											name: '点赞',
											id: '1.3.2.4'
										}
									]
								}
							]
						},
						{
							name: '商品类型',
							id: "1.4",
						}
					]
				}
			}
		},
		// props:['data1'],
		// mounted(){
		//     this.EcharTest()
		// },
		// methods:{
		//     EcharTest:function (){
		//         var myChart1 = this.$echarts.init(document.getElementById('myeCharts1'));
		//         myChart1.setOption(
		//             {
		//                     tooltip: {
		//                     trigger: 'item',
		//                     triggerOn: 'mousemove'
		//                 },
		//                 series: [
		//                     {
		//                         type: 'tree',

		//                         data: [this.data1],

		//                         top: '1%',
		//                         left: '7%',
		//                         bottom: '1%',
		//                         right: '20%',

		//                         symbolSize: 7,

		//                         label: {
		//                             normal: {
		//                                 position: 'left',
		//                                 verticalAlign: 'middle',
		//                                 align: 'right',
		//                                 fontSize: 9
		//                             }
		//                         },

		//                         leaves: {
		//                             label: {
		//                                 normal: {
		//                                     position: 'right',
		//                                     verticalAlign: 'middle',
		//                                     align: 'left'
		//                                 }
		//                             }
		//                         },

		//                         expandAndCollapse: true,
		//                         animationDuration: 550,
		//                         animationDurationUpdate: 750
		//                     }
		//                 ]

		//         }
		//         )
		//     }
		// },
		components: {

			// "app-tree":TreeV,
			// "app-btn": btnFQ,
			"showimage": showimage,
			"tree-menu": TreeMenu
		},
		methods: {
		  handleMore() {
		    this.$router.push('/sys/edit')
		  }
		}
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

	.sec-box {
		float: left;
		margin: 41px;
		width: 80%;
		height: 70%;
		max-height: 150px;
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
