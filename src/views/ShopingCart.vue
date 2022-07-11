<template>
  <div class="cart">
    <table border="1" cellpadding="0" cellspacing="0">
      <tr>
        <th>全选<input type="checkbox" id="checkbox" v-model="checked" @change="checkedAll()"></th>
        <th>图片</th>
        <th>商品名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>金额</th>
        <th>操作</th>
      </tr>
      <tr v-for="item in list" :key="item.id">
        <td><input type="checkbox" id="checkone" :value="item" v-model="checkedNames"></td>
        <td>
          <el-image :src="item.imgUrl" lazy></el-image>
        </td>
        <td>{{item.title}}</td>
        <td>￥{{item.disprice}}</td>
        <td>
          <el-input-number v-model="item.quantity" :min="1" @change="handleChange" />
        </td>
        <td>￥{{Number(item.disprice * item.quantity).toFixed(2)}}</td>
        <td><input type="button" value="删除" @click="del(item.id)"></td>
      </tr>
      <tr>
        <td colspan="5">
          <span>总价￥{{countSumPrice}}</span>
          <span @click="goPay()">结算</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
export default {
  name: 'ShopingCart',
  data () {
    return {
      num: 1,
      checkedNames: [],
      checked: false,
      checkone: '',
      order: []
    }
  },

  watch: {
    //监听被勾选中数组的长度
    checkedNames () {
      //如果勾选中数组的长度与list数组的长度一致,全选框勾上,否则全选框不勾选
      if (this.checkedNames.length == this.list.length) {
        //list的长度不为0时才勾选
        if (this.list.length != 0) {
          this.checked = true;
          this.checkedNames = this.list;
        }
      } else {
        this.checked = false;
      }
    },

  },

  methods: {
    ...mapMutations('cart', ['delA']),
    del (index) {
      //把index值存进去
      this.delA(index);
      //当数组为空时,全选框不勾选
      if (this.list.length === 0) {
        this.checked = false;
      }
      //删除
      for (let i in this.checkedNames) {
        if (this.checkedNames[i].id == index) {
          this.checkedNames.splice(i, 1);
        }
      }
      //当勾选的长度与购物车数组长度一致时,全选框勾上
      if (this.checkedNames.length == this.list.length) {
        this.checked = true;
      } else {
        //否则不勾选
        this.checked = false;
      }
      //勾选长度为0时,全选框状态为false
      if (this.checkedNames.length === 0) {
        this.checked = false;
      }
    },

    ...mapMutations('cart', ['countNum']),
    //input Number数字框改变事件
    handleChange (newVlue, oldValue) {
      //把差值存进vuex
      this.countNum(newVlue - oldValue);
    },

    //结算
     ...mapMutations('cart', ['orderPay']),
    goPay () {
      if (this.checkedNames.length != 0) {
          if(this.checkedNames.length == this.list.length){
              this.orderPay(this.list);
          }else{
            this.orderPay(this.checkedNames);
          }
          this.$router.push('/pay');
      }
    },

    //全选框
    checkedAll () {
      //全选框被选中,把list数组里面的所有数据赋值给checkedNames数组,否则checkedNames = [];
      this.checked == true ? this.checkedNames = this.list : this.checkedNames = [];
    }
  },

  computed: {
    //读取cart.state
    ...mapState('cart', ['list']),
    ...mapGetters('cart', ['countSum']),

    countSumPrice () {
      let sumPrice = 0;
      for (let i in this.checkedNames) {
        sumPrice += this.checkedNames[i].disprice * this.checkedNames[i].quantity;
      }
      sumPrice = Number(sumPrice).toFixed(2);
      //没有勾选数据时,价格为0.00元
      if (this.list.length == 0) {
        sumPrice = `0.00`;
      }
      //返回计算总价
      return `${sumPrice}元`;
    }

  },

  mounted () { },
  created () { }
}
</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart table {
  width: 100%;
  background-color: rgb(225, 239, 255);
  text-align: center;
  margin-top: 5px;
  border: none;
}

.cart table th:first-child {
  width: 15%;
}

.cart table tr th {
  height: 35px;
  border: none;
}

.cart table tr td {
  border: none;
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
}

.cart table tr td,
.cart table tr th {
  border-right: 0;
  border-left: 0;
}

.cart table .el-image {
  height: 100px;
}

.cart table input[type="button"] {
  color: white;
  background-color: rgb(246, 108, 108);
  border: none;
  width: 50px;
  height: 25px;
  border-radius: 5px;
}

.cart table tr:last-child {
  height: 40px;
  line-height: 40px;
  text-align: right;
}

.cart table tr:last-child span:first-child {
  color: gray;
  display: inline-block;
  margin: 0 20px;
}

.cart table tr:last-child span:last-child {
  display: inline-block;
  height: 25px;
  width: 50px;
  line-height: 25px;
  background-color: rgb(63, 158, 254);
  text-align: center;
  color: white;
  border-radius: 5px;
  margin: 0 40px;
  cursor: pointer;
}
</style>
