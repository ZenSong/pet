<template>
  <div id="app">  
      <div class="content" :class="{'contentX': nav}">
          <router-view></router-view>
      </div> 
      <div ref="myNav" class="my-nav " :class="{'my-navX': nav}">
          <navber></navber>
      </div> 
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; 
 import navber from "@/components/navigation/navigation.vue";
 import {state} from '@/store/index'
@Component({
  components: { 
      navber
  } 
})
export default class App extends Vue {
      mounted () {
          let that : any = this;
          that.$refs.myNav.style.height = document.documentElement.clientHeight + 'px';
      }
      get nav () { 
          return state.changeClass
      }
}
</script>

<style lang="scss">
#app {
  width: 100%; 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50; 
  height: 100%; 
  overflow-x: hidden; 
  .my-nav{
    width: 100%; 
    position: fixed;
    top: 0;  
    transform: translateX(-100%); 
    transition: transform 0.3s linear;
  }
  .my-navX{ 
    width: 100%; 
    transform: translateX(-20%);
  } 
  .content{
    width: 100%; 
    // transform: translateX(0%);  
    transition: transform  0.3s linear;
  }
  .contentX{ 
    transform: translateX(80%); 
  }
}
 
</style>