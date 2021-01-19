import Cart from './cart'

export default class ShoppingCart {
  constructor(app) {
    this.app = app
    this.el = document.createElement('div')
    this.cart = Cart.getInstance()
  }
  init() {
    this.initBtn()
    this.render()
  }
  initBtn() {
    const btnNode = document.createElement('button')
    btnNode.innerText = '购物车'
    const _this = this
    btnNode.addEventListener('click', function() {
      _this.cart.getList()
    }, false)
    this.el.append(btnNode)
  }
  render() {
    this.app.el.append(this.el)
  }
}