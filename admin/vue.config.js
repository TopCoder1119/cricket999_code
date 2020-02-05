module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve:{
       symlinks: false
    }
  },
  outputDir: "../public_html/admin",
  publicPath:'./',
  assetsDir: './',
  devServer: {
    //proxy: 'http://35.181.127.170:3000/',
    //products: "http://35.181.127.170:3000/",
    proxy: {
      "*":{ "target" : "http://35.181.127.170:3000/"}
    }
  }
}
