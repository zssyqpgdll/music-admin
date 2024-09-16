<template>
  <div class="app-container timeline">
    <TimelineBoard :allDatas="allDatas" msg="Welcome to Your Vue.js App" />
    <modal name="hello-image" @before-open="beforeOpen" height="auto" draggable=".modal-image" :resizable="true">
      <img class="modal-image" :src="imgUrl" />
    </modal>
  </div>
</template>

<script>
  import TimelineBoard from "@/components/TimelineBoard/TimelineBoard";
  import axios from "axios";

  export default {
    name: "index",
    components:{
      TimelineBoard
    },
    data(){
      return{
        imgUrl: '',
        allDatas: []
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData() {
        axios.get('/static/data/timeline/allData.json').then( response => {
          console.log(response.data)
          this.allDatas = response.data
        });
      },
      beforeOpen(event) {
        console.log(event.params.imgUrl)
        this.imgUrl = event.params.imgUrl
      }
    }
  }
</script>

<style scoped>
.timeline{
  text-align: center;
  color: #2c3e50;
  margin: 0 2% 0 2%;
}

.modal-image {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: block;
}
</style>