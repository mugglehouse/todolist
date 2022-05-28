// 1、引入Vue和App
import Vue from 'vue'
import App from './App.vue'

// 2、将生产提示设为false
Vue.config.productionTip = false

// 3、创建Vue实例
new Vue({
    el: '#app',
    // 将App组件渲染到页面
    render: h => h(App),
    // 创建全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    }
})