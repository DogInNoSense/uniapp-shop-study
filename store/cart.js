export default {
  namespaced: true,
  
  state: () => ({
    
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state,goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      console.log(findResult)
      
      
      if(!findResult) {
        state.cart.push(goods)
      }else {
        findResult.goods_count++
      }
      this.commit('m_cart/saveToStorage')
      console.log(state.cart)
    },
    saveToStorage(state) {
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    },
    // 更新购物车中商品的数量
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id == goods.goods_id)
      
      if(findResult) {
        findResult.goods_state = goods.goods_state
        
        this.commit('m_cart/saveToStorage')
        }
      },
 
    // 更新商品的数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      
      
      if(findResult) {
        findResult.goods_count = goods.goods_count
        
        this.commit('m_cart/saveToStorage')
      } 
  },
  
  // 根据 id 删除对应的商品
  removeGoodsById(state, goods_id) {
    state.cart = state.cart.filter(x => x.goods_id !== goods_id)
    this.commit('m_cart/saveToStorage')
    },
    
    updateAllGoodsState(state, newState) {
      // 更新购物车中所有商品的勾选状态
      state.cart.forEach(x => x.goods_state = newState) 
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    
    
 },
 

  
  
  getters: {
    // 购物车中所有商品的总数量
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c
      
      return state.cart.reduce((total,item) => total += item.goods_count, 0)
    },
    // 购物车中已勾选商品的总数量
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 已勾选的商品总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  }
}

