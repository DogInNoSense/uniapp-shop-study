<template>
	<view>
		<view class="goods-list">
		 <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
       <!-- 循环 my-goods 组件 -->
      <my-goods :goods="goods"></my-goods>
     </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 请求参数对象
				queryObj: {
          query: ',',
          cid: '',
          pagenum: 1,
          // 每一页10条数据
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        // 是否正在请求数据(节流阀)
        isloading: false
        
			};
		},
    onLoad(options) {
      console.log(options)
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()
      
      // console.log(this.queryObj)
    },
    
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // 打开节流阀
        this.isloading = true
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        // 关闭节流阀
        this.isloading = false
        cb && cb()
        if(res.meta.status !== 200) return uni.$showMsg()
        
        this.goodsList = [...this.goodsList,...res.message.goods]
        // this.goodsList = res.message.goods
        this.total = res.message.total
      },
      onReachBottom() {
        if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
        // 判断是否正在请求其它数据，如果是，则不发起额外的请求
        if(this.isloading) return 
        // 页码值自增加1
        this.queryObj.pagenum++
        this.getGoodsList()
        
      },
      onPullDownRefresh() {
        // 重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        // 重新发起数据请求
        this.getGoodsList(() => uni.stopPullDownRefresh()) // 关闭下拉刷新
        
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
