import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

import { scroll } from 'quasar'

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function({store}/* { store, ssrContext } */) {
  const Router = new VueRouter({
    //scrollBehavior: () => ({ x: 0, y: 0 }),
    scrollBehavior(to, from, savedPosition) {
     /*  Manipulating scrolling */
      if (store.state['Covid'].scroller != null) {
        if (to.name in store.state['Covid'].scroller) {
          let routeTo = to.name
          return store.state['Covid'].scroller[routeTo]
        }else{
          return { x: 0, y: 0 };
        }
      }else{
        return { x: 0, y: 0 };
      }
       /*  Manipulating scrolling */
    },

    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router;
}
