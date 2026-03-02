// pages/product/detail.js
const app = getApp()

Page({
  data: {
    product: {}
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const product = app.globalData.products.find(p => p.id === id)
    
    if (product) {
      this.setData({ product })
    } else {
      wx.showToast({ title: '商品不存在', icon: 'none' })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  addToCart() {
    const { product } = this.data
    
    if (product.stock <= 0) {
      wx.showToast({ title: '库存不足', icon: 'none' })
      return
    }
    
    app.addToCart(product, 1)
    
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  }
})
