export default {
    state: {
        appName:"鲤鱼云", //应用名称
        menuRouteLoaded:false // 菜单和路由是否已经加载
    },
    getters:{

    },
    mutations:{
        menuRouteLoaded(state,menuRouteLoaded){
            state.menuRouteLoaded = menuRouteLoaded;
        }
    },
    actions:{

    }
}
