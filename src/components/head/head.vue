<template>
    <div class="header"> 
        <div @click="myMeun()" class="my-meun">
            <van-icon name="wap-nav" color="#ffffff" size="1.8rem"/>
        </div> 
        <div v-if="!searchHead" class="search-btm">
            <div @click="search()">
                <img src="../../assets/img/search.png" alt="">
            </div>
        </div>
        <div v-if="searchHead" class="search-int">
            <div>
                <input type="text" placeholder="search" @keypress="checkInfo()" ref="mySearch" />
            </div>
            <div @click="startSearch()">
                <img src="../../assets/img/search.png" alt="">
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {state,mutations} from '@/store/index';
@Component({ 
     
}) 
export default  class Myheader extends Vue{
        myVal : string =  "";
        mounted() {
            let that : any = this;
            that.myVal = that.$route.query.searchVal;
            if(that.myVal != undefined) { 
                that.$refs.mySearch.value = that.myVal
            }  
            
        }
        myMeun () {
            // let that : any = this; 
            // that.$store.commit("SET_CHANGE_CLASS",!that.$store.state.changeClass) 
            mutations.SET_CHANGE_CLASS(!state.changeClass)
        }
        search (){
            (this as any).$router.push({
                path: '/search', 
            });
        }
        checkInfo(evt : any){  
            let that : any = this;
            evt = (evt) ? evt : window.event
            if (evt.keyCode) {
                if(evt.keyCode == 13){ 
                    that.startSearch(); 
                }
            }
        }
        startSearch() {
            let that : any = this;
            var val = that.$refs.mySearch.value; 
            if(val.replace(/\s*/gi,"") != "") {  
                that.$router.push({
                    path : "/search",
                    query: {
                        searchVal:val
                    }
                }) 
            }   
        }
        get searchHead () { 
            return state.enterSearch
        }
} 
</script> 
<style lang="scss" scoped>
    @import './css/head.scss';
</style>