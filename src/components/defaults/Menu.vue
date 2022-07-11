<template>
  <div class="menu">
    <span v-for="item in navList" :key="item.id"  @click="addClass(item.id)" :class="{default : item.id == id}">
      <router-link :to="item.link">{{item.title}}</router-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      //菜单栏
      navList: [
        { id: 0, title: "首页", link: '/' },
        { id: 1, title: "新书展示", link: '/newBook' },
        { id: 2, title: "购物车", link: '/cart' },
      ],
      id: 0,
    }
  },
  methods: {
    //点击样式加载
    addClass (id) {
      this.id = id;
    }
  },


  mounted () { },
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

a{
  text-decoration: none;
  display: inline-block;
  width: 100px;
}

.menu {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: white;
  text-align: center;
  background-color: rgb(217, 222, 255);
}
.menu span {
  display: inline-block;
  width: 100px;
  margin: 0 15px;
  cursor: pointer;
}

.default {
  color: rgb(217, 222, 255);
  background-color: white;
}
</style>
