<template>
  <div>
    <div class="logo">
      <div>
        <img src="@/assets/logo.png" class="logoc" />
      </div>
      <div class="aname">鲤鱼云平台</div>
    </div>
    <el-menu
      class="menu"
      mode="horizontal"
      background-color="#fff"
      text-color="#383838"
      active-text-color="#ff5c5c"
    >
      <template v-for="(item,index) in this.menuTree">
        <el-menu-item
          v-if="item.childMenus.length == 0"
          :index="''+index"
          :key="index"
          @click="handleRoute(item)"
        >{{item.name}}</el-menu-item>
      </template>
      <template v-for="(item,index) in this.menuTree.slice(1)">
        <el-submenu v-if="item.childMenus.length > 0" :index="''+index" :key="index">
          <template slot="title">{{item.name}}</template>
          <el-menu-item
            :index="index+'-'+num"
            v-for="(itemChild,num) in item.childMenus"
            :key="num"
            @click="handleRoute(itemChild)"
          >{{itemChild.name}}</el-menu-item>
        </el-submenu>
      </template>
      <el-button size="mini" type="text" @click="signout">退出登录</el-button>
    </el-menu>
  </div>
</template>

<script>
// import mapState from 'vuex'

export default {
  name: "HeadBar",
  data() {
    return {
      // 绑定接口后获取用户信息
      user: JSON.parse(window.sessionStorage.getItem("user")),
      // 管理端菜单栏
      menuTree: [
        {
          name: "首页",
          url: "sys_home",
          childMenus: []
        },
        {
          name: "人员管理",
          childMenus: [
            {
              name: "小组管理",
              url: "sys/peopleList"
            },
            {
              name: "统计",
              url: "sys/statistics"
            },
            {
              name: "题组详情",
              url: "sys/topiclist"
            }
          ]
        },
        {
          name: "项目管理",
          url: "project/list",
          childMenus: []
        },
        {
          name: "任务管理",
          url: "sys/taskList",
          childMenus: [
            // {
            //   name: "任务管理",
            //   url: "sys/taskList"
            // },
            // {
            //   name: "添加任务",
            //   url: "sys/taskManage"
            // }
          ]
        },
        {
          name: "技能树管理",
          url: "sys",
          childMenus: []
        },
        {
          name: "人员评估",
          url: "sys/estimateList",
          childMenus: []
        },
        {
          name: "追踪管理",
          url: "sys/Track",
          childMenus: []
        },
        {
          name: "系统日志",
          url: "sys/journal",
          childMenus: []
        }
      ]
      // 学生端菜单栏
      // menuTree:[

      // ]
    };
  },
  // computed: {
  //     mainTabs: {
  //         get() {
  //             return this.$store.state.tab.mainTabs
  //         },
  //         set(val) {
  //             this.$store.commit('updateMainTabs', val)
  //         }
  //     },
  //     mainTabsActiveName: {
  //         get() {
  //             return this.$store.state.tab.mainTabsActiveName
  //         },
  //         set(val) {
  //             this.$store.commit('updateMainTabsActiveName', val)
  //         }
  //     }
  // },
  // mounted() {
  //     this.mainTabs = [];
  // },
  methods: {
    handleRoute(menu) {
      //切换标签页时同步更新高亮菜单
      if (this.$refs.menu != null) {
        this.$refs.menu.activeIndex = 0;
        this.$refs.menu.initOpenedMenu();
      }
      this.$router.push("/" + menu.url);
    },
    signout() {
      sessionStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  min-height: 50px;
}
.logo {
  display: flex;
  justify-content: left;
  float: left;
  size: auto;
}
.logoc {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 40px;
}

.aname {
  margin-top: 15px;
  margin-left: 30px;
  font-size: 20px;
  text-align: center;
  color: #383838;
  width: 150px;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
  color: white;
}

.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: white;
}
</style>
