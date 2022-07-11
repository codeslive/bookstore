<template>
  <div class="headerv">
    <!-- 图片 -->
    <el-image src="logo.png" alt="" @click="goHome()" lazy></el-image>
    <!-- 搜索框 -->
    <HeadervSearch></HeadervSearch>
    <!-- 购物车 -->
    <HeaderCart></HeaderCart>
    <!-- 登录 -->
    <span v-show="show"
      >你好，请<router-link to="/UserLogin">登录</router-link>
      <router-link to="/UserRegister">免费注册</router-link>
    </span>
    <span v-show="!show"
      >欢迎&nbsp;<i>{{ username }}</i
      >&nbsp;来到书城！<em @click="exit()">退出登录</em></span
    >
  </div>
</template>

<script>
//引入
import HeadervSearch from "./HeadervSearch.vue";
import HeaderCart from "./HeaderCart.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Headerv",
  components: {
    HeadervSearch,
    HeaderCart,
  },
  data() {
    return {
      uname: "",
    };
  },

  methods: {
    goHome() {
      this.$router.push({
        path: "/",
      });
    },

    ...mapMutations("user", ["clearName"]),
    ...mapMutations("user", ["Shows"]),
    ...mapMutations("user", ["getUser"]),
    //退出登录
    exit() {
      let uname = "";
      this.clearName(uname);
      this.Shows(true);
      this.getUser("");
      let path = localStorage.getItem("path");
      this.$router.push(`${path}`);
    },
  },

  computed: {
    // 读取cart.state
    ...mapState("user", ["username"]),
    ...mapState("user", ["show"]),
    getNames() {
      return this.username;
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  display: inline-block;
  margin: 0 5px;
  color: deepskyblue;
}

.headerv {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 15px;
  border: 1px dotted dodgerblue;
}

.headerv .el-image {
  width: 200px;
  height: 60px;
}

.headerv em {
  display: inline-block;
  cursor: pointer;
  color: gold;
  width: 80px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-style: initial;
  border: 1px solid gold;
  border-radius: 5px;
}

.headerv i {
  color: rgb(83, 99, 202);
  font-style: initial;
}

span {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
