<template>
    <div class="search">
        <myHeader ></myHeader> 
        <ul class="home-content-new" > 
            <li v-for="(pro , inx) in searchValArr" :key="inx" @click="mySome(pro)">
                <div >
                    <div>
                        <img  :src="pro.picture" alt="">
                    </div>
                    <div>{{pro.title}}</div>  
                    <div>
                            <div> {{new Date(pro.time).toDateString().split(' ').splice(1,3).join(' ')}}</div>
                    </div>
                </div>
            </li> 
        </ul> 
         <div class="my-loading" v-if="myLoading"> 
            <van-loading color="#5d61e1" />
        </div> 
        <div class="dropload-noData" v-if="droploadNoData">No more data...</div>
    </div>
</template>
<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator'
import myHeader from '../../components/head/head.vue' 
import {getPetListByPageS} from '@/components/api/api'
@Component({
    components : {
        myHeader,
    }
})
export default class search extends Vue {
            searchVal : string =  ""  // 搜索值
            myLoading : boolean =  false // 加载
            searchValArr : [] = []  // 搜索返回的数据
            searchMenuCount : number =  0 
            searchListPage : number = 1  // 页码
            droploadNoData  : boolean =  false // 没有数据的时候显示
            created() {   
                let that : any = this; 
                this.myInit();
            }
            mounted () { 
                let that : any = this;
                window.addEventListener('scroll', that.searchScroll, false);
            }
            // 离开时操作
            destroyed(){
                let that : any = this;
                window.removeEventListener('scroll', that.searchScroll, false);
            }
            myInit () {
                let that : any = this; 
                that.searchValArr = [];
                that.myLoading =  false; 
                that.searchValArr  = [];   
                that.searchMenuCount  =  0;
                that.searchListPage = 1;
                that.droploadNoData   =  false;  
                if(that.$route.query.searchVal) {
                    that.searchVal = that.$route.query.searchVal;
                    that.getSearchList(); 
                } 
            };
            searchScroll () {
                let that : any = this;
                var scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - 80; 
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if(document.querySelector(".my-loading") != undefined) {
                    var a = document.documentElement.clientHeight || document.body.clientHeight;
                    var clientHeight = a + (document.querySelector(".my-loading") as HTMLElement).clientHeight;
                } 
                // 判断是否不在详情页 
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var daodi = scrollTop + clientHeight 
                if(daodi >=  scrollHeight) {  
                        that.myLoading = true 
                        window.removeEventListener('scroll', that.searchScroll, false); 
                        that.timer = setTimeout((res : any)=> {
                            that.searchListPage++
                            that.getSearchList()  
                        },1000)
                }
                else {
                    that.myLoading = false
                } 
            } 
            // 下拉获取数据
            getSearchList () { 
                let that : any = this;
                new getPetListByPageS(that.searchListPage,10,that.searchVal).get()
                .then((res :any) => {  
                    if(res.data.info1.length <= 0) {
                        that.droploadNoData = true
                        that.myLoading = false 
                        window.removeEventListener('scroll', that.searchScroll, false); 
                    }
                    else {
                        that.myLoading = false; 
                        if(res.data.hasOwnProperty("info1")) {
                            that.searchValArr.push(...res.data.info1);
                        } 
                        that.searchMenuCount = res.data.size;
                        window.addEventListener('scroll', that.searchScroll);
                    }
                    // dynamicInsertion()
                })
                .catch((err :any)=>{
                    console.log(err)
                })
            }  
            // 跳转详情页
            mySome(item:any) {
                 let that : any = this; 
                that.$router.push({
                    path : "/some",
                    query : {
                        id : item.id,
                        name : ""
                    }
                }) 
            };
            @Watch("$route")
            routeChange() { 
                let that : any = this; 
                this.myInit();
            }
}
</script>
<style lang="scss" scoped>
@import  './css/search.scss';
</style>