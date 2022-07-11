//1.state状态
const state = {
  list: [],
  num: '', //购物车修改后的数量
  order: [],

}

//2.mutation：类似于methods[负责接收添加购物车数组的操作;实现购买数量增减;删除购物车数组的数据]
const mutations = {
  //2.1执行添加商品到购物车数组
  pushProToList(state, { id, imgUrl, title, disprice, quantity }) {
    //添加元素到数组内
    state.list.push({ id, imgUrl, title, disprice, quantity });
  },

  //2.2执行修改购买数量的函数
  increamItemQuantity(state, { id, quantity }) {
    let cartItem = state.list.find((val) => val.id == id);
    cartItem.quantity += Number(quantity + state.num);
    //1.找到需要修改数量的商品
  },

  //修改购物车的数量
  countNum(state, num) {
    state.num = num;
  },  

  //勾选去结算的数据
  orderPay(state, order) {
    state.order = order;
  },


  // 订单支付
  Pay(state, pay) {
    if (state.list == pay) {
      state.list = [];
    } else {
      for (let i in state.list) {
        for (let j in pay) {
          if (state.list[i].id == pay[j].id) {
            state.list.splice(i, 1);
          }
        }
      }
    }
  },

  //删除
  delA(state, index) {
    for (let i in state.list) {
      if (state.list[i].id == index) {
        state.list.splice(i, 1);
      }
    }
  },

}

//3.actions：对外负责对接组件的调用,对内负责调用相应的mutation函数
const actions = {
  //3.1接收从组件传递过来的需要添加或修改的商品数据[id+图片+名称+折扣价+购买数量+库存量]
  addproToCart({ state, commit }, { id, imgUrl, title, disprice, inventory, quantity }) {
    if (inventory > 0) {
      //数组.find(回调函数)
      let cartItem = state.list.find(val => val.id == id);
      //累加新的购买数量
      // cartItem.quantity+=quantity;
      //判断是否有查询结果
      if (!cartItem) {
        commit('pushProToList', { id, imgUrl, title, disprice, quantity });
        //购物车内没有商品,执行时添加数据操作

      } else {
        //商品已存在，执行的时累加购买数量
        commit('increamItemQuantity', { id, quantity });
      }

    }

  },


}

//4.getters：负责完成购物车内关于价格的自动计算操作
const getters = {

}


//5.导出且注册当前模块
export default {
  //注册模块使当前模块成为待命名的区域  vue.cart.xxx
  namespaced: true,
  state,
  mutations,
  actions,
  getters

}