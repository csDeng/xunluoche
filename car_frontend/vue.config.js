const path = require('path')

function resolve(dir){
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath:'./',
    lintOnSave:true,
    devServer: {
        open:true
    },
    // webpack 打包顺序
    chainWebpack:(config)=>{
        config.resolve.alias
            .set('@',resolve('src/components'))
            .set('~', resolve('src'))
        config.module
        .rule('swf')
        .test(/\.swf$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
            limit:10000
        }) 
    },
    configureWebpack: (config) => {
        config.resolve.modules[0] = path.resolve(__dirname, 'node_modules');
        config.resolve.modules[1] = 'node_modules';  
    },
    devServer: {
        proxy:{
          '/api': {
            target: 'http://47.106.21.200:50004',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
              '^/api':''
            }
          }
        }
      }
    
}