<!--  -->
<template>
<div class="goods">
  <div class="leftBar">
    <ul>
      <li v-for="(item,index) in goodsList" :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
        {{item.kindName}}
      </li>
    </ul>
  </div>
  <div class="wraper" ref="innerlist">
    <div class="inner">
    <ul class="kinds">
      <li v-for="(item,index) in goodsList" :key="index" ref="goodList">
        <p>{{item.kindName}}</p>
        <ul class="goods">
          <li v-for="(ele,index) in item.list" :key="index">
            <div class="goodsLeft">
              <p><img :src="ele.url" alt=""></p>
            </div>
            <div class="goodsRight">
              <p>商品名:{{ele.goodsName}}</p>
              <p>单价：{{ele.price}}(元)</p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      goodsList: [],
      listHeight: [], // 存放右边每一个li的高度
      scrollY: 0 // 实时滚动的y轴大小，利用better-scroll的onScroll事件监听这个值
    }
  },
  created () {
    this.initData()
  },
  computed: {
    // 利用vue中的计算属性computed实时计算，对listHeight遍历，返回当前的左边mune-wrapper的li
    // 对应的index，从而让其显示高亮的属性.current
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        // 当遍历到listHeight最后一个元素的时候，height2的值为undefined,如果是
        // 最后一个元素的话!height2为真，后面就不需要判断
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      // 默认情况下是返回第一个元素
      return 0
    }
  },
  methods: {
    initData () {
      this.$http({
        method: 'post',
        url: '/goodsList',
        data: {
          name: '1212'
        }
      }).then((data) => {
        this.goodsList = data.data.data.resultList
        this.$nextTick(() => {
          // 实例化better-scroll
          this.initScroll()
          // 计算右边.foods-wrapper的每个li的累加的高度，存放在listHeight中
          this._calculateHeight()
        })
        // console.log(data.data.data.resultList)
      }).catch((data) => {
        console.log(data)
      })
    },
    initScroll () {
      // 初始化需要滚动的对象
      // this.menuScroll = new BScroll(this.$refs.menuWrapper, {
      //   click: true
      // })
      this.goodsScroll = new BScroll(this.$refs.innerlist, {
        click: true,
        scrollY: true,
        probeType: 3 // 设置实时监听滚动的位置的效果的属性
      })
      // 监听右侧滚动区域，左边相应的menu高亮
      // 监听滚动事件scroll，实时改变this.scrollY的值
      // pos是元素所处的位置，内部自动传的
      this.goodsScroll.on('scroll', (pos) => {
        // scrollY是自定义的变量，用于存储滚动的位置
        // Math.round(pos.y)是一个负数
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y))
        }
      })
    },
    // 点击左边的menu，跳到右边相应的li
    selectMenu (index, event) {
      // 浏览器的事件对象是没有_constructed属性，当是浏览器触发的时候就return
      // 而用better-scroll自定义的事件触发的时候有这个属性，为true
      // 用这个属性，就是避免在浏览器点击的时候，触发两次点击的效果
      // console.log(index)
      // if (!event._constructed) {
      //   return
      // }
      // console.log(index)
      // 点击左侧的菜单项的时候，右边跳到相应的内容区域
      let goodList = this.$refs.goodList // 获取到右边li对象
      let el = goodList[index]// 根据index，获取到右边具体滚动到的li
      this.goodsScroll.scrollToElement(el, 300)// 要滑动到右边的对象，300完成动作的时间
    },
    _calculateHeight () {
      let goodList = this.$refs.goodList // 获取到所有的ref='goodList'的DOM元素
      let height = 0
      this.listHeight.push(height) // 第一个元素的高度是0
      for (let i = 0; i < goodList.length; i++) {
        let item = goodList[i]
        height += item.clientHeight// 通过原生DOM中的js获取到li的高度，并且累加
        this.listHeight.push(height)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.current{
  color:red;
}
.leftBar{
float: left;
width: 30%;
height: 100%;
box-sizing: border-box;
border: 1px solid #ccc;
border-bottom: none;
ul{
  li{
    list-style: none;
    line-height: 5rem;
    font-size: 1.6rem;
    text-align: center;
    border-bottom:1px solid #ccc;
  }
}
}
.wraper{
  float: left;
  width: 70%;
  height: 66.7rem;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #ccc;
  // background: #ccc;
  position: relative;
}
.inner{
  width: 100%;
  position: absolute;
  left:0;
  top:0;
  padding-bottom: 20rem;
  // overflow: hidden;
  // overflow: scroll;
}
.kinds > li > p{
  background: #ccc;
  line-height: 3rem;
  font-size: 1.6rem;
  border-top: 1px solid #ccc;
}
.goods > li{
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}
.goodsLeft{
  float: left;
  width: 30%;
  height: 8rem;
  box-sizing: border-box;
  img{
    width: 8rem;
    height: 8rem;
  }
}
.goodsRight{
  float: left;
  width: 70%;
  height: 8rem;
  padding-top: 2rem;
  border-left:1px solid #ccc;
  box-sizing: border-box;
  p{
  font-size: 1.2rem;
  line-height: 2rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  }
}
</style>
