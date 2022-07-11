<template>
  <div class="book">
    <div class="header">
      <div class="left">
        <el-image :src="bookDetail.imgUrl"></el-image>
      </div>

      <div class="right">
        <h3>{{bookDetail.title}}</h3>
        <h4>{{bookDetail.slogan}}</h4>
        <h5>
          <label>作者是：<span>{{bookDetail.author}}</span></label>
          <label>出版社：<span>{{bookDetail.bookConcern}}</span></label>
          <label>出版日期：<span>{{bookDetail.publishDate}}</span></label>
        </h5>
        <p>
          <label>￥{{Number(bookDetail.price * bookDetail.discount).toFixed(2)}}</label>
          <label>[{{filterCount(bookDetail.discount)}}折]</label>
          <span>定价[<strong>￥{{Number(bookDetail.price).toFixed(2)}}</strong>]</span>
        </p>
      </div>
    </div>

    <div class="button-btn">
      <el-input-number v-model="num" :min="1" />
      <el-button type="warning" @click="addCart()">加入购物车</el-button>
    </div>
    <div class="tab">
      <p v-for="val in tabList" :key="val.id" @click="Tab(val.id)" :class="{default : val.id == tabId}">
        {{val.tabName}}
      </p>
    </div>
    <div>
      <BookInfo v-if="tabId == 1" :detail='message'></BookInfo>
      <BookCommit v-if="tabId == 2"></BookCommit>
      <BookReplay v-if="tabId == 3"></BookReplay>
    </div>
    

  </div>
</template>

<script>
import BookInfo from '@/components/book/Bookinfo.vue'
import BookCommit from '@/components/book/BookCommit.vue';
import BookReplay from '@/components/book/BookReplay.vue';
import {mapActions}from 'vuex';
export default {
  name: 'Book',
  props: ['detail'],
  components: {
   BookInfo , BookCommit, BookReplay
  },
  data () {
    return {
      bookDetail: [],
      tabList: [
        { id: 1, tabName: '图书介绍' },
        { id: 2, tabName: '图书评论' },
        { id: 3, tabName: '图书回答' }
      ],
      num: 1,
      tabId: 1,
      message: '',
    }
  },
  methods: {
    ...mapActions('cart' , ['addproToCart']),
    Tab (tabId) {
      this.tabId = tabId;
    },

    //添加购物车
    addCart(){
        let disprice = (this.bookDetail.price * this.bookDetail.discount).toFixed(2);
        //购买数量
        let quantity = Number(this.num);
        let newItem = {
          ...this.bookDetail,
          disprice,
          quantity,
        }
        this.addproToCart( newItem);
        this.$router.push('/cart');      
    }
  },
  computed: {
    //打折过滤
    filterCount () {
      return (val) => {
        if (val * 100 / 10 == 0) {
          return val * 100;
        } else {
          return val * 10;
        }

      };
    }
  },

  mounted () { },
  created () {

    //拿到书本的bookid值
    let bookid = this.$route.query.bookid;
    //发起请求
    this.axios.get(`/book/${bookid}`).then((res) => {
      if (res.status === 200) {
        this.bookDetail = res.data;
        this.message = this.bookDetail.detail;
      }
    }).catch((error) => {
      console.log(error);
    });
     localStorage.setItem("path", `${this.$route.path}?bookid=${bookid}`);
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
.book {
  width: 100%;
}

.default {
  background-color: white !important;
  color: black !important;
  border: 1px solid gray;
}

.header {
  display: flex;
  margin-top: 15px;
}

.header .left {
  width: 20%;
  height: 200px;
}

.header .left .el-image{
  width: 60%;
  height: 90%;
  margin: 5% 20%;
}

.header .right {
  width: 78%;
  height: 200px;
  margin: 0 1%;
  border-radius: 8px;
  background-color: rgb(217, 222, 255);
}

.header .right h3,
h4,
h5,
p {
  font-weight: normal;
  font-size: initial;
  font-style: initial;
  margin: 20px 20px;
}

.header .right h3 {
  color: white;
  font-weight: bold;
}

.header .right h4 {
  color: white;
  font-size: 13px;
}

.header .right h5 label {
  color: white;
  font-size: 13px;
  margin-right: 10px;
}

.header .right h5 label span {
  color: rgb(250, 185, 126);
}

.header .right p label:first-child {
  color: rgb(251, 175, 76);
  font-weight: bold;
}

.header .right p :nth-child(2) {
  color: rgb(251, 175, 76);
  font-size: 13px;
  margin-left: 20px;
}

.header .right p span {
  color: white;
  margin-left: 20px;
  font-size: 13px;
}

.header .right p span strong {
  font-weight: normal;
  text-decoration: line-through;
}

.button-btn {
  height: 60px;
  line-height: 60px;
  margin-top: 20px;
  text-align: right;
}

.el-input-number {
  width: 150px;
  margin-right: 20px;
}

.el-button {
  margin-right: 150px;
}

.tab {
  display: flex;
}

.tab p {
  width: 130px;
  margin-right: 1px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: white;
  cursor: pointer;
  background-color: rgb(217, 222, 255);
}
</style>
