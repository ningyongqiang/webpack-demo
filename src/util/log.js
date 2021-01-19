export default function log(type) {
  return function(target, key, descriptor) {
    const oldValue = descriptor.value
    descriptor.value = function() {
      console.log(type)
      return oldValue.apply(this, arguments)
    }
    return descriptor
  }
}