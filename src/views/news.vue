<!--  -->
<template>
  <div ref="container" id="container">
    <!-- <button @click="alertMsg">消息提示</button> -->
    <div class="upload">
      <button @click="fn">添加</button>
      <ul class="clearfix">
        <li v-if="imgs.length>0" v-for='(item ,index ) in imgs' :key="index">
          <img :src="item">
        </li>
        <!-- <li style="position:relative" v-if="imgs.length>=6 ? false : true">
          <input class="upload" @change='add_img'  type="file">
        </li> -->
    </ul>
    <p style="position:relative" v-if="imgs.length>=6 ? false : true">
      <input ref="inputbtn" class="upload" @change='add_img'  type="file">
    </p>
    </div>
  </div>
</template>

<script>
import { open } from '@/utils/tip.js'
export default {
  data () {
    return {
      userName: '',
      psw: '',
      imgs: [],
      imgData: {
        accept: 'image/gif, image/jpeg, image/png, image/jpg'
      }
    }
  },
  created () {
    this.$nextTick(() => {
      // this.initDialog({type: 'confirm'})
    })
  },
  methods: {
    alertMsg () {
      open({tit: '标题', content: '错误提示'})
    },
    initDialog (params) {
      if (params.type === 'confirm') {
        let div = document.createElement('div')
        div.innerHTML = '<div id="alertWrap"><div id="alertInner"><p class="tit">错误提示</p><div class="confirm"><div class="confirmBtn">确认</div><div class="cencelBtn">取消</div></div></div></div>'
        this.$refs.container.appendChild(div)
      } else {

      }
    },
    fn () {
      this.$refs.inputbtn.click() // 代替原生的上传按钮
    },
    add_img (event) {
      let reader = new FileReader()
      let img1 = event.target.files[0]
      let type = img1.type// 文件的类型，判断是否是图片
      let size = img1.size// 文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) === -1) {
        alert('请选择我们支持的图片格式！')
        return false
      }
      if (size > 3145728) {
        alert('请选择3M以内的图片！')
        return false
      }
      reader.readAsDataURL(img1)
      var that = this
      reader.onload = function (e) {
        var url = this.result
        that.imgs.push(url)
        console.log(url)
        // img.src = url
      }
      let form = new FormData()
      form.append('file', img1, img1.name)
      this.$http.post('/file/upload', form, {
        headers: {'Content-Type': 'multipart/form-data'}
      }).then((response) => {
        console.log(response.data)
        // uri = response.data.url
        // reader.readAsDataURL(img1)
        // var that = this
        // reader.onloadend = function () {
        //   that.imgs.push(uri)
        // }
      }).catch((error) => {
        alert('上传图片出错！')
        console.log(error)
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
.clearfix{
  overflow: hidden;
  li{
    width: 10rem;
    height: 10rem;
    float: left;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
