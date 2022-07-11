//1.state状态
const state = {
    //接受用户数据
    user:'',
    username:'',
    show:true,
}

const mutations = {
    //存储用户注册数据
    getUser(state , user){
         state.user = user;     
    },

    //存入用户名
    getName(state , uname){
        state.username = uname;         
    },

    //存入布尔值,用于导航栏登录成功后的模板切换
    Shows(state , show){
        state.show = show;
    },

    //退出登录是清除vuex里的用户名
    clearName(state , uname){
        state.username = uname;
    },

    
}

const actions = {}

const getters = {}

//5.导出且注册当前模块
export default {
    //注册模块使当前模块成为待命名的区域  vue.cart.xxx
    namespaced: true,
    state,
    mutations,
    actions,
    getters

}