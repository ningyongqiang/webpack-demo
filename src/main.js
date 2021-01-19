import ShoppingCart from './shoppingCart'
import List from './list'

class App {
  constructor(id) {
    this.el = document.querySelector(id)
  }
  init() {
    this.initShoppingCart()
    this.initList()
  }
  initShoppingCart() {
    const shoppingCart = new ShoppingCart(this)
    shoppingCart.init()
  }
  initList() {
    const list = new List(this)
    list.init()
  }
}
const app = new App('#app')
app.init()