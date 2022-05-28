const { defineConfig } = require('@vue/cli-service')
    // module.exports = defineConfig({
    //     transpileDependencies: true
    // })

module.exports = {
    pages: {
        index: {
            // 更改main.js入口文件名称
            entry: 'src/main.js'
        }
    },
    // 关闭语法检查
    lintOnSave: false
}