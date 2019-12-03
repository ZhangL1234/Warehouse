import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import app from './modules/app'
import menu from './modules/menu'
import iframe from './modules/iframe'
import tab from './modules/tab'

const store = new vuex.Store({
    modules:{
        app: app,
        menu: menu,
        iframe: iframe,
        tab:tab
    }
})

export default store
