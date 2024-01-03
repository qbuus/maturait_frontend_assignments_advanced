import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import ProductPage from '../views/ProductPage.vue'
import MainVue from '../views/MainVue.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: HomePage,
    children: [
      { path: '', component: MainVue },
      {
        path: 'cart',
        component: CheckoutPage,
        name: 'cart'
      },
      { path: 'products', component: ProductPage, name: 'products' }
    ]
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory()
})

export default router
