import { parseTime } from '@/utils'
export const columns = [
  {
    attrs: {
      prop: 'name',
      label: '任务名称',
    }
  },
  {
    attrs: {
      prop: 'user',
      label: '指派人'
    }
  },
  {
    attrs: {
      prop: 'progress',
      label: '任务进度',
    }
  },
  {
    attrs: {
      prop: 'doneTime',
      label: '截止时间',
      formatter: (row, column, cellValue) => parseTime(cellValue, '{y}-{m}-{d}')
    }
  },
  {
    attrs: {
      prop: 'status',
      label: '状态',
      // formatter: (row, column, cellValue) => cellValue ? '已完成' : '进行中'
    }
  },
  {
    attrs: {
      prop: 'rate',
      label: '任务评分',
      // formatter: (row, column, cellValue) => cellValue ? '不能评分' : '未评分'
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
