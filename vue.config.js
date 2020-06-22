module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/config/elementui-style-config.scss";`
      }
    }
  }
};
