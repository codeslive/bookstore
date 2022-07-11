<template>
  <div class="home">
    <div class="home-top">
      <!-- 测导航 -->
      <HomeCategory></HomeCategory>
      <!-- 中部轮播 -->
      <HomeSwiper></HomeSwiper>
      <!-- 热门推荐 -->
      <HomeHot></HomeHot>
    </div>
    <!-- 首页新书展示 -->
    <div class="home-bottom">
				<newBook></newBook>
    </div>
  </div>
</template>

<script>
//引用子组件
import HomeCategory from '../components/home/HomeCategory.vue';
import HomeSwiper from '../components/home/HomeSwiper.vue';
import newBook from '../components/book/newBook.vue';
import HomeHot from '../components/home/HomeHot.vue';

// const HomeCategory = () => import('@/components/home/HomeCategory.vue');
// const HomeSwiper = () => import('@/components/home/HomeSwiper.vue');
// const newBook = () => import('@/components/book/newBook.vue');
// const HomeHot = () => import('@/components/home/HomeHot.vue');
export default {
  components: {
    HomeCategory, HomeSwiper, HomeHot,newBook
  },
  name: 'Home',
  created(){
    localStorage.setItem("path", this.$route.path);
  }

}
</script>
<style scoped>
.home {
  width: 100%;
  overflow: hidden;
}

.home-top {
  width: 100%;
  height: 300px;
  display: flex;
}


</style>
