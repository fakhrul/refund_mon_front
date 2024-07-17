const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false,
    },
  
  },
  transpileDependencies: [
    '@coreui/utils'
  ],
  
  // use this option for production linking
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue/demo/3.1.0' : '/'

}
