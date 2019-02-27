import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Presenters from "./views/Presenters.vue";
import MarySaintMarie from "./views/presenters/MarySaintMarie.vue";
import AngeliqueJanPera from "./views/presenters/AngeliqueJanPera.vue";
import EdwardMaesen from "./views/presenters/EdwardMaesen.vue";
import EarthCareGlobalTV from "./views/presenters/EarthCareGlobalTV.vue";
import InSharedOneness from "./views/presenters/InSharedOneness.vue";
import Sponsors from "./views/presenters/Sponsors.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/presenters",
      component: Presenters,
      children: [
        {
          path: "mary-saint-marie",
          component: MarySaintMarie
        },
        {
          path: "angelique-jan-pera",
          component: AngeliqueJanPera
        },
        {
          path: "edward-maesen",
          component: EdwardMaesen
        },
        {
          path: "earthcare-global-tv",
          component: EarthCareGlobalTV
        },
        {
          path: "in-shared-oneness",
          component: InSharedOneness
        },
        {
          path: "",
          component: Sponsors
        }
      ]
    },
    {
      // catch all - show home page
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.hash) {
          resolve( {
            selector: to.hash
          } );
        } else if (savedPosition) {
          resolve( savedPosition );
        } else if (from.path.endsWith("/presenters") && to.path.startsWith("/presenters/")) {
          resolve( { x: 0, y: 0 } );
        } else if (from.path.startsWith("/presenters/") && to.path.endsWith("/presenters")) {
          resolve( { x: 0, y: 0 } );
        } else if (from.path.startsWith("/presenters") && to.path.startsWith("/presenters")) {
          resolve( {
            selector: null
          } );
        } else {
          resolve( { x: 0, y: 0 } );
        }
      }, 500)
    })
  }
});
