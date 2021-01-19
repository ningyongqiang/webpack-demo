import Cart from '../shoppingCart/cart'
import State from '../util/stateMachine'
import log from '../util/log'

export default class Item {
  constructor(list, data) {
    this.list = list
    this.data = data
    this.el = document.createElement('div')
    this.cart = Cart.getInstance()
  }
  init() {
    this.initContent()
    this.initBtn()
    this.render()
  }
  initContent() {
    const { name, price } = this.data
    const nameNode = document.createElement('p')
    nameNode.innerText = `${name} 价格：${price}`
    this.el.append(nameNode)
  }
  initBtn() {
    const btnNode = document.createElement('button')
    btnNode.innerText = '加入购物车'
    const _this = this
    const state = new State({
      加入购物车() {
        _this.addToCart()
        btnNode.innerText = '取消购物车'
      },
      取消购物车() {
        _this.deleteToCart()
        btnNode.innerText = '加入购物车'
      }
    })
    btnNode.addEventListener('click', function() {
      state.change([this.innerText]).do()
    })
    this.el.append(btnNode)
  }
  @log('add')
  addToCart() {
    this.cart.add(this.data)
  }
  @log('delete')
  deleteToCart() {
    this.cart.delete(this.data.id)
  }
  render() {
    this.list.el.append(this.el)
  }
}