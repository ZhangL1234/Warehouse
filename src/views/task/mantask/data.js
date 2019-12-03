// import { parseTime } from '@/utils'
export const columns = [
  {
    attrs: {
      prop: 'name',
      label: '任务名称',
    }
  },
  {
    attrs: {
      prop: 'project',
      label: '项目'
    }
  },
  {
    attrs: {
      prop: 'status',
      label: '状态',
    }
  },
  {
    attrs: {
      prop: 'score',
      label: '任务评分',
    }
  },

  {
    slot: 'look',
    attrs: {
      label: '任务查看',
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
