<template>
    <div>
      <tree-menu
      :label="tree.label"
      :nodes="tree.nodes"
      :depth="0"
      class="root-tree"
      ></tree-menu>
    </div>
</template>

<script>
import TreeMenu from './TreeMenu.vue'

 let tree = {
    label: 'root',
    nodes: [
      {
        id:'1',
        label: 'item1',
        nodes: [
          {
            id:'2',
            label: 'item1.1'
          },
          {
            id:'3',
            label: 'item1.2',
            nodes: [
              {
                id:'4',
                label: 'item1.2.1'
              }
            ]
          }
        ]
      },
      {
        id:'5',
        label: 'item2'
      }
    ]
 }
export default{
  data() {
    return{
      tree
    }
   },
   components: {
     "tree-menu":TreeMenu
   }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root-tree {
  border: none;
  font-size: 20px;
}
</style>
