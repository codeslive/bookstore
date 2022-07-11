<template>
  <div class="pay">
     <el-table :data="payList">
       <el-table-column label="图片">
            <template #default="scope">
                <el-image :src="scope.row.imgUrl"></el-image>
            </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="title"></el-table-column>
             <el-table-column label="单价" prop="disprice"></el-table-column>
              <el-table-column label="数量" prop="quantity"></el-table-column>
               <el-table-column label="金额" prop="disprice">
                  <template #default='scope'>
                      {{Number(scope.row.disprice * scope.row.quantity).toFixed(2)}}
                  </template>
               </el-table-column>
     </el-table>
     <div class="btn">
       <el-button type='primary' plain v-show="show">总价：{{countSum}}元</el-button>
       <el-button type='success' @click="pay()" v-show="show">付款</el-button>
       <el-button type='danger' plain v-show="!show" @click="goHome">已付款,点击返回首页</el-button>
       
     </div>
  </div>
</template>

<script>
import { mapState , mapMutations} from 'vuex';
export default {
  name:  'Pay',
  data () {
    return {
      payList:[],
      show:true,
      ms:10,
    }
  },
  methods: {
     ...mapMutations('cart', ['Pay']),
      pay(){
          this.Pay(this.payList);
          this.payList = [];
          this.countSum = 0;
          this.show = false;
          this.$message.success({
              message:'付款成功~'
          });

      },

      goHome(){
        this.$router.push('/');
      }
  },

  computed:{
    //读取cart.state
    ...mapState('cart', ['order']),
    //统计总价
    countSum(){
        let sum = 0;
        for(let i in this.order){
            sum+=Number(this.order[i].disprice) * this.order[i].quantity;
        }
        return sum.toFixed(2);
    }
  },
  mounted () {},
  created () {this.payList = this.order; }
  }
</script>

<style scoped>

/* 全局样式 */
*{
 margin: 0;
 padding: 0;
 list-style: none;
}

.el-image{
  width: 80px;
  height: 100px;
}

.btn{
  float: right;
  margin-right: 20%;
  margin-top: 20px;
  
}
</style>
