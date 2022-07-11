<template>
  <div class="hot">
    <h5><i class="iconfont">&#xe62a;</i>热门推荐<i class="iconfont">&#xe603;</i></h5>
    <aside v-for="item in hotList" :key="item.id">
      <el-tooltip class="box-item" effect="dark" :content="countPrice" placement="top-start">
        <p @mousemove="getCount(item.price , item.discount)"><i class="iconfont">&#xe603;</i>{{item.title}}</p>
      </el-tooltip>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'HomeHot',
  data () {
    return {
      hotList: [],
      countPrice: "",//折合后的价格
    }
  },
  methods: {
    //计算书本折合后的价格
    getCount (price, discount) {
      this.countPrice = `折合后的价格为${(price * discount).toFixed(2)}元`
    }
  },
  mounted () { },
  created () {
    this.axios.get(`/book/hot`).then((res) => {
      if (res.status === 200) {
        this.hotList = res.data;
      }
    }).catch((error) => {
      console.log(error);
    });
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

.hot {
  width: 20%;
  height: 100%;
  border: 1px solid gainsboro;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}

.hot h5 {
  text-align: center;
  font-size: 17px;
  margin-top: 20px;
  color: rgb(160, 146, 197);
}

.hot p {
  cursor: pointer;
  text-align: center;
  margin-top: 35px;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
