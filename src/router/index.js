import { createRouter, createWebHistory } from 'vue-router'
import step1 from '../pages/registration/step1.vue'
import PageAir5 from '../pages/PageAir5.vue'
import PageAir12 from '../pages/PageAir12.vue'
import PageAir16 from '../pages/PageAir16.vue'

const routes = [
   { path: '/', redirect: '/step1' },
   { path: '/step1', component: step1 },
   { path: '/PageAir5', component: PageAir5 },
   { path: '/PageAir12', component: PageAir12 },
   { path: '/PageAir16', component: PageAir16 },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router