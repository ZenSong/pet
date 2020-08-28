<template>
    <div class="home">
        <myHeader></myHeader>
        <div class="home-content">
            <div class="home-swipe">
                <van-swipe :autoplay="4000" ref="swipe">
                    <van-swipe-item v-for="(item, index) in swipeArr" :key="index">
                        <ul>
                            <li  @click="mySome(item,'')">
                                <div>
                                    <img :src="item.picture" alt="">
                                </div> 
                            </li>
                        </ul>
                    </van-swipe-item>
                </van-swipe>
                <!-- <div class="carousel-direction-left"  @click="previous(item.startPage,item.topTenArr.length,index)">
                    <van-icon name="arrow-left" size="3rem" color="#07aae0" />
                </div>
                <div class="carousel-direction-right"  @click="nextPicture(item.startPage,item.topTenArr.length,index)">
                    <van-icon name="arrow" size="3rem" color="#07aae0"/>
                </div> -->
            </div> 
            <div class="home-content-list" v-for="(item,index) in homeClassificationData" :key="index">
                <div class="class-title" @click="moreList(item,index)"> 
                    <div>{{item.name}}</div> 
                </div> 
                
                <ul class="home-content-new" v-if="index == 0"> 
                    <li v-for="(pro , inx) in item.data" :key="inx" @click="mySome(pro,item.name)">
                        <div  @click="petDetails(inx)">
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
                <ul class="home-content-training"  v-if="index == 1"> 
                    <li v-for="(pro , inx) in item.data" :key="inx" @click="mySome(pro,item.name)">
                        <div  @click="petDetails(inx)">
                            <div>
                                <img  :src="pro.picture" alt="">
                            </div>
                            <div>{{pro.title}}</div>  
                            <div> {{new Date(pro.time).toDateString().split(' ').splice(1,3).join(' ')}}</div>
                        </div>
                    </li> 
                </ul>
                <ul class="home-content-nursing" v-if="index != 0 && index != 1"> 
                    <li v-for="(pro , inx) in item.data" :key="inx" @click="mySome(pro,item.name)">
                        <div  @click="petDetails(inx)">
                            <div>
                                <img  :src="pro.picture" alt="">
                            </div>
                            <div>
                                <div>{{pro.title}}</div> 
                                <div>
                                    <div>
                                        <img src="../../assets/img/time.png" alt="">
                                    </div>
                                    <div> {{new Date(pro.time).toDateString().split(' ').splice(1,3).join(' ')}}</div>
                                </div>
                            </div> 
                        </div>
                    </li> 
                </ul>
            </div> 

        </div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import myHeader from "../../components/head/head.vue"
    import {getPettypeList,getPetListByPage,getCarousel} from '@/components/api/api'
    @Component({
        components : {
            myHeader, 
            
        } 
    })
    export default  class Home extends Vue {
            swipeArr : any [] = [] // 轮播数据  
            homeList : any [] = []; 
            imgScale : number =  -1;
            homeListBool : boolean = false;  // 用于判断是否有缓存数据
            homeListClassify : any [] = [];      // 用于判断缓存中的分类与数据库中的分类是否一样 (判断数据库中的分类删除或者增加)
            homeClassificationN : number = -1000;
            created () {
                let that : any  = this;  
                let myHomeList : any = JSON.parse(localStorage.getItem("myHomePetList") as any);   
                (myHomeList) ? (that.homeList = myHomeList) : [];   
                // 判断是否有了缓存数据 
                if(that.homeList.length > 0) {
                    that.homeListBool = true;
                }
                that.getMyCarousel()
            };
            mounted() {  
                let that : any  = this;  
                // 获取分类接口 
                new getPettypeList().get()
                .then((res : any) => { 
                    // 存储最新数据库中的分类数据
                    that.homeListClassify = res.data.info;   
                    // 不直接给that.homeList赋值的原因是因为，这样会导致属性data中的数据清空，体验不好
                    // that.homeList = res.data.info;  
                    res.data.info.forEach((e:any,i :number) => { 
                        that.homeListClassify[i].complete = 0;
                        // 这里加个&& that.homeListBool判断是为了判断调用接口后that.homeListBool里添加了值
                        if(that.homeList.length > 0 && that.homeListBool) {
                            //  有缓存的写法
                            that.homeList[i].complete = 0;
                            that.homeList[i].id = e.id;
                            that.homeList[i].name = e.name
                        }
                        else {
                            // 没缓存的写法
                            that.homeListBool = false;
                            that.homeList[i] = {};
                            that.homeList[i].complete = 0;
                            that.homeList[i].id = e.id;
                            that.homeList[i].name = e.name
                        }   
                        that.getData(i,e.id) 
                    });
                })
                .catch((err : any) => {
                    console.log(err)
                }) 
                // dynamicInsertion();
                
            };
            // 轮播数据
            getMyCarousel() {
                let that : any = this;
                new getCarousel ().get()
                .then((res :any) => {
                    that.swipeArr = res.data.info; 
                })
                .catch((err : any) =>{
                    console.log(err)
                })
            }
            getData(inx : number,myId : number) { 
                let that : any = this ;
                new getPetListByPage(1,6,myId).get()
                .then((res : any) => { 
                    that.homeList[inx].data = res.data.info; 
                    that.homeList[inx].complete = 1 ;

                    that.homeListClassify[inx].data = res.data.info; 
                    that.homeListClassify[inx].complete = 1 ; 
                    that.homeClassificationN--;  
                    let bool =  that.homeList.every(( e : any) => {
                        return e.complete == 1
                    }) 
                    if(bool) { 
                        that.homeList = that.homeListClassify; 
                        localStorage.removeItem("myHomePetList"); 
                        localStorage.setItem("myHomePetList",JSON.stringify(that.homeList))
                    }  
                })  
                .catch((err : any) =>{
                    console.log(err)
                })
            } ; 
            petDetails(index : number) {
                let that : any = this;
                that.imgScale = index;
            };
            moreList (item : any , inx :number) {
                let that : any = this;
                if(inx == 0) {
                    that.$router.push({
                        path : "/news",
                        query : {
                            id : item.id,
                            name : item.name
                        }
                    })
                }
                else if (inx == 1) {
                    that.$router.push({
                        path : "/training",
                        query : {
                            id : item.id,
                            name : item.name
                        }
                    })
                }
                else {
                    that.$router.push({
                        path : "/nursing",
                        query : {
                            id : item.id,
                            name : item.name
                        }
                    })
                }
            };
            mySome(item:any,name:string) {
                let that : any = this;    
                that.$router.push({
                    path : "/some",
                    query : {
                        id : item.id,
                        name :  name
                    }
                }) 
            };
            get homeClassificationData () : any{
                let that : any  = this;
                that.homeClassificationN--;   
                return that.homeList;
            };
    } 
</script>
<style lang="scss" scoped>
    @import './css/home.scss';
</style>