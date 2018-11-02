/**
 * 倒计时
 * @param  {Number}   seconds  倒计时时间
 * @param  {Function} callback(times) 倒计时的 loop
 * @param  {times}  day   倒计时的天数
 * @param  {times}  hour  倒计时的小时数
 * @param  {times}  min   倒计时的分钟数
 * @param  {times}  sec   倒计时的秒数
 */
function countdown (seconds, callback) {
  var timer
  // fix floating seconds
  seconds = Math.round(seconds)

  function prefix (n) {
    return n > 9 ? `${n}` : `0${n}`
  }

  function format (seconds) {
    let day = 0
    let hour = 0
    let min = 0
    let sec = 0
    let Day = 24 * 60 * 60
    let Hour = 60 * 60
    let Min = 60
    if (seconds > Day) {
      day = Math.floor(seconds / Day)
      seconds = seconds % Day
    }
    hour = Math.floor(seconds / Hour)
    seconds = seconds % Hour
    min = Math.floor(seconds / Min)
    sec = seconds % Min
    return { day: prefix(day), hour: prefix(hour), min: prefix(min), sec: prefix(sec) }
  }

  function down () {
    seconds--
    callback(format(seconds))
    !seconds && clearInterval(timer)
  }
  if (seconds > 0) {
    timer = setInterval(down, 1000)
    down()
  } else {
    callback(format(0))
  }
}

/**
 * 设置 url 的 query 中参数的键值
 * @param {String} key   query 中的键
 * @param {String} value query 中的值
 * @param {String} url   url 字符串，默认 location.href
 */
function setParam (key, value, url = location.href) {
  let reg = new RegExp('(' + key + ')=([^&]*)', 'ig')
  let result = reg.exec(url)
  if (result) {
    return url.replace(result[0], `${key}=${value}`)
  } else {
    reg = /\?(.*)#?(.*)/gi
    let search = reg.exec(url)
    if (search !== null) {
      return url.replace(search[1], `${search[1]}&${key}=${value}`)
    } else {
      return ''
    }
  }
}

/**
 * 获取 url 的 query 中参数 key 的值
 * @param  {String} key query 中的键
 * @param  {String} url url 字符串，默认 location.href
 * @return {String}     key 对应的值
 */
function getParam (key, url = location.href) {
  let reg = new RegExp('(' + key + ')=([^&]*)', 'ig')
  let result = reg.exec(url)
  return result ? result[2] : ''
}

module.exports = {
  setParam,
  getParam,
  countdown
}
