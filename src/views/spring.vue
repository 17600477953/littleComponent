<!--  -->
<template>
  <div class="waterfalls">
    <ul id="waterfalls-left" ref="leftUl">
    </ul>
    <ul id="waterfalls-right" ref="rightUl">
    </ul>
    <ul id="items" ref="itemUl" v-show="false">
      <li v-for="(item,index) in carList" :key="index">
        <img :src="item.url" alt="">
        <p>{{item.parph}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carList: [
        {
          parph: '床前明受到收到的月光',
          url: require('../assets/images/1.jpg')
        },
        {
          parph: '疑是地上霜',
          url: require('../assets/images/2.jpg')
        },
        {
          parph: '举头望明月萨达萨达撒旦',
          url: require('../assets/images/3.jpg')
        },
        {
          parph: '低头思撒旦大苏打实打实大苏打实打实大苏打故乡',
          url: require('../assets/images/4.jpg')
        },
        {
          parph: '哈哈哈哈撒旦撒旦哈哈',
          url: require('../assets/images/5.jpg')
        },
        {
          parph: '床前明月阿斯顿萨达萨达萨达萨达速度光',
          url: require('../assets/images/6.jpg')
        },
        {
          parph: '疑是地撒大苏打撒旦萨达萨达撒旦是上霜',
          url: require('../assets/images/7.jpg')
        },
        {
          parph: '举头望大萨达萨达萨达萨达明月',
          url: require('../assets/images/8.jpg')
        },
        {
          parph: '低头思撒大苏打实打实的故乡',
          url: require('../assets/images/9.jpg')
        },
        {
          parph: '哈哈哈撒大苏打撒大苏打哈哈哈',
          url: require('../assets/images/5.jpg')
        }
      ]
    }
  },
  created () {
  },
  mounted () {
    // console.log(this.$refs.leftUl.offsetHeight)
    setTimeout(() => {
      // console.log(this.$refs.itemUl.children)
      let arr = [...this.$refs.itemUl.children]
      arr.forEach(element => {
        // console.log(element)
        if (this.$refs.leftUl.offsetHeight <= this.$refs.rightUl.offsetHeight) {
          console.log(1)
          this.$refs.leftUl.appendChild(element)
        } else {
          console.log(2)
          this.$refs.rightUl.appendChild(element)
        }
      })
    }, 1000)
  },
  methods: {
    _getImg () {
      this.$http({
        method: 'get',
        url: '/store/splStoreInfo/showStore.do',
        params: {
          usrId: this.usrId,
          splId: this.splId,
          inapp: this.inapp
        }
      }).then(res => {
        console.log(res.data.data.propList)
        if (res.data.data.propList) {
          this.carList = res.data.data.propList
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.waterfalls{
  width: 100%;
  // height: 100%;
  #waterfalls-left{
    width: 45%;
    float: left;
    background: #f7f7f7;
    li{
      box-sizing: border-box;
      width:100%;
      border: 1px solid #000;
      img{
        width: 100%;
        // height: 10rem;
      }
      p{
        font-size: 1.5rem;
      }
    }
  }
  #waterfalls-right{
    width: 45%;
    float: right;
    background: #cccccc;
    li{
      box-sizing: border-box;
      width:100%;
      border: 1px solid #000;
      img{
        width: 100%;
      }
      p{
        font-size: 1.5rem;
      }
    }
  }
  #items{
    width: 50%;
    li{
      box-sizing: border-box;
      width:100%;
      border: 1px solid #000;
      img{
        width: 10rem;
        // height: 10rem;
      }
      p{
        font-size: 1.5rem;
      }
    }
  }
}
</style>
