import { countdown } from './util'
const a = require('./module-a')

function main () {
  let output = `${a} says hello to you`
  let timeout = 10
  let $result = document.getElementById('result')
  countdown(timeout, ({ day, hour, min, sec }) => {
    if (!day && !hour && !min && !sec) {
      $result.html = '倒计时结束'
    } else {
      $result.html = `${output}=>${day}天${hour}时${min}分${sec}秒`
    }
  })
}

main()
