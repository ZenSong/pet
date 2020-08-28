<template>
    <div class="news">
        <myHeader></myHeader>
         <div class="my-loading" v-if="preload"> 
            <van-loading color="#5d61e1" />
        </div>
        <ul>
            <li v-for="(item,index) in newsList" :key="index" @click="mySome(item)">
               <div >
                    <div>
                        <img  :src="item.picture" alt="">
                    </div>
                    <div>{{item.title}}</div>  
                    <div>
                            <div> {{new Date(item.time).toDateString().split(' ').splice(1,3).join(' ')}}</div>
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
    import {Vue, Component} from 'vue-property-decorator'
    import myHeader from "../../components/head/head.vue"
    import {getPetListByPage} from '@/components/api/api'
    @Component({
        components : {
            myHeader, 
            
        }
    })
    export default  class news extends Vue {
            newsList : any [] = [] //新闻列表
            myLoading : boolean =  false    // 到达底部显示加载 
            menuPage : number =  1          // 分页 
            timer : any =  ""               //定时器   
            droploadNoData : boolean =  false // 没有数据的时候显示
            preload : boolean =  false   // 接口返回数据慢 给个加载动画
            newsListID : any =  "" // 分类的id
            newsListName : string =  "" // 分类名
            created () {
                let that : any = this;
                that.menuPage = 1 ;
                that.droploadNoData = false;  
                that.preload = true; 
                that.newsList = [];
                // 分类id
                that.newsListID = that.$route.query.id;  
                that.newsListName = that.$route.query.name;
                if(that.newsListID) {
                    that.getList()
                }  
            }; 
            mounted () {
                let that : any = this;
                that.operation ()
                // 谷歌广告
                // dynamicInsertion()  
            }; 
            // 离开时操作
            destroyed(){
                let that : any = this;
                window.removeEventListener('scroll', that.myscroll, false);
            }
            operation () {
                let that : any = this; 
                that.$nextTick(() =>{
                    setTimeout(()=>{        
                            window.addEventListener('scroll', that.myscroll);
                    },100)
                }) 
            };
            myscroll () { 
                let that : any = this;     
                var scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) -80; 
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if((document.querySelector(".my-loading") as HTMLElement) != undefined) {
                    let a :number = document.documentElement.clientHeight || document.body.clientHeight;
                    let myLoadingEle : any = document.querySelector(".my-loading") as HTMLElement;
                    let clientHeight :any = a + myLoadingEle.clientHeight;
                }    
                if((document.querySelector(".news") as HTMLElement) != undefined) {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var daodi = scrollTop + clientHeight 
                    if(daodi >=  scrollHeight) {  
                            that.myLoading = true   
                            window.removeEventListener('scroll', that.myscroll, false);
                            that.timer = setTimeout(()=> {
                                that.menuPage++
                                that.getList() 
                            },1000)
                            
                    }
                    else {
                        that.myLoading = false
                    } 
                }   
            } 
            // 获取菜单列表
            getList() {
                let that : any = this;
                //不带有cid 
                clearTimeout(that.timer);  
                new getPetListByPage(that.menuPage,10,that.newsListID).get()
                .then((res : any) => { 
                    that.preload = false 
                    if(!res.data.hasOwnProperty("info") || res.data.info.length <= 0) {
                        that.droploadNoData = true
                        that.myLoading = false 
                        window.removeEventListener('scroll', that.myscroll, false); 
                    }
                    else {
                        that.myLoading = false 
                        that.newsList.push(...res.data.info) 
                        window.addEventListener('scroll', that.myscroll)
                    }
                    // dynamicInsertion()  
                })
                .catch((err : any )=>{
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
                        name : that.newsListName
                    }
                }) 
            };
    } 
</script>
<style lang="scss" scoped>
    @import './css/news.scss';
</style>