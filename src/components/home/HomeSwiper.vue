<template>
  <div class="banner">
    <!-- 容器 -->
    <div class="swiper banner1">
      <!-- 轮播动画效果主区域 -->
      <ul class="swiper-wrapper">
        <!-- 轮播项 -->
        <li class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
          <img :src="item" >
        </li>

      </ul>
      <!-- 左右按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
//导入swiper插件以及应用的组件
import Swiper, { Autoplay, Navigation } from 'swiper';
//使用组件
Swiper.use([Autoplay, Navigation])
export default {
  name: 'HomeSwiper',
  data () {
    return {
      bannerList: [
        'https://images8.alphacoders.com/650/thumb-1920-650784.jpg',
        'https://images8.alphacoders.com/858/thumb-1920-858545.jpg',
        'https://images2.alphacoders.com/261/thumb-1920-26102.jpg',
        'https://images4.alphacoders.com/985/thumb-1920-985813.jpg',
        'https://images7.alphacoders.com/317/thumb-1920-317187.jpg',
        'https://images6.alphacoders.com/346/thumbbig-346199.webp',
        'https://images.alphacoders.com/915/thumb-1920-915703.jpg',
        'https://images3.alphacoders.com/653/thumb-1920-653028.jpg',
        'https://images8.alphacoders.com/652/thumb-1920-652875.jpg',
        'https://images3.alphacoders.com/902/thumb-1920-902510.jpg',
        'https://images3.alphacoders.com/167/167539.jpg',
        'https://images2.alphacoders.com/500/thumb-1920-500774.jpg',
        'https://images3.alphacoders.com/261/thumb-1920-26105.jpg'
      ]
    }
  },
  methods: {
      
  },
  mounted () {
    new Swiper('.banner1', {
      loop:true,
      //自动轮播
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false

      },
       navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

    })
  },



  created () {

  }
}
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.banner {
  width: 60%;
  height: 100%;
}

.banner ul li img {
  width: 100%;
  height: 300px;
}
</style>
