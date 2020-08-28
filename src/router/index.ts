import Vue  from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location : any) {
  return (routerPush.call(this, location) as any).catch((error: any) => error)
} 

const routerArr = [
    {
        path : '/',
        name : "home", 
    },
    {
        path : '/search',
        name : "search", 
    },
    {
        path : "/news",
        name : "news",  
    },
    {
        path : "/training",
        name : "training",  
    },
    {
        path : "/nursing",
        name : "nursing",  
    },
    {
        path : "/some",
        name : "some", 
    }
]

const route = routerArr.map((e: any) => {
    return {
        ...e,
        component : (resolve : any) => require([`@/pages/${e.name}/${e.name}`],resolve)
    }
}) 
export default new Router({
    mode : "history",
    routes : route
})

// [
//     {
//         path : '/',
//         name : "home",
//         component : resolve => require(["@/pages/home/home"],resolve)
//     },
//     {
//         path : '/search',
//         name : "search",
//         component : resolve => require(["@/pages/search/search"],resolve)
//     },
//     {
//         path : "/news",
//         name : "news", 
//         component :  resolve => require(['@/pages/news/news'],resolve)
//     },
//     {
//         path : "/training",
//         name : "training", 
//         component :  resolve => require(['@/pages/training/training'],resolve)
//     },
//     {
//         path : "/nursing",
//         name : "nursing", 
//         component :  resolve => require(['@/pages/nursing/nursing'],resolve)
//     },
//     {
//         path : "/details",
//         name : "details",
//         component : resolve => require(['@/pages/details/details'],resolve)
//     }
// ]