import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import AddrList from '../pages/shop-address/list'
import AddrAdd from '../pages/shop-address/addOrUpdate'
import Order from '../pages/shop-order/list'
import OrderConfirm from '../pages/shop-order/confirm'
import Cart from '../pages/shop-cart/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import lingshifenleiList from '../pages/lingshifenlei/list'
import lingshifenleiDetail from '../pages/lingshifenlei/detail'
import lingshifenleiAdd from '../pages/lingshifenlei/add'
import lingshixinxiList from '../pages/lingshixinxi/list'
import lingshixinxiDetail from '../pages/lingshixinxi/detail'
import lingshixinxiAdd from '../pages/lingshixinxi/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import discusslingshixinxiList from '../pages/discusslingshixinxi/list'
import discusslingshixinxiDetail from '../pages/discusslingshixinxi/detail'
import discusslingshixinxiAdd from '../pages/discusslingshixinxi/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
                {
                    path: 'shop-address/list',
                    component: AddrList
                },
                {
                    path: 'shop-address/addOrUpdate',
                    component: AddrAdd
                },
				{
					path: 'shop-order/order',
					component: Order
				},
				{
					path: 'cart',
					component: Cart
				},
				{
					path: 'shop-order/orderConfirm',
					component: OrderConfirm
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'lingshifenlei',
					component: lingshifenleiList
				},
				{
					path: 'lingshifenleiDetail',
					component: lingshifenleiDetail
				},
				{
					path: 'lingshifenleiAdd',
					component: lingshifenleiAdd
				},
				{
					path: 'lingshixinxi',
					component: lingshixinxiList
				},
				{
					path: 'lingshixinxiDetail',
					component: lingshixinxiDetail
				},
				{
					path: 'lingshixinxiAdd',
					component: lingshixinxiAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'discusslingshixinxi',
					component: discusslingshixinxiList
				},
				{
					path: 'discusslingshixinxiDetail',
					component: discusslingshixinxiDetail
				},
				{
					path: 'discusslingshixinxiAdd',
					component: discusslingshixinxiAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
