
  
    import axios from 'axios'
    // 新数据的详情接口
    class getPetDetails {
        id : number;
        constructor (id : any) {
            this.id = id;
        }
        get() {
            return new Promise ((reslove,reject) => {
                let that = this; 
                axios.get(`/cookBook/getPetDetails?id=${that.id}`)
                .then((res : any) => {
                    reslove(res)
                })
                .catch((err:any) => {
                    reject(err)
                })
            })
        } 
    }
    // 拿取分类接口
    class getPettypeList {
        get () {
            let that = this;
            return new Promise ((reslove,reject) =>{
                axios.get(`/cookBook/getPettypeList`)
                .then((res : any) => {
                    reslove(res)
                })
                .catch((err:any) => {
                    reject(err)
                })
            })
        }
    }
    // 拿取新列表数据
    class getPetListByPage {
        i : number;
        n : number;
        id? : number;
        constructor (a:number,b:number,c?:number) {
            this.i = a;
            this.n = b;
            this.id = c;
        }
        get () {
            let that = this; 
            return new Promise( function (reslove : any,reject : any) {
                axios.get(`/cookBook/getPetListByPage?start=${that.i}&limit=${that.n}&typeId=${that.id}`)
                .then((res : any) => {
                    reslove(res)
                })
                .catch((err:any) => {
                    reject(err)
                })
            }) 
        }
    }  
    // 获取搜索数据 
    class getPetListByPageS {
        i : number;
        n:number;
        val :any;
        constructor (a:number,b:number,c:any) {
            this.i = a;
            this.n = b;
            this.val = c;
        }
        get () {
            let that = this;
            return new Promise( function (reslove,reject) {
                axios.get(`cookBook/getPetListByPageS?start=${that.i}&limit=${that.n}&title=${that.val}`)
                .then((res : any) => {
                    reslove(res)
                })
                .catch((err:any) => {
                    reject(err)
                })
            }) 
        }
    } 
    // 轮播接口
    class getCarousel { 
        get () {
            let that = this;
            return new Promise( function (reslove,reject) {
                axios.get(`cookBook/Img`)
                .then((res : any) => {
                    reslove(res)
                })
                .catch((err:any) => {
                    reject(err)
                })
            }) 
        }
    }  
    // 动态加载谷歌广告 
    function dynamicInsertion(){
        let myVar=setTimeout(() => {
            var oDom=Array.from(document.querySelectorAll(".newGoogleList")) 
            for(let i=0;i<oDom.length;i++ ){ 
                var ss = oDom[i].querySelectorAll(".mygoogleList");
                if(ss.length > 0 && ss[0].innerHTML == '(adsbygoogle = window.adsbygoogle || []).push({});') {
                    
                } 
                else {
                    let script =document.createElement("script"); 
                    script.type='text/javascript';
                    let nHTML='(adsbygoogle = window.adsbygoogle || []).push({});';
                    script.setAttribute('class','mygoogleList');
                    script.innerHTML=nHTML
                    oDom[i].appendChild(script);
                } 
            }
        }, 10);
    }
    function record(item:any) {
        gtag('event', 'click', { 'event_label':item, 'event_callback' : function(){}});  
    } 
    export { 
        getPetDetails,
        dynamicInsertion,
        record,
        getPettypeList,
        getPetListByPage,
        getPetListByPageS,
        getCarousel
    }  