// pages/product/list.js
const app = getApp()

Page({
  data: {
    products: []
  },

  onShow() {
    this.loadProducts()
  },

  loadProducts() {
    const products = app.globalData.products
    this.setData({ products })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/product/detail?id=${id}`
    })
  }
})
