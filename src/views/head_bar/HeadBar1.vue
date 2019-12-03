<template>
  <div style="background-color: #fff">
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
      <el-menu-item
        v-if="item.childMenus.length == 0"
        :index="''+index"
        :key="index"
        v-for="(item,index) in this.menuTree"
        @click="handleRoute(item)"
      >{{item.name}}</el-menu-item>

      <el-submenu
        v-if="item.childMenus.length > 0"
        :index="''+index"
        :key="index"
        v-for="(item,index) in this.menuTree"
      >
        <template slot="title">{{item.name}}</template>
        <el-menu-item
          :index="index+'-'+num"
          v-for="(itemChild,num) in item.childMenus"
          :key="num"
          @click="handleRoute(itemChild)"
        >{{itemChild.name}}</el-menu-item>
      </el-submenu>
      <el-button size="mini" type="text" @click="signout">退出登录</el-button>
    </el-menu>
    <!--        <router-view/>-->
  </div>
</template>

<script>
import mapState from "vuex";

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
          url: "stu/home",
          childMenus: []
        },
        {
          name: "测评答题",
          url: "",
          childMenus: [
            {
              name: "答题测评",
              url: "stu/answer"
              // childMenus: []
            },
            {
              name: "测评结果",
              url: "stu/review_results",
              childMenus: []
            },
            {
              name: "历史评估记录",
              url: "stu/eval_record",
              childMenus: []
            }
          ]
        },
        {
          name: "知识树",
          childMenus: [
            {
              name: "知识树-列表版",
              url: "stu/stu_zss_lb",
              childMenus: []
            },
            {
              name: "知识树-思维导图版",
              url: "stu/stu_zss_swdt",
              childMenus: []
            }
          ]
        },
        {
          name: "我的小组",
          childMenus: [
            {
              name: "小组-组长",
              url: "stu/stu_groupleader",
              childMenus: []
            },
            {
              name: "小组-组员",
              url: "stu/stu_groupmember",
              childMenus: []
            }
          ]
        },
        {
          name: "我的任务",
          childMenus: [
            {
              name: "任务列表",
              url: "stu/stu_rwlb",
              childMenus: []
            }
          ]
        },
        {
          name: "工作报告",
          childMenus: [
            { name: "工作报告", url: "stu/stu_gzbg", childMenus: [] }
          ]
        },
        {
          name: "我的评估",
          childMenus: [{ name: "我的评估", url: "stu/stu_pinggu" }]
        }
      ]
      // 学生端菜单栏
      // menuTree:[
      //
      // ]
    };
  },
  computed: {
    mainTabs: {
      get() {
        return this.$store.state.tab.mainTabs;
      },
      set(val) {
        this.$store.commit("updateMainTabs", val);
      }
    },
    mainTabsActiveName: {
      get() {
        return this.$store.state.tab.mainTabsActiveName;
      },
      set(val) {
        this.$store.commit("updateMainTabsActiveName", val);
      }
    }
  },
  mounted() {
    this.mainTabs = [];
  },
  methods: {
    handleRoute(menu) {
      //console.log('menu--------------------------', menu);
      console.log(this.mainTabs);
      // tab标签页选中, 如果不存在则先添加
      let tab = this.mainTabs.filter(item => item.name === menu.name)[0];
      if (!tab) {
        tab = {
          name: menu.name,
          title: menu.url,
          icon: menu.icon
        };
        this.mainTabs = this.mainTabs.concat(tab);
        this.mainTabsActiveName = tab.name;
        console.log(this.tab);
        console.log(this.mainTabs);
      }
      this.mainTabsActiveName = tab.name;
      // 切换标签页时同步更新高亮菜单
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
