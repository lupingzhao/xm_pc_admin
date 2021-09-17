import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/Home.vue'
import Layout from '../views/layout/Layout.vue'



const routes: Array<RouteRecordRaw> = [
  // 登陆 注册
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登陆',
      index: '/Login',
    }
  },
  // 父路由
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
          title: '首页',
          index: '/',
        }
      },
      {
        path: '/Classification',
        name: 'Classification',
        component: () => import('../views/classification/Classification.vue'),
        meta: {
          title: '分类',
          index: '/Classification',
        }
      },
      {
        path: '/Navigation',
        component: () => import('../views/navigation/Navigation.vue'),
        meta: {
          title: '导航管理',
          index: '/Navigation',
        }

      },
      {
        path: '/Order',
        component: () => import('../views/order/Order.vue'),
        meta: {
          title: '订单管理',
          index: '/Order',
        }
      },
      {
        path: '/Specifications',
        component: () => import('../views/specifications/Specifications.vue'),
        meta: {
          title: '规格参数',
          index: '/Specifications'
        }
      },
      {
        path: '/CustomerService',
        component: () => import('../views/customerService/CustomerService.vue'),
        meta: {
          title: '客服服务',
          index: '/CustomerService'
        }
      },
      {
        path: '/Carousel',
        component: () => import('../views/carousel/Carousel.vue'),
        meta: {
          title: '轮播图管理',
          index: '/Carousel'
        }
      },
      {
        path: '/Seckill',
        component: () => import('../views/seckill/Seckill.vue'),
        meta: {
          title: '秒杀管理',
          index: '/Seckill'
        }
      },
      {
        path: '/ProductParameter',
        component: () => import('../views//productParameter/ProductParameter.vue'),
        meta: {
          title: '商品参数',
          index: '/ProductParameter'
        }
      },
      {
        path: '/productSpecifications',
        component: () => import('../views/productSpecifications/ProductSpecifications.vue'),
        meta: {
          title: '商品规格',
          index: '/productSpecifications'
        }
      },
      {
        path: '/GoodsModel',
        component: () => import('../views/goodsModel/GoodsModel.vue'),
        meta: {
          title: '商品模型',
          index: "/GoodsModel"
        }
      },
      {
        path: '/AddGoods',
        component: () => import('../views/addGoods/AddGoods.vue'),
        meta: {
          title: '添加商品',
          index: "/AddGoods"
        }
      },
      {
        path: '/Notice',
        component: () => import('../views/notice/Notice.vue'),
        meta: {
          title: '通知管理',
          index: "/Notice"
        }
      },
      {
        path: '/RecommendNav',
        component: () => import('../views/recommendNav/RecommendNav.vue'),
        meta: {
          title: '推荐导航',
          index: "/RecommendNav"
        }
      },
      {
        path: '/user',
        component: () => import('../views/user/User.vue'),
        meta: {
          title: '用户管理',
          index: "/user"
        }
      },
      {
        path: '/Coupon',
        component: () => import('../views//coupon/Coupon.vue'),
        meta: {
          title: '优惠券管理',
          index: "/Coupon"
        }
      },

    ]
  },
  // 404
  // 404路由
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404/404.vue'),
    meta: {
      title: '页面不存在',
      index: '/:catchAll(.*)',

    }
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  const token = localStorage.getItem('token')
  if (to.path === '/Login') {
    // console.log(22);
    next()
  } else {
    // console.log(11);
    token ? next() : next('/Login')
  }

})

export default router