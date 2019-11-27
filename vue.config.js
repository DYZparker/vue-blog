module.exports = {
    devServer: {
        port: 8080,
        host: "localhost",
        https: false,
        open: true,
        proxy: "http://localhost:9000",
        // proxy: 'http://localhost:3000'
        // proxy: { // 开发环境代理配置
        //     [process.env.VUE_APP_BASE_API]: {
        //         target: process.env.VUE_APP_SERVICE_URL,
        //         changeOrigin: true,
                // pathRewrite: {
                //     ['^' + process.env.VUE_APP_BASE_API]: ''
                // }
        //     }
        // }
    },

    lintOnSave: false, // 关闭格式检查
    productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度 
}