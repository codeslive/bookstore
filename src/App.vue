<template>
  <div class="main">
    <div class="top">
      <!-- 头部组件 -->
      <Headerv></Headerv>

      <!-- 菜单组件 -->
      <Menu></Menu>
    </div>
    <router-view />

  </div>
  <!-- 底部为页面组件的渲染区域 -->
</template>

<script>
//引入公共组件
import Headerv from '@/components/defaults/Headerv.vue';
import Menu from '@/components/defaults/Menu.vue';
export default {
  components: {
    Headerv,
    Menu
  }
}
</script>


<style lang="stylus"></style>