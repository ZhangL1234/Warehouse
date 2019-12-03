<template>
  <div class="tree-menu">
    <div>
      <span class="text-tree">
        <span @click="toggle">
          <div class="box_8871X1" style="display:inline-block"></div>
        </span>
        <span @click="openDetails(nodes,id)">{{label2}}</span>
        <template>
          <el-button type="text" size="small" v-on:click="$emit('add-item',id)">+</el-button>
          <el-button type="text" size="small" v-on:click="$emit('del-item',id)">-</el-button>
        </template>
      </span>
    </div>
    <tree-menu
      v-for="(node) in nodes"
      :nodes="node.children"
      :label2="node.title"
      :depth="depth + 1"
      :key="node.id"
      :id="node.id"
      :pId="node.parentId"
      :isEdit="isEdit"
      @add-item="$emit('add-item', $event)"
      @del-item="$emit('del-item', $event)"
      v-show="open"
    ></tree-menu>
  </div>
</template>

<script>
export default {
  name: "tree-menu",
  props: ["label2", "nodes", "depth", "isEdit", "id", "pId"],
  data() {
    return {
      open: true
    };
  },
  computed: {
    indent() {
      return {
        transform: `translate(${this.depth * 5}px)`
      };
    },
    hasChild() {
      return this.nodes && this.nodes.length;
    }
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    openDetails: function(tmpnodes, id) {
      if (tmpnodes == 0) {
        this.$router.push({
          name: "addDetails",
          params: {
            id
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.tree-menu {
  padding-left: 10px;
  border-left: 1px solid red;
  margin-left: 3px;
}

.box_8871X1 {
  width: 8px;
  height: 8px;

  background-color: rgba(255, 92, 92, 0.5357142857142857);
  border-radius: 8px;
}

.text-tree {
  font-size: 15px;
  letter-spacing: 2px;
  line-height: 200%;
}
</style>
