 
module.exports = { 
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false, 
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
      }
    }
  }
} 