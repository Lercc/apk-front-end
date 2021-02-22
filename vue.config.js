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
    themeColor: '#221d4b',
    msTileColor: '#221d4b',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#221d4b'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
