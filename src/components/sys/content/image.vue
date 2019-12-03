<template>
    <div>
        <div id="myeCharts">
			
        </div>
    </div>
</template>

<script>
    export default {
		
		data(){
			return{
				data2:{
					name:"",
					// id:"",
					children:[],
				}
			}
		},
		created() {
			this.GetTreelist()
			
		},
		// beforeMount(){
			// this.EcharTest()
		// },
        methods: {
            EcharTest: function () {
				// console.log(this.data2)
                var myChart = this.$echarts.init(document.getElementById('myeCharts'));
                myChart.setOption(
                    {
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'
                        },
                        series: [
                            {
                                type: 'tree',
                                data: [this.data2],
                                // top: '1%',
                                // left: '7%',
                                // bottom: '1%',
                                // right: '20%',

                                // symbolSize: 7,

                                label: {
                                    normal: {
                                        position: 'left',
                                        verticalAlign: 'middle',
                                        align: 'right',
                                        fontSize: 9
                                    }
                                },

                                leaves: {
                                    label: {
                                        normal: {
                                            position: 'right',
                                            verticalAlign: 'middle',
                                            align: 'left'
                                        }
                                    }
                                },
                            }
                        ]
                    }
                )
            },
        
		GetTreelist(){
			const Id = this.$route.params.id;
			this.$axios({
				url: "treeNode/list",
				method: "POST",
				data: {
					id: Id
				}
			}).then(ref => {
				var arr = ref.data.children;
				this.data2.name = arr[0].tree.title
				this.data2.children = this.recursion(arr)
				this.EcharTest()
			})
		},
		recursion(arr){
			let res = []
			function handler(ary) {
				return ary.map((item) => {
					return { 
						id: item.id, 
						name: item.title, 
						children: item.children.length ? handler(item.children) : [] ,
						}
				})
			}
			res = handler(arr)
			return res
		}
	}
}
</script>

<style scoped>
    #myeCharts {
        width: 800px;
        height: 600px;
    }
</style>