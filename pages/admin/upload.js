// pages/admin/upload.js
const app = getApp()

Page({
  data: {
    imageUrl: '',
    name: '',
    price: '',
    stock: '',
    description: '',
    products: []
  },

  onShow() {
    this.loadProducts()
  },

  // 加载商品列表
  loadProducts() {
    const products = app.globalData.products
    this.setData({ products })
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imageUrl: res.tempFilePaths[0]
        })
      }
    })
  },

  // 删除图片
  removeImage() {
    this.setData({ imageUrl: '' })
  },

  // 输入事件
  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },

  onPriceInput(e) {
    this.setData({ price: e.detail.value })
  },

  onStockInput(e) {
    this.setData({ stock: e.detail.value })
  },

  onDescInput(e) {
    this.setData({ description: e.detail.value })
  },

  // 提交商品
  submitProduct() {
    const { imageUrl, name, price, stock, description } = this.data

    // 验证
    if (!imageUrl) {
      wx.showToast({ title: '请选择商品图片', icon: 'none' })
      return
    }
    if (!name) {
      wx.showToast({ title: '请输入商品名称', icon: 'none' })
      return
    }
    if (!price || price <= 0) {
      wx.showToast({ title: '请输入正确的价格', icon: 'none' })
      return
    }
    if (!stock || stock < 0) {
      wx.showToast({ title: '请输入正确的库存', icon: 'none' })
      return
    }

    // 创建商品对象
    const product = {
      id: Date.now(),
      imageUrl,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      createTime: new Date().toISOString()
    }

    // 保存到全局数据
    const products = app.globalData.products
    products.unshift(product)
    app.saveProducts(products)

    wx.showToast({ title: '发布成功', icon: 'success' })

    // 清空表单
    this.setData({
      imageUrl: '',
      name: '',
      price: '',
      stock: '',
      description: ''
    })

    this.loadProducts()
  },

  // 删除商品
  deleteProduct(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个商品吗?',
      success: (res) => {
        if (res.confirm) {
          const products = app.globalData.products.filter(p => p.id !== id)
          app.saveProducts(products)
          this.loadProducts()
          wx.showToast({ title: '删除成功', icon: 'success' })
        }
      }
    })
  }
})
