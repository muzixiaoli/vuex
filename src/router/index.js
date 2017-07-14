import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/Goods.vue'
import Sellers from '../components/sellers/Sellers.vue'
import Ratings from '../components/ratings/Ratings.vue'
Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        component: Goods
    },
    {
        path: '/goods',
        component: Goods
    }, {
        path: '/sellers',
        component: Sellers
    }, {
        path: '/ratings',
        component: Ratings
    }],
    linkActiveClass: 'active'
})
