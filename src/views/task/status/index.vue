<template>
	<div  class="app-container app-panel">
		<h1 class="title">任务状态</h1>
		<el-tabs tab-position="left" v-model="activeTab">
			<el-tab-pane
			:label="`${project.name}`"
			:lazy="true"
			v-for="project in projects"
			:key="project.id"
			
			>
			<el-tabs class="tabs">
				<el-tab-pane
				:label="`${title.status}`"
				:lazy="true"
				v-for="title in titles"
				:key="title.id"
				
				>
					<task-table
					:title-status="title.status"
					:title-id="title.id"
					:project-id="project.id"
					></task-table>
				</el-tab-pane>
			</el-tabs>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import taskTable from"./modules/task-table";
	export default{
		name:"task-user",
		components:{
			taskTable
		},
		data(){
			return{
				activeTab:"",
				name:"",
				projects:[],
				titles:[
					{id:'1', status:'已完成'},
					{id:'2', status:'未完成'},
					{id:'3', status:'不合格'}
				],
				keyword:"",
			};
		},
		methods:{
			getProjects(){
				let userid=localStorage.getItem("UserId")
				this.$axios({
					url:"project/findProjectsByUserId",
					method:"POST",
					data:{
						user_id:userid
					}
				}).then(res=>{
					this.projects=res.data.findProjectsByUserId.content;
				});
			},
			// getStatus(){
			// 	this.$axios({
			// 		url:"projectTasks/findByStatusAndProject_Id",
			// 		method:"POST",
			// 		data:{
			// 			project_id:projectid,
			// 			status:titles.status
			// 		}
			// 	}).then(res=>{
					
			// 	})
			// }
		},
		mounted(){
			this.getProjects();
		}
	}
</script>

<style lang="less" scoped>
.tabs {
  margin-top: 15px;
  height: 500px;
  /* 控制表格高度 */
  overflow-x: hidden;
  /deep/.el-tabs__content {
    height: 500px;
    overflow: visible;
    overflow-x: auto;
  }
}
  .box_fst{
	align:center;
	
	margin-right: 15px;
	width: 482px;
	height: 72px;
	// left: 180px;
	// top: 217px;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	border-radius: 8px;
	font-size: 14px;
	line-height: 150%;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.17142857142857137);
	text-align: center;
  }
  .filter-container {
    text-align: center;
    .filter-item {
     margin-right: 15px;
    }
   .filter-input {
        width: 100%;
        /deep/input {
        border-radius: 35px;
      }
    }
  }
</style>
