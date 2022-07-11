<template>
  <div class="search">
    <input type="search" placeholder="请输入关键词" v-model.lazy.trim="search_val" @keyup.enter="getBooks()" />
    <input type="button" value="搜索" @click="getBooks()" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: 'HeadervSearch',
  data () {
    return {
      search_val: "",
      pageSize: 100,
      pageNum: 100
    }
  },
  methods: {
    getBooks () {
      if (this.search_val != '') {


        //允许为空
        this.$router.push({
          path: '/search',
          query: {
            wd: this.search_val,
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
      }
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

.search {
  width: 30%;
  height: 30px;
  border: 1px solid #9393dc;
  border-radius: 6px;
  overflow: hidden;
}

.search input[type="search"] {
  width: 75%;
  line-height: 28px;
  border: none;
  text-indent: 1em;
  outline: none;
}

.search input[type="button"] {
  border: none;
  width: 25%;
  background-color: #d9deff;
  height: 30px;
  color: white;
}
</style>
