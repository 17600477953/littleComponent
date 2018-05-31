<!--  -->
<template>
<div class="fu">
  <div class="alert" ref="alert" v-show="alertBool">加载成功</div>
  <div class="myheader" ref="myheader">数据列表</div>
  <div class="wrapper" ref="wrapper">
    <div>
      <div class="top_tip" v-show="loadBool" ref="top_tip">
        释放立即刷新
      </div>
      <ul class="content">
      <li v-for="item in list" :key="item.name">
        <p>
          姓名：{{item.name}}
        </p>
        <p>
          年龄：{{item.age}}
        </p>
      </li>
    </ul>
    <div class="bot_tip" ref="bot_tip" v-show="botBool">加载更多</div>
    </div>
  </div>
</div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  data () {
    return {
      loadBool: false,
      unLoadBool: false,
      botBool: false,
      alertBool: false,
      list: [
      ],
      currentPage: 1,
      totalPage: 2
    }
  },
  created () {
    this.loadData(this.currentPage)
  },
  mounted () {
    // this.scrollFn()
  },
  methods: {
    loadData (params, data) {
      if (data === '刷新') {
        this.botBool = false
      }
      this.requestData(params).then((res) => {
        this.totalPage = res.data.data.totalPage
        this.list = res.data.data.resultList.concat(this.list)
        // console.log(this.list)
        this.botBool = true
        // 提示框部分
        if (data === '刷新') {
          this.alertBool = true
          this.$refs.alert.innerHTML = '刷新完成'
        } else if (data === '加载完成') {
          this.alertBool = true
          this.$refs.alert.innerHTML = '加载完成'
          this.$refs.bot_tip.innerHTML = '查看更多'
        } else if (data === '加载完了') {
          this.$refs.bot_tip.innerHTML = '我是有底线的'
        }
        setTimeout(() => {
          this.alertBool = false
        }, 1000)
        this.currentPage += 1
        //
        this.$nextTick(() => { // 创建scroll 对象
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.wrapper, {
              click: true,
              scrollY: true,
              pullUpLoad: {
                threshold: -40 // 负值是当上拉到超过低部 70px正值是距离底部距离 时
              }
            })
            this.scroll.on('scrollStart', () => { // 开始下拉提示释放可刷新
              this.loadBool = true
            })
            this.scroll.on('scroll', (pos) => { // 滚动时
              // console.log(pos)
              // if (pos.y > 50) {
              //   this.loadBool = false
              //   this.unLoadBool = true
              // } else {
              //   this.unLoadBool = false
              // }
            })
            // this.scroll.on('scrollCancel', (pos) => { // 滚动取消
            //   console.log(1)
            //   this.unLoadBool = false
            // })
            this.scroll.on('touchEnd', (pos) => {
              // 下拉动作结束 刷新
              this.loadBool = false
              if (pos.y > 30) {
                this.list = []
                this.currentPage = 1
                this.$refs.top_tip.innerHTML = '正在刷新...'
                setTimeout(() => {
                  this.$refs.top_tip.innerHTML = '释放立即刷新'
                }, 1000)
                this.$nextTick(() => {
                  this.scroll.finishPullDown()
                  this.scroll.refresh()
                  this.loadData(this.currentPage, '刷新')
                })
                // this.scroll.refresh()
                // this.loadData(this.currentPage, '刷新')
              }
            })
            this.scroll.on('pullingUp', () => { // 上拉加载更多
              this.$nextTick(() => {
                this.scroll.finishPullUp()
                this.scroll.refresh()
                if (this.currentPage < this.totalPage) {
                  this.$refs.bot_tip.innerHTML = '加载中...'
                  this.loadData(this.currentPage, '加载完成')
                } else if (this.currentPage === this.totalPage) {
                  this.$refs.bot_tip.innerHTML = '加载中...'
                  this.loadData(this.currentPage, '加载完了')
                }
              })
            })
          } else {
            this.scroll.refresh()
          }
        })
      })
    },
    requestData (params) {
      // console.log(2)
      return this.$http({
        method: 'post',
        url: 'returnMore',
        data: {
          currentPage: params
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.fu{
  width: 37.5rem;
  height: 66.7rem;
  font-size: 2rem;
  box-sizing: border-box;
  overflow: hidden;
  // border: 3px solid #f00;
}
.alert{
  position: fixed;
  width: 100%;
  top: 2rem;
  left:0;
  z-index: 10;
  height: 4rem;
  text-align: center;
  color: #ffffff;
  line-height: 4rem;
  background: rgba($color: #666666, $alpha: 0.5)
}
.myheader{
  height: 4rem;
  text-align: center;
  line-height: 4rem;
}
.wrapper{
  width: 100%;
  height: 62.7rem;
  overflow: hidden;
  position: relative;
}
.bot_tip{
  height: 4rem;
  line-height: 4rem;
  text-align: center;
}
.top_tip{
  height: 4rem;
  line-height: 4rem;
  text-align: center;
}
.content{
  background: #ccc;
  li{
    border-top: 1px dotted #f7f7f7;
    p{
      height: 3rem;
      line-height: 3rem;
    }
  }
}
</style>
