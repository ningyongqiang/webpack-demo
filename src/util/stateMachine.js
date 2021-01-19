export default class State {
  constructor(states) {
    this.currentState = []
    this.states = states
  }
  change(arr) {
    this.currentState = arr
    return this
  }
  do() {
    this.currentState.forEach(item => {
      this.states[item]()
      return this
    })
  }
}