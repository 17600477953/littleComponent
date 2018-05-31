<!--  -->
<template>
  <div ref="container" id="container">
    <!-- <button @click="alert">+++</button>
    <button @click="alert">+++</button> -->
    <p><span>用户名</span><input type="text" v-model="userName"></p>
    <p><span>密码</span><input type="text" v-model="psw"></p>
    <p><button @click="logoIn">登陆</button><button @click="reg">注册</button></p>
    <div id="alertWrap">
      <div id="alertInner">
        <p class="tit">错误信息</p>
        <div class="confirm">
          <div class="confirmBtn" @click="conFn('confirm')">确定</div>
          <div class="cancelBtn" @click="conFn('cancel')">取消</div>
        </div>
      </div>
    </div>
    <div class="ball">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
// import { open } from '@/utils/tip.js'
export default {
  data () {
    return {
      userName: '',
      psw: ''
    }
  },
  created () {
    this.$nextTick(() => {
      // this.initDialog({type: 'confirm'})
    })
  },
  methods: {
    initDialog (params) {
      if (params.type === 'confirm') {
        let div = document.createElement('div')
        div.innerHTML = '<div id="alertWrap"><div id="alertInner"><p class="tit">错误提示</p><div class="confirm"><div class="confirmBtn">确认</div><div class="cencelBtn">取消</div></div></div></div>'
        this.$refs.container.appendChild(div)
      } else {

      }
    },
    logoIn () {
      const params = {
        username: this.userName,
        psw: this.psw
      }
      this.$http({
        method: 'get',
        url: '/login',
        params: params
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
    },
    reg () {
      const params = {
        username: this.userName,
        psw: this.psw
      }
      this.$http({
        method: 'post',
        url: '/registerPort',
        data: params
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err)
      })
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
.ball{
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}
#alertWrap{
  width: 100%;
  height: 100%;
  display: none;
  position: fixed;
  left: 0;
  top:0;
  background: rgba($bgcolor, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
#alertInner{
  width: 20rem;
  height: 8rem;
  padding: 1rem;
  // border: 1px solid #f00;
  border-radius: 1rem;
  box-shadow: 0px 0px 2px #888888;
  .tit{
    font-size: 1.6rem;
    color: #333;
    line-height: 4.4rem;
    text-align: center;
  }
}
.confirm{
  display: flex;
  justify-content: center;
  div{
    width: 6rem;
    height: 3rem;
    box-sizing: border-box;
    box-shadow: 0px 0px 2px #888888;
    line-height: 3rem;
    text-align: center;
    font-size: 1.4rem;
    border-radius: 0.6rem;
  }
  .confirmBtn{
    margin-right: 3rem;
    color: #fff;
    background: $bluecolor;
  }
  .cancelBtn{
    background: $yelwcolor;
    color: #fff;
  }
}
</style>
