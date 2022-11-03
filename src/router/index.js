import { createRouter, createWebHashHistory } from 'vue-router'
import Menu from "../views/Menu.vue"
import Recepcao from "../views/Recepcao.vue"
import Baixa from "../views/Baixa.vue"

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/recepcao',
    name: 'Recepcao',
    component: Recepcao
  },
  {
    path: '/baixa',
    name: 'Baixa',
    component: Baixa
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
