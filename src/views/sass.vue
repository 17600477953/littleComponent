<!-- scss练习 -->
<template>
  <div>
    <div class="box">
      <button @click="fn">点我跳转</button>
      <router-link @click.native="fn2" to="/linkage">点我也能跳</router-link>
    </div>
    <div class="menuBar">
      <p>加粗了吗</p>
    </div>
    <div>
      <input type="text">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    fn2 () {
      console.log(2)
    },
    fn () {
      console.log(1)
      this.$router.push({path: '/linkage'})
    }
  }
}

</script>
<style lang='scss' scoped>
$bgcolor:#f2f2f2;
$bluecolor:#409EFF;
$greencolor:#67C23A;
$yelwcolor:#E6A23C;
$redcolor:#F56C6C;
@mixin ball($reg:20%){
  border-radius: $reg;
  border:1px solid $bluecolor;
}
.box{
  @include ball(50%);
  width: 300px;
  height: 300px;
  background: $greencolor;
}
.menuBar{
  height: 30rem;
  p{
    font: {
      size:20px;
      weight:700;
    }
  }
}
%block{
  border:1px solid #F56C6C
}
.menuBar{
  @extend %block;
}
</style>
