<template>
    <el-table
            :data="data"
            v-bind="$attrs"
            v-on="$listeners"
    >
        <template v-for="(column, index) in columns">
        <template  v-if="!column.hidden" >
            <el-table-column
                    v-if="!column.slot"
                    :key="index"
                    v-bind="column.attrs || {}"
            ></el-table-column>

            <el-table-column
                    v-else
                    :key="index"
                    v-bind="column.attrs || {}"
            >
                <template v-slot:default="scope">
                    <slot :name="column.slot" :scope="scope"></slot>
                </template>
            </el-table-column>
        </template></template>
    </el-table>
</template>
<script>
    export default {
        name: 'ITable',
        props: {
            data: {
                type: Array,
                default: () => ([])
            },
            columns: {
                type: Array,
                default: () => ([])
            }
        },
        // computed: {
        //   computedColumns() {
        //     console.log(this.columns)
        //     return this.columns.filter((column) => {
        //       return !column.hidden
        //     })
        //   }
        // },
        watch: {
            columns: {
                handler(newVal) {
                    this.columns = newVal
                },
                deep: true
            }
        }
    }
</script>