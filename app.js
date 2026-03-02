// app.js
App({
  globalData: {
    userInfo: null,
    products: [], // 商品列表
    cart: [] // 购物车
  },
  
  onLaunch() {
    // 初始化加载商品数据
    this.loadProducts()
    // 加载购物车
    this.loadCart()
  },
  
  // 加载商品列表
  loadProducts() {
    const products = wx.getStorageSync('products') || []
    this.globalData.products = products
  },
  
  // 保存商品列表
  saveProducts(products) {
    this.globalData.products = products
    wx.setStorageSync('products', products)
  },
  
  // 加载购物车
  loadCart() {
    const cart = wx.getStorageSync('cart') || []
    this.globalData.cart = cart
  },
  
  // 保存购物车
  saveCart(cart) {
    this.globalData.cart = cart
    wx.setStorageSync('cart', cart)
  },
  
  // 添加到购物车
  addToCart(product, quantity = 1) {
    const cart = this.globalData.cart
    const existItem = cart.find(item => item.id === product.id)
    
    if (existItem) {
      existItem.quantity += quantity
    } else {
      cart.push({
        ...product,
        quantity
      })
    }
    
    this.saveCart(cart)
    return true
  }
})
