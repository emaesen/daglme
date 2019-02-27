module.exports = {
  //https://cli.vuejs.org/config/
  //https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwaage/@vue/cli-plugin-pwa/v/3.0.0-rc.1
  // ...other vue-cli plugin options...
  pwa: {
    name: "Daily Global Meditation",
    themeColor: "#ffffff",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-icon-152x152.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/ms-icon-144x144.png"
    },
    workboxOptions: {
      navigateFallback: "/index.html"
    }
  }
};
