import { createRouter, createWebHistory , createWebHashHistory} from "vue-router";
//引入页面组件
// import Home from '@/views/Home.vue';
// import Books from '../views/Books.vue';
// import Book from '../views/Book.vue';
// import ShopingCart from '../views/ShopingCart.vue';
// import Pay from '../views/Pay.vue';
// import newBook from '../components/book/newBook.vue';
// import UserLogin from '../components/user/UserLogin.vue';
// import UserRegister from '../components/user/UserRegister.vue';

const Home = () => import('@/views/Home.vue');
const Book = () => import('@/views/Book.vue');
const Books = () => import('@/views/Books.vue');
const ShopingCart = () => import('@/views/ShopingCart.vue');
const Pay = () => import('@/views/Pay.vue');
const newBook = () => import('@/components/book/newBook.vue');
const UserLogin = () => import('@/components/user/UserLogin.vue');
const UserRegister = () => import('@/components/user/UserRegister.vue');

import store from '@/store';



const routes = [
	{
		//路径
		path:'/',
		//命名路由
		name:'Home',
		//调用的页面组件
		component:Home
	},

	{
		path:'/newBook',
		name:'newBook',
		component:newBook
	},
	{
		path:'/cart',
		name:'cart',
		meta:{
			goPath:true
		},
		component:ShopingCart
	},

	{
		path:'/pay',
		name:'Pay',
		meta:{
			goPath:true
		},
		component:Pay
	},


	{
		path:'/UserLogin',
		name:'UserLogin',
		component:UserLogin
	},

	{
		path:'/UserLogin',
		redirect:'/UserLogin',
	},

	{
		path:'/UserRegister',
		name:'UserRegister',
		component:UserRegister
	},

	//搜索
	{
		path : '/search',
		name : 'search',
		meta:{
			title:'搜索的结果'
		},
		component : Books
	},


	//分类商品
	{	
		path : '/category/:id',
		name : 'category',
		component : Books
	},

	{	
		path : '/book',
		name : 'Book',
		component : Book
	},

];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to , from , next)=>{
		if(to.matched.some(record=>record.meta.goPath)){
				if(store.state.user.user){	
					next();
					console.log(123);
				}else{
					next({
						path:'/UserLogin',
						query:{redirect : to.fullPath}
					})
				}
		}else{
			next();
			console.log(456);
			
		}
})









export default router;
