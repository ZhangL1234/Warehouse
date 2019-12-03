// import { parseTime } from '@/utils'
export const columns = [
{
    slot: 'task-name',
    attrs: {
      prop: 'name',
      label: '姓名',
      'min-width': '150'
    }
  },
  {
    attrs: {
      prop: 'user_name',
      label: '用户名'
    }
  },
  {
    attrs: {
      prop: 'tel',
      label: '手机号码'
    }
  },
 {
   attrs: {
     prop: 'progress',
     label: '进行项目',
   }
 },
  {
    attrs: {
      prop: 'task_time',
      label: '未完成任务次数',
    }
  },
  {
    attrs: {
      prop: 'status',
      label: '任务情况',
    }
  },

  {
    slot: 'action',
    hidden: false,
    attrs: {
      prop: 'action',
      label: '操作',
    }
  }
]
