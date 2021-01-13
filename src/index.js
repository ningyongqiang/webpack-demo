import _ from 'lodash'
import './style.css'
import { a } from './a'
import { b } from './b'
import { c } from './c'
a()
b()
c()

function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());