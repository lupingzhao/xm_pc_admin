export interface User {
  avatar: string,
  regiter_time: string,
  username: string,
  _id: string,
}

interface Icons {
  icon: string,
  name: string,
  child?: Icons[],
  path?: string,
  t?: string
}
// 转换大小写
import { toLine } from '../utils/toLine/index'
export const iconsNav: Icons[] = [
  {
    name: '首页',
    child: [],
    t: 'home page',
    path: '/',
    icon: "el-icon-home-filled"
  },
  {
    icon: 'el-icon-picture',
    name: '轮播图管理',
    child: [],
    path: '/Carousel',
    t: 'Carousel map management',
  },
  {
    name: '导航管理',
    child: [],
    path: '/Navigation',
    t: 'Navigation management',
    icon: 'el-icon-medal'
  },
  {
    icon: 'el-icon-message',
    name: '推荐导航',
    child: [],
    path: '/RecommendNav',
    t: 'Recommended navigation',
  },
  {
    icon: 'el-icon-user',
    name: '用户管理',
    child: [],
    path: '/user',
    t: 'user management',
  },
  {
    icon: 'el-icon-folder-opened',
    name: '商品管理',
    t: 'Commodity management',
    path: '',
    child: [
      {
        icon: 'el-icon-circle-plus',
        name: '添加商品',
        path: '/AddGoods',
        t: 'Add goods',
      },
      {
        icon: 'el-icon-tickets',
        name: '商品分类',
        t: 'Commodity classification',
        path: '/Classification'
      },
      {
        icon: "el-icon-collection",
        name: '商品模型',
        t: 'Commodity model',
        path: '/GoodsModel',
      },
      {
        icon: 'el-icon-wallet',
        name: '商品规格',
        t: 'Commodity specifications',
        path: '/productSpecifications'
      },
      {
        icon: 'el-icon-cpu',
        name: '商品参数',
        t: 'Commodity parameters',
        path: '/ProductParameter',
      },
      {
        icon: "el-icon-crop",
        name: '规格参数',
        t: 'Specification parameters',
        path: '/Specifications'
      },
    ]
  },
  {
    icon: "el-icon-add-location",
    name: '秒杀管理',
    child: [],
    t: 'Second kill management',
    path: '/Seckill',
  },
  {
    icon: "el-icon-basketball",
    name: '优惠卷管理',
    child: [],
    t: 'Coupon management',
    path: '/Coupon'
  },
  {
    icon: "el-icon-calendar",
    name: '订单管理',
    t: 'Order management',
    child: [],
    path: '/Order',
  },
  {
    icon: "el-icon-alarm-clock",
    name: '通知管理',
    t: 'Notification management',
    child: [],
    path: '/Notice',
  },
  {
    icon: 'el-icon-chat-dot-round',
    name: '客服服务',
    t: 'Customer service',
    child: [],
    path: '/CustomerService',
  },
]
// 轮播图
export interface Carouse {
  isShow: boolean
  link: string
  title: string
  url: string
  _id: string
}

export interface OrderType {
  address: string
  count: string
  goods_list: any[]
  mobile: string
  pay_time: string
  price: string
  user_id: string
  _id: string
}
// 导航栏
export interface NavList {
  isShow: boolean
  title: string
  url: string
  _id: string
}
// 通知
export interface Notices {
  content: string
  isShow: boolean
  _id: string
}
// 优惠券
export interface Coupon {
  amount: string
  end_time: string
  isShow: boolean
  name: string
  number: string
  start_time: string
  threshold: string
  _id: string
}
// 秒杀
export interface Seckill {
  end_time: string
  goods: string
  goods_number: string
  isShow: false
  price: string
  start_time: string
  _id: string
}
// 用户
export interface User {
  avatar: string
  email: string
  mobile: string
  regiter_time: string
  status: boolean
  username: string
  _id: string
}
// 推荐
export interface RecommendNav {
  avatar: string
  email: string
  mobile: string
  regiter_time: string
  status: boolean
  username: string
  _id: string
}
// 模型
export interface GoodsModel {
  attribute: any
  name: string
  specifications: any
  _id: string
}
// 规格
export interface Spec {
  mode: string
  model: string[]
  name: string
  parentId: string[]
  spec_item: any
  _id: string
  checklist: string[]
  specitem: string[]
  checkAll?: boolean
}
// 商品参数
export interface Params {

}
// 商品
export interface Goods {
  category: string
  comment: string[]
  company: string
  cover: string
  create_time: string
  detail: string
  discount: string[]
  introduction: string
  isHot: true
  isNewGood: true
  isRecommend: true
  isShow: true
  name: string
  originalPrice: string
  params: Params[]
  pic: string[]
  presentPrice: string
  productionDesc: string[]
  sellDesc: string[]
  spec: string[]
  specParams: string
  stock: string
  video: string[]
  _id: string
}
// 规格参数
export interface SpecParams {

}
// 分类
export interface Category {
  isShow: boolean
  list: any
  name: string
  short_name: string
  _id: string
}
