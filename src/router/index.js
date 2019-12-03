import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/index";

import sys_home from '../views/Home'
import Sys from "./Sys";
import sys from '../components/sys/index'
import Hos from "./Hos";
import hos from '../components/hos/index'
import login from '@/views/LoginRegister/Login'

import stu_mainContent from "../views/stu/stu_mainContent";
import stu_home from '../views/Home1'

// import Home from '../views/Home'
//import HosHomePage from '../views/Hos/HomePage'
// import SysHomePage from '../views/Sys/HomePage'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/stu',
            name: 'stu/home',
            redirect: '/stu/home',
            component: stu_home,
            children: [
                {
                  path:'stu_txxx',
                  name:'stu_txxx',
                  component: () =>import('@/views/stu/stu_txxx')
                },
                {
                    path: 'home',
                    name: 'stu_mainContent',
                    component: () => import('@/views/stu/stu_mainContent')
                },
                {
                    path: 'answer',
                    name: 'answer',
                    component: () => import('@/views/stu/answer')
                },
                {
                    path: 'review_results',
                    name: 'review_results',
                    component: () => import('@/views/stu/review_results')
                },
                 {
                    path: 'eval_record',
                    name: 'eval_record',
                    component: () => import('@/views/stu/eval_record')
                },
                {
                    path: 'evaluate',
                    name: 'evaluate',
                    component: () => import('@/views/stu/evaluate')
                },
                {
                    path: 'stu_zss_lb',
                    name: 'stu_zss_lb',
                    component: () => import('@/views/stu/stu_zss_lb')
                },
                {
                    path: 'stu_zss_swdt',
                    name: 'stu_zss_swdt',
                    component: () => import('@/views/stu/stu_zss_swdt')
                },
                {
                    path: 'stu_groupleader',
                    name: 'stu_groupleader',
                    component: () => import('@/views/stu/stu_groupleader')
                },
                {
                    path: 'stu_groupmember',
                    name: 'stu_groupmember',
                    component: () => import('@/views/stu/stu_groupmember')
                },
                {
                    path: 'stu_rwlb',
                    name: 'stu_rwlb',
                    component: () => import('@/views/stu/stu_rwlb')
                },
                {
                    path: 'stu_gzbg',
                    name: 'stu_gzbg',
                    component: () => import('@/views/stu/stu_gzbg')
                },
                {
                    path: 'stu_pinggu',
                    name: 'stu_pinggu',
                    component: () => import('@/views/stu/stu_pinggu')
                },
                {
                    path: 'results_manager',
                    name: 'results_manager',
                    component: () => import('@/views/stu/results_manager')
                },
                {
                    path: 'Topic_manage',
                    name: 'Topic_manage',
                    component: () => import('@/views/stu/Topic_manage')
                },
                {
                    path: 'stu_txrw',
                    name: 'stu_txrw',
                    component: () => import('@/views/stu/stu_txrw')
                },



            ]
        },

        {
          path:'/stu/mainContent',
          component: stu_mainContent
        },



        {
            path: '/sys_home',
            name: 'sys_home',
            component: sys_home,
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
        },
        {
            path: '/sys',
            component: sys,
            children: Sys
        },
        {
            path: '/hos',
            component: hos,
            children: Hos
        },
        {
            path: "",
            name: 'Login',
            component: login,
        },
    ],
    mode: 'hash'
})
