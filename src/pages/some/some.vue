<template>
    <div class="some">
        <myHeader ></myHeader> 
        <h2 class="new-detail-title">
            {{title}}
        </h2>
        <div class="new-content"> 
            <div v-html="contentHtml" class="new-my-html"></div>
        </div> 
        <van-image-preview
            v-model="showMaxImg"
            :images="MaxImgArr" 
            :start-position = "startMaxImg"
            :show-index = false
            > 
        </van-image-preview>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator';
 import myHeader from '../../components/head/head.vue' 
import {getPetDetails} from '@/components/api/api'
@Component({
    components : {
        myHeader,
    }
})
export default class some extends Vue {
        contentHtml : string = "";
        showMaxImg: boolean =  false  // 全屏显示图片
        MaxImgArr : [] = []    // 全屏需要显示图片的数据
        startMaxImg : number =  0   // 图片预览位置
        title: string = ""
        created () { 
            let that :any = this;
            var id = that.$route.query.id;  
            id ? that.getData(id) : ""; 
            that.listName = that.$route.query.name ? that.$route.query.name : "";
        };
         getData(id : number) {
            let that :any = this;
            new getPetDetails(id).get()
            .then((res : any) =>{
                if(res.data.info.length> 0) {
                    if(res.data.info[0].hasOwnProperty("details")) { 
                        that.contentHtml = res.data.info[0].details.replace(/&nbsp;/g,"     "); 
                        that.title = res.data.info[0].title
                    } 
                } 
                // 详情页的操作
                that.$nextTick(() =>{ 
                    // 获取图片链接
                    let imgArr = Array.from(document.querySelectorAll(".new-my-html img") as NodeListOf<HTMLElement>);  
                    imgArr.forEach((e:any,i:number) => { 
                        that.MaxImgArr.push(e.getAttribute("src"))  
                        e.addEventListener("click",() =>{
                            that.showMaxImg = true ;
                            that.startMaxImg = i ;
                        })
                    }); 
                })
            })
            .catch((err : any) =>{
                console.log(err)
            })
        };
};  
</script>
<style> 
.new-my-html  h3{ 
    font-weight: bold !important;
    font-weight: 1000 !important;
    margin: 0.5rem 0 !important;
} 
.new-my-html  img{
    width: 100%; 
    margin: 0 !important;
}
.new-my-html  p{
    width: 100%;
    font-size: 1rem;  
} 
.new-my-html  *{
    width: 100%;
    font-size: 1rem;
    margin: 10px 0 !important;
    word-break: break-all;
    text-indent: 0 !important;
    background-color: #ffffff !important;
}  
</style>
<style lang="scss" scoped>
    @import './css/details.scss';
</style>