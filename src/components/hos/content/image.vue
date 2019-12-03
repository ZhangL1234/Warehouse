<template>
    <div class="image">
        <div id="myeCharts">
        </div>
    </div>
</template>

<script>
    export default {
        name: "image",
        props: ['data1'],
        mounted() {
            this.EcharTest()
        },
        methods: {
            EcharTest: function () {
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
        }
    }
</script>

<style scoped>
    .image {
        margin: 0 auto;
        width: 1452px;
        height: 749px;
        color: rgba(80, 80, 80, 1);
        background-color: rgba(251, 251, 251, 1);
        font-size: 14px;
        line-height: 150%;
        box-shadow: 0px 0px 10px 0px rgba(177, 177, 177, 0.5);
        text-align: center;
    }

    #myeCharts {
        width: 1452px;
        height: 749px;
    }
</style>