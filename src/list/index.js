import getItem from './createItem'

export default class List {
  constructor(app) {
    this.app = app
    this.el = document.createElement('div')
    this.data = [
      { id: 1, name: '洗衣粉', price: 9.9 },
      { id: 2, name: '滴露', price: 98 },
      { id: 3, name: '大葱', price: 9.5 },
      { id: 4, name: '小米手机', price: 3000, discount: 0.8 }
    ]
  }
  init() {
    this.initItemList()
    this.render()
  }
  initItemList() {
    this.data.forEach(element => {
      const item = getItem(this, element)
      item.init()
    })
  }
  render() {
    this.app.el.append(this.el)
  }
}