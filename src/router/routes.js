
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'home', component: () => import('pages/Index.vue') },
      { path: 'symptoms', name:'symptoms', component: () => import('pages/symptoms.vue') },
      { path: 'selfprotection', name:'selfprotection', component: () => import('pages/selfprotection.vue') },
      { path: 'info', name:'info', component: () => import('pages/info.vue') }

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
