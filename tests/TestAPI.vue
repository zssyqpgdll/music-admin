<template>
  <div></div>
</template>

<script>
  import request_dc from '@/utils/request_dc'

  export default {
    name: "TestAPI",
    data(){
      return{
        res:null
      }
    },
    mounted(){
      // request_dc({
      //   url: '/',method:'post'
      // }).then(res=>{
      //   console.log(res)
      //   this.res = res
      // })
    }
  }

</script>

<style scoped>

</style>
