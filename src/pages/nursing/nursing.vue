<template>
    <div class="nursing">
        <myHeader></myHeader>
        <div class="my-loading" v-if="preload"> 
            <van-loading color="#5d61e1" />
        </div>
        <ul class="content-nursing">
            <li v-for="(item , inx) in nursingList" :key="inx" @click="mySome(item)">
                <div >
                    <div>
                        <img  :src="item.picture" alt="">
                    </div>
                    <div>
                        <div>{{item.title}}</div> 
                        <div>
                            <div>
                                <img src="../../assets/img/time.png" alt="">
                            </div>
                            <div> {{new Date(item.time).toDateString().split(' ').splice(1,3).join(' ')}}</div>
                        </div>
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
    import myHeader from "../../components/head/head.vue"
    import {getPetListByPage} from '@/components/api/api'
    import {mutations} from '@/store/index';
    @Component({
        components : {
            myHeader, 
            
        }
    })
    export default  class nursing extends Vue {
            nursingList : any [] = []
            myLoading : boolean =  false    // 到达底部显示加载 
            menuPage : number =  1          // 分页 
            timer : any =  ""               //定时器   
            droploadNoData : boolean =  false // 没有数据的时候显示
            preload : boolean =  false   // 接口返回数据慢 给个加载动画
            nursingListID : any =  "" // 分类的id
            nursingListName : string =  "" // 分类名
            created () {
                let that : any = this; 
                that.myInit();
            }; 
            mounted () {
                let that : any = this;
                if(that.$route.query.inx) {
                    mutations.SET_SEL_MODULE(that.$route.query.inx); 
                } 
                that.operation ()
                // 谷歌广告
                // dynamicInsertion()  
            }; 
            // 离开时操作
            destroyed(){
                let that : any = this;
                window.removeEventListener('scroll', that.myscroll, false);
            }
            // 初始化
            myInit() {
                let that : any = this;
                that.menuPage = 1 ;
                that.droploadNoData = false;  
                that.preload = true; 
                that.nursingList = [];
                // 分类id
                that.nursingListID = that.$route.query.id;  
                that.nursingListName = that.$route.query.name;  
                if(that.nursingListID) {
                    that.getList()
                }   
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
                if((document.querySelector(".nursing") as HTMLElement) != undefined) {
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
                new getPetListByPage(that.menuPage,10,that.nursingListID).get()
                .then((res : any) => { 
                    that.preload = false 
                    if(!res.data.hasOwnProperty("info") || res.data.info.length <= 0) {
                        that.droploadNoData = true
                        that.myLoading = false 
                        window.removeEventListener('scroll', that.myscroll, false); 
                    }
                    else {
                        that.myLoading = false 
                        that.nursingList.push(...res.data.info) 
                        window.addEventListener('scroll', that.myscroll)
                    }
                    // dynamicInsertion()  
                })
                .catch((err : any )=>{
                    console.log(err)
                }) 
            }; 
            // 跳转详情页
            mySome(item:any) {
                 let that : any = this; 
                that.$router.push({
                    path : "/some",
                    query : {
                        id : item.id,
                        name : that.nursingListName
                    }
                }) 
            };
            // 监听路由变化
            @Watch("$route")   
            routeChanged () { 
                let that : any = this;
                that.myInit();
            } 
    } 
</script>
<style lang="scss" scoped>
    @import './css/nursing.scss';
</style>