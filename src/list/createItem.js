import Item from './item'

export default function getItem(list, data) {
  const { discount = 1 } = data
  if (discount !== 1) {
    data = new Proxy(data, {
      get(target, property) {
        if (property === 'name') {
          return `${target[property]} 【折扣】`
        } else if (property === 'price') {
          return target[property] * discount
        } else {
          return target[property]
        }
      }
    })
  }
  return new Item(list, data)
}