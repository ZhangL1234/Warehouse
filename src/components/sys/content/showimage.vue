<template>
    <div id="myeCharts1">
    <!-- <h3> {{ title }} </h3> -->
    </div>
</template>

<script>
export default {
    name:"showimage",
        props:['data1'],
        mounted(){
            this.EcharTest()
        },
        // data(){
        //     return{
        //         title:"连接到showimage"
        //     }
        // },
            methods:{
            EcharTest:function (){
                var myChart1 = this.$echarts.init(document.getElementById('myeCharts1'));
                window.onresize = function () {
                        myChart1.resize()
                    }
                myChart1.setOption(
                    {
                            tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'
                        },
                        series: [
                            {
                                type: 'tree',

                                data: [this.data1],

                                top: '1%',
                                left: '7%',
                                bottom: '1%',
                                right: '20%',

                                symbolSize: 7,

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

                                expandAndCollapse: true,
                                animationDuration: 550,
                                animationDurationUpdate: 750
                            }
                        ]

                }
                )
            }
        },
}
</script>

<style scoped>
#myeCharts1 {
        width: 110%;
        height: 630px;
    }

</style>