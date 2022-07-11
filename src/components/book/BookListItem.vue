<template>
    <div>
    <div class="book">
          <div class="img" @click="goBook(item.id)">
            <el-image :src="item.imgUrl"></el-image>
          </div>
          <div class="right">
              <h3>{{item.title}}</h3>
              <p><label>￥{{(item.price * item.discount).toFixed(2)}}</label><span>定价：<em>{{item.price}}</em></span></p>
              <h6><span>{{item.author}}</span>/<span>{{item.publishDate}}</span>/<span>{{item.bookConcern}}</span></h6>
              <aside>{{item.brief}}</aside>
               <button @click="addCart(item)">加入购物车</button>
          </div>
         
    </div>
    </div>

</template>

<script>
import {mapActions} from 'vuex';
export default {
  name:  'BookListItem',
  props:{
    item:{
        type:Object,
        default:()=>{}
      
    }
  },
  data () {
    return {
        
    }
  },
  methods: {
    //2.调用vuex.cart.actions.addproToCart
    ...mapActions( 'cart' , ['addproToCart']),
    goBook(bookid){
      this.$router.push({
          path: `/book`,
          query:{
            bookid:bookid
          }

      });
    },

    
    //将需要给购物车的数据打包传递;2.跳转到购物车
    addCart(){
        // console.log(item);
        //1.计算出折扣价
        let disprice = (this.item.price * this.item.discount).toFixed(2);
        //设置购买数量
        let quantity = 1;
        //1.3打包数据
        let newItem = {
          ...this.item,
          disprice,
          quantity,
        }
        //1.4将打包好的数据传递给actions.addproToCart
        this.addproToCart( newItem );
        //1.5跳转到购物车
        this.$router.push('/cart')

        
        
    }
  },
  mounted () {},
  created () {}
  }
</script>

<style scoped>

/* 全局样式 */
*{
 margin: 0;
 padding: 0;
 list-style: none;
}


.book {
  display: flex;
  height: 300px;
  width: 100%;
  border-bottom: 1px dotted rgb(149, 203, 255);
}

.img {
  width: 20%;
  height: 100%;
}

.img .el-image {
  width: 50%;
  height: 80%;
  margin: 10% 25%;
}

.right {
  width: 50%;
  height: 280px;
}

.right h3 {
  margin-top: 55px;
  margin-bottom: 10px;
  color: rgb(150, 143, 163);
}

.right p {
  margin: 10px 0;
}

.right p label {
  color: gold;
  font-weight: bold;
}

.right p span {
  color: black;
  display: inline-block;
  margin-left: 15px;
}

.right p span em {
  text-decoration: line-through;
  color: rgb(217, 217, 217);
}

.right h6 {
  margin: 10px 0;
  font-style: initial;
  color: rgb(217, 217, 217);
}

.right h6 span {
  display: inline-block;
  margin: 0 10px;
}

.right aside {
  color: rgb(217, 217, 217);
  font-size: 15px;
}
.right button {
  width: 130px;
  height: 35px;
  color: white;
  background-color: gold;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
