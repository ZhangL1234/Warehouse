<template>
    <div>
        <button @click="jumpsys">管理界面</button>
        <button @click="jumphos">用户界面</button>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            jumpsys: function () {
                this.$router.push({
                    path: '/sys_home'
                })
            },
            jumphos: function () {
                this.$router.push({
                    path: '/hos'
                })
            }
        }
    }
</script>

<style scoped>

</style>