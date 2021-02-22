const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'apk',
    themeColor: '#ef4a81',
    msTileColor: '#ef4a81',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#ef4a81'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
