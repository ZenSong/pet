<template>
    <div class="navigation">
        <div class="list">
            <ul>
                <li></li>
                <li v-for="(item,index) in list" :key="index">
                    <div @click="select(item,index)">
                        <div :class="{'span-1': setMyActive === index}"></div>
                        <!-- <div>
                            <img :src="item.url" alt="">
                        </div> -->
                        <div>{{item.name}}</div>
                    </div> 
                </li>
            </ul>
        </div>
        <div class="layer" @click="closeLayer()"  v-if="layerShow">
             
        </div>
    </div>
</template>
<script lang="ts">
import {Vue,Component} from 'vue-property-decorator'
import Home from '../../pages/home/home.vue';
import {state,mutations} from '@/store/index';
import {getPettypeList} from '@/components/api/api'
@Component({ 
})
export default class Navigation extends Vue {
        list : any [] = [
            {id : 10000000, name: "Home"}, 
        ]
        created() {
            new getPettypeList().get()
            .then((res : any) => {
                (this as any).list.push(...res.data.info) 
            })
        };
        closeLayer() { 
            mutations.SET_CHANGE_CLASS(false);
        }
        select(item : any,inx:number) { 
            mutations.SET_CHANGE_CLASS(false);
            mutations.SET_SEL_MODULE(inx); 
            let that : any = this;
            if(item.id == 10000000) {
                that.$router.push({
                    path: "/",
                })
            }
            else if (inx == 1) {
                that.$router.push({
                    path: "/news",
                    query : {  
                        id : item.id, 
                        name : item.name
                    }
                })
            }
            else if (inx == 2) {
                that.$router.push({
                    path: "/training",
                    query : {  
                        id : item.id, 
                        name : item.name
                    }
                })
            } 
            else if (inx == 3){
                that.$router.push({
                    path: "/nursing",
                    query : {  
                        id : item.id, 
                        name : item.name, 
                    }
                })
            }
            else {
                that.$router.push({
                    path: "/nursing",
                    query : {  
                        id : item.id, 
                        name : item.name, 
                    }
                })
            }
        }
        get layerShow () { 
            return state.changeClass
        }
        get setMyActive() {  
            return state.selModule
        }
}
</script>
<style lang="scss" scoped>
    @import './css/navigation.scss';
</style>