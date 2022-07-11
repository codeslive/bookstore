<template>
  <div class="headervCart">
    <button v-show="show">
      <router-link to="/cart">购物车0</router-link>
    </button>
    <button v-show="!show">
      <router-link to="/cart">购物车{{ list.length }}</router-link>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HeaderCart",
  data() {
    return {
      cartNum: 0,
    };
  },

  methods: {},

  computed: {
    ...mapState("cart", ["list"]),
    ...mapState("user", ["show"]),
  },
};
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.headervCart a {
  text-decoration: none;
  color: white;
}

.headervCart button {
  border: none;
  width: 140px;
  background-color: #d9deff;
  border-radius: 7px;
  height: 30px;
  color: white;
}
</style>
