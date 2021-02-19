import ShoppingCart from './shoppingCart'
import List from './list'
import img from '../public/WechatIMG44.jpeg'
console.log(img)

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