import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
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
      component: About,
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
    if (from.path.startsWith("/about") && to.path.startsWith("/about")) {
      return null;
    } else if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
