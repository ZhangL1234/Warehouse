import edit from "../components/sys/content/edit";
import projectedit from "@/views/project/edit";
import detail from '@/views/project/detail';
import finished from '@/views/project/finished';
import add from '../views/project/add';
import projectlist from '@/views/project/list';
import show from "../components/sys/content/show";
import list from "../components/sys/content/list";
import peopleList from "@/views/people/list"
import peopleDetail from "@/views/people/add"
import peopleEdit from "@/views/people/edit"
import peopleManage from "@/views/people/manage"
import peopleAdd from "@/views/people/add"
import details from "../components/sys/content/details/details"
import addDetails from "../components/sys/content/details/addDetails"
import statistics from "@/views/people/statistics"
import results_manager from '../views/main_content/results_manager'
import topiclist from '@/views/topic/topiclist'
import Track from '@/views/Track/manage'
import journal from '@/views/journal'
import estimateAdd from '@/views/estimate/add'
import estimateList from '@/views/estimate/list'
const _import_views = (path) => () => import(`@/views/${path}`)

export default [
    {
        path: '',
        name: "list",
        component: list
    },
    {
        path: 'edit/edit/:id',
        name: "edit",
        component: edit
    },
    {
        path: 'show/:id',
        name: "show",
        component: show
    },
    {
        path: 'Details/:id',
        name: "Details",
        component: details
    },
    {
        path: 'addDetails/:id',
        name: "addDetails",
        component: addDetails
    },
    {
        path: 'peopleList',
        component: peopleList
    },
    {
        path: 'estimateadd',
        name: "estimateadd",
        component: estimateAdd
    },
    {
        path: 'estimatelist',
        name: "estiMateList",
        component: estimateList
    },
    {
        path: 'journal',
        name: "journal",
        component: journal
    },
    {
        path: 'peopleDetail',
        component: peopleDetail
    },
    {
        path: 'peopleEdit/:projectId',
        name: "people-edit",
        component: peopleEdit
    },
    {
        path: 'peopleManage/:projectId',
        name: "people-manage",
        component: peopleManage

    },
    {
        path: 'peopleAdd',
        name: "people-add",
        component: peopleAdd
    },
    {
        path: 'statistics',
        name: "statistics",
        component: statistics
    },
    {
        path: 'results_manager',
        component: results_manager
    },
    {
        path: 'topiclist',
        component: topiclist
    },
    {
        path: 'deltopic',
        name: "deltopic",
        component: _import_views('topic/deltopic')
    },
    {
        path: 'topicexe/:id',
        name: "topicexe",
        component: _import_views('topic/topicexe')
    },
    {
        path: 'deltopicexe/:id',
        name: "deltopicexe",
        component: _import_views('topic/deltopicexe')
    },
    {
        path: 'addtopic',
        name: "addtopic",
        component: _import_views('topic/addtopic')
    },
    {
        path: 'addtopicexe',
        name: "addtopicexe",
        component: _import_views('topic/addtopicexe')
    },
    {
        path: 'edittopicexe',
        name: "edittopicexe",
        component: _import_views('topic/edittopicexe')
    },
    {
        path: 'editsingle/:id',
        name: "editsingle",
        component: _import_views('topic/editsingle')
    },
    {
        path: 'Track',
        name: 'track-manage',
        component: Track
    },
    {
        path: 'trackadd',
        name: 'track-add',
        component: _import_views('Track/add')
    },
    {
        path: 'trackedit/:id',
        name: 'track-edit',
        component: _import_views('Track/edit')
    },
    {
        path: 'trackhistory/:id',
        name: 'track-history',
        component: _import_views('Track/history')
    },
    {
        path: 'taskManage',
        name: 'task-manage',
        component: _import_views('task/manage')
    },
    {
        path: 'taskList',
        name: 'task-list',
        component: _import_views('task/list'),
    },
    {
        path: 'mantask/:user_id',
        name: 'mantask',
        component: _import_views('task/mantask'),
    },
    {
        path: 'taskDetail/:id',
        name: 'task-detail',
        component: _import_views('task/detail')
    },
    {
        path: 'taskEdit/:id',
        name: 'task-edit',
        component: _import_views('task/edit')
    },
    {
        path: 'taskRate/:id',
        name: 'task-rate',
        component: _import_views('task/rate')
    },
    {
        path: 'taskUser',
        name: 'task-user',
        component: _import_views('task/status')
    },
    {
        path: '/project/add',
        name: 'add',
        component: add
    },
    {
        path: '/project/list',
        name: 'projectlist',
        component: projectlist
    },
    {
        path: '/project/edit/:id',
        component: projectedit
    },
    {
        path: '/project/finished',
        component: finished
    },
    {
        path: '/project/detail/:index',
        component: detail
    },
]