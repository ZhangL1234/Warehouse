<template>
  <div class="sys_head">
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
      <template v-for="(item,index) in this.menuTree">
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
    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="showbgitem" background-color="#fff"
        text-color="#383838">
            <el-menu-item index="1" @click="toindex">首页</el-menu-item>
            <el-menu-item index="2">人员管理</el-menu-item>
            <el-menu-item index="3" v-bind:class="{chbg: this.bg}">知识树</el-menu-item>
            <el-menu-item index="3">项目管理</el-menu-item>
            <el-menu-item index="4">任务管理</el-menu-item>
            <el-menu-item index="5" v-bind:class="{chbg: this.bg}">技能树管理</el-menu-item>
            <el-menu-item index="6">人员评估</el-menu-item>
            <el-menu-item index="7">追踪管理</el-menu-item>
            <el-menu-item index="8">项目日志</el-menu-item>
    </el-menu>-->
  </div>
</template>

<script>
// export default {
//     name: "sys_head",
//     data: function () {
//         return {
//             activeIndex: '5',
//             bg: false
//         }
//     },
//     props: ['data1'],
//     methods: {
//         showbgitem: function (key) {
//             if (key == '5') {
//                 this.bg = true
//             }
//             else {
//                 this.bg = false
//             }
//         },
//         toindex: function () {
//             this.$router.push({
//                 path: '/sys'
//             })
//         }
//     },
//     components:{
//     }
// }
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
  methods: {
    handleRoute(menu) {
      // console.log("menu--------------------------", menu);
      // console.log(this.mainTabs);
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
/* .logo {
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

    .el-menu-demo {
        display: flex;
        justify-content: space-between;
        min-height: 50px;
    }

    .aname {
        margin-top: 15px;
        margin-left: 30px;
        font-size: 20px;
        text-align: center;
        color: #383838;
        width: 150px;
    }

    .chbg {
        background-color: #ff5c5c;
    } */
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