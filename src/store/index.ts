import Vue from 'vue'
const state = Vue.observable({
    changeClass : false,  // 点击显示导航栏
    enterSearch : false, // 搜索框
    selModule : 0,      // 当前模块
})
const actions = {

}

const mutations = {
    SET_CHANGE_CLASS ( bool: any) {
        state.changeClass = bool 
    },  
    SET_ENTER_SEARCH ( bool : boolean) {
        state.enterSearch = bool;
    },
    SET_SEL_MODULE (bool : number) {
        state.selModule = bool;
    },
}    
export {
    state,
    actions,
    mutations
}