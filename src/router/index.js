import { createRouter, createWebHistory } from 'vue-router'
import step1 from '@/pages/registration/step1.vue'
import step2 from '@/pages/registration/step2.vue'
import step3 from '@/pages/registration/step3.vue'
import step4 from '@/pages/registration/step4.vue'

const routes = [
   { path: '/', redirect: '/step1' },
   { path: '/step1', component: step1 },
   { path: '/step2', component: step2 },
   { path: '/step3', component: step3 },
   { path: '/step4', component: step4 },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router