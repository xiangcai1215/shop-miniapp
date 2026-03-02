// pages/cart/cart.js
const app = getApp()

Page({
  data: {
    cart: [],
    totalPrice: 0
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
    const cart = app.globalData.cart
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
    
    this.setData({ 
      cart,
      totalPrice
    })
  },

  increaseQuantity(e) {
    const id = e.currentTarget.dataset.id
    const cart = app.globalData.cart
    const item = cart.find(i => i.id === id)
    
    if (item) {
      item.quantity++
      app.saveCart(cart)
      this.loadCart()
    }
  },

  decreaseQuantity(e) {
    const id = e.currentTarget.dataset.id
    const cart = app.globalData.cart
    const item = cart.find(i => i.id === id)
    
    if (item && item.quantity > 1) {
      item.quantity--
      app.saveCart(cart)
      this.loadCart()
    }
  },

  removeItem(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个商品吗?',
      success: (res) => {
        if (res.confirm) {
          const cart = app.globalData.cart.filter(i => i.id !== id)
          app.saveCart(cart)
          this.loadCart()
        }
      }
    })
  },

  checkout() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  goShopping() {
    wx.switchTab({ url: '/pages/product/list' })
  }
})
