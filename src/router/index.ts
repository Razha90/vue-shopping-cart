import { createRouter, createWebHistory } from 'vue-router'
import Product from '../views/product/IndexProduct.vue'
import ProductDetail from '../views/product/DetailProduct.vue'
import Cart from '../views/cart/IndexCart.vue'
import NotFound from '../views/errors/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product',
      component: Product
    },
    {
      path:'/product/:id',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
