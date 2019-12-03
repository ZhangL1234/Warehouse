<template>
  <el-form label-width="120px" label-position="left" v-if="data">
    <el-form-item :label="item" v-for="(item, key) in map" :key="item">
      <span
        class="txet"
        v-if="key === 'publishDate' || key === 'doneDate'"
      >{{data[key] | formateDate}}</span>
      <!-- <span class="txet" v-else-if="key === 'status'">{{ data[key] | formateStatus}}</span> -->
      <template v-else-if="key === 'fileUrl'">
        <el-link v-for="(item,index) in data[key]" :key="index" :href="`${item}`" target="_blank" type="primary">附件{{index+1}}，</el-link>
      </template>
      <span class="txet" v-else>{{data[key]}}</span>
    </el-form-item>
    <!-- <span>
      <el-button type="info" style="margin-left:4%" @click="back">返回</el-button>
      <el-button
        :disabled="data['status']=='已完成'"
        @click="over(data['id'])"
        type="danger"
        style="margin-left:1%"
      >任务评分</el-button>
    </span>-->
  </el-form>
</template>
<script>
import { parseTime } from "@/utils";
export default {
  name: "task-info",
  props: {
    data: {
      // type: Object | null,
      required: true
    }
  },
  data() {
    return {
      map: {
        name: "任务名称",
        projectName: "项目名称",
        userGroup: "指派人",
        publishDate: "发布时间",
        doneDate: "交付时间",
        status: "完成状态",
        content: "任务内容",
        fileUrl: "附件链接"
      }
    };
  },
  filters: {
    formateDate(value) {
      return parseTime(value, "{y}-{m}-{d} {h}:{i}:{s}");
    },
    // formateStatus(value) {
    //   // return value ? "已完成" : "进行中";
    // }
  },
  methods: {}
};
</script>