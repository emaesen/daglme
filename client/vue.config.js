module.exports = {
  //https://cli.vuejs.org/config/
  productionSourceMap: false,
  //https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwaage/@vue/cli-plugin-pwa/v/3.0.0-rc.1
  pwa: {
    name: "Daily Global Meditation",
    themeColor: "#ffffff",
    msTileColor: "#000000",
    iconPaths: {
      favicon32: "img/icon-32x32.png",
      favicon16: "img/icon-16x16.png",
      appleTouchIcon: "img/icon-152x152.png",
      maskIcon: "img/icon.svg",
      msTileImage: "img/icon-144x144.png"
    },
    //https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    workboxOptions: {
      importWorkboxFrom: "local",
      importScripts: ["sw-customconfig.js"],
      navigateFallback: "/index.html",
      navigateFallbackBlacklist: [/img\/media/],
      exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/,/img\/media/,/img\/icons/,/img\/video/,/^google/,/^robots/,/^sitemap/],
      runtimeCaching: [{
        urlPattern: /media/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'media-cache'
        }
      },{
        urlPattern: /video/,
        handler: 'cacheFirst',
        options: {
          cacheName: 'video-cache'
        }
      }]
    }
  }
};
