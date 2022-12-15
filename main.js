// 项目入口文件
import Vue from 'vue'
import App from './App'

// 导入网络请求的包
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

// 请求的根路径
$http.baseUrl = 'https://www.uinav.com'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  // do somethimg...
  uni.showLoading({
    title: '数据加载中...'
  })
}


// 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}

// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败!', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
