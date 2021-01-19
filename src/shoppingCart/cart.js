class Cart {
  constructor() {
    this.list = []
  }
  add(data) {
    this.list.push(data)
  }
  delete(id) {
    this.list.forEach((item, index) => {
      if (item.id === id) {
        this.list.splice(index, 1)
      }
    })
  }
  getList() {
    this.list.forEach(item => {
      console.log(`${item.name} ${item.price}`)
    })
  }
}
Cart.getInstance = (function() {
  let instance = null
  return function() {
    if (!!instance === false) {
      instance = new Cart()
    }
    return instance
  }
})()
export default Cart