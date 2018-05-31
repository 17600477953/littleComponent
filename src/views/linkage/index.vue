<!--  -->
<template>
  <div class="app-container">
    <div class="myHeader">
      <h1>我是头部</h1>
    </div>
    <div class="myContent">
      <goods></goods>
    </div>
  </div>
</template>

<script>
import goods from './good.vue'
export default {
  components: {
    goods
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>
<style lang='scss' scoped>
  .app-container{
    width: 100%;
  }
  .myHeader{
    h1{
      text-align:center;
      line-height: 4rem;
      border:1px solid #f7f7f7;
    }
  }
  .myContent{

  }
</style>
