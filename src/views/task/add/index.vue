<template>
  <task-form @on-add-success="handleSuccess"></task-form>
</template>
<script>
import taskForm from '../task-form'
export default {
  name: 'task-add',
  components: {
    taskForm
  },
  data() {
    return {
      task: {
        projectName: '',
        name: '',
        group:'',
        doneTime: '',
        user: '',
        content: ''
      }
    }
  },
  methods: {
    handleSuccess() {
		
    }
  }
}
</script>
<style lang="less" scoped>
</style>