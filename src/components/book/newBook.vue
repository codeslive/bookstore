<template>
  <div class="newBook">
    <aside>
      <span><i class="iconfont">&#xe62a;</i></span>
      <label>新书上市</label>
      <span><i class="iconfont">&#xe62a;</i></span>
    </aside>
    <!-- 容器 -->
    <div class="swiper books">
      <!-- 轮播动画效果主区域 -->
      <ul class="swiper-wrapper">
        <li class="swiper-slide" v-for="item in newBook" :key="item.id" @click="goBook(item.id)">
          <el-image :src="item.bigImgUrl" class="imgs"></el-image>
          <h5>{{item.title}}</h5>
          <p><label>￥{{(item.price * item.discount).toFixed(2)}}</label><em>￥{{item.price}}</em></p>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>
import Swiper, {
  Autoplay,
} from 'swiper';
//使用组件
Swiper.use([Autoplay])
export default {
  name: 'newBook',
  data () {
    return {
      newBook: []
    }
  },
  methods: {
    goBook (bookid) {
      this.$router.push({
        path: `/book`,
        query: {
          bookid: bookid
        }

      });
    }
  },


  updated () {
    new Swiper('.books', {
      slidesPerView: 3,
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false
      }
    })
  },

  created () {
    this.axios.get(`/book/new`).then((res) => {
      if (res.status === 200) {
        this.newBook = res.data;
      }
    }).catch((error) => {
      console.log(error);
    });

    localStorage.setItem("path", this.$route.path);
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

.newBook {
  width: 100%;
  height: 410px;
  border: 1px dotted deepskyblue;
  background-color: rgb(217, 222, 255);
}

.newBook aside {
  text-align: center;
  height: 45px;
  line-height: 45px;
  color: white;
}

.imgs {
  width: 80%;
  margin: 5% auto;
  height: 220px;
}

.newBook aside label {
  display: inline-block;
  margin: 0 15px;
  font-weight: bold;
}
.books {
  width: 100%;
  height: 100%;
  text-align: center;
}

.books ul li {
  width: 25%;
  height: 345px;
  background-color: white;
  border: 1px solid whitesmoke;
  border-radius: 5px;
  margin: 0 20px;
}

.books ul li h5 {
  font-style: initial;
  font-size: 17px;
  color: rgb(179, 181, 195);
}

.books ul li p {
  margin: 10px 0;
}

.books ul li p label {
  font-weight: bold;
  color: rgb(141, 141, 141);
  font-size: 15px;
}

.books ul li p em {
  font-style: initial;
  color: rgb(217, 217, 217);
  font-size: 15px;
  margin: 0 15px;
  text-decoration: line-through;
}
</style>
