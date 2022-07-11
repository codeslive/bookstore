<template>
  <div class="books">
    <!-- v-if为了保证父组件请求结束之后，在调用子组件 -->
    <BookList :list="books" v-if="books.length"></BookList>
    <!--调用加载工具 Loading.vue -->
    <Loading v-if="isshow"></Loading>
    <el-empty :description="description" v-show="message"></el-empty>
  </div>
</template>

<script>
import BookList from "../components/book/BookList.vue";
import Loading from "../components/book/Loading.vue";
export default {
  name: "Books",
  components: {
    Loading,
    BookList,
  },
  data() {
    return {
      booklist: [],
      isshow: true,
      books: [], //异步请求数据结果
      message: false, //搜索没有结果/分类没有数据的时候显示
      description: "",
    };
  },

  //路由守卫 在组件创建之后,进入指定路由之前,获取相关的基本信息
  beforeRouteEnter(to, from, next) {
    //不阻止当前操作进去到指定路由
    next((vm) => {
      //vm = this
      //将to属性中fullPth传递到另一个函数[执行判断当前需要获取的数据，返回一个完整的地址]
      // vm.setUrlResult(to.fullPath);
      let pathUrL = vm.setUrlResult(to.fullPath);
      vm.getBook(pathUrL);
    });
  },
  watch: {
    $route(to, from) {
      this.getBook(to.fullPath);
    },
  },

  methods: {
    setUrlResult(url) {
      let str = url;
      //判断传递过来的字符串中是否有字符"category"如果有,拼接分类的请求地址
      if (str.indexOf("category") != -1) {
        //查询成功,需要请求的数据是分类数据
        url = "/book" + str;
      }
      return url;
    },

    getBook(url) {
      this.axios
        .get(url)
        .then((res) => {
          if (res.status === 200) {
            this.isshow = false;
            this.books = res.data;
            //如果books的数据为空
            if (this.books.length === 0) {
              //判断是否属于搜索没结果还是分类没数据
              this.message = true;
              this.description = "没有该分类下的内容~";
            }
            if (res.data.data.length === 0) {
              this.message = true;
              this.description = "没有搜索到相关内容~";
              
            } else {
              this.books = res.data.data;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {},
  created() {},
};
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
