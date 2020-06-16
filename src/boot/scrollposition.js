import vueScrollBehavior from 'vue-scroll-behavior'
export default ({ Vue, router }) => {
  Vue.use(vueScrollBehavior, {
    router: router
  })
}
