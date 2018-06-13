const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//json -> array object
function json2Array(str) {
  var jsonstr = str
  //console.log('ppp:::' + jsonstr)
  var jsonObj = JSON.parse(jsonstr)
  //console.log('ppp2:::' + jsonObj)
  var jsonArr = [];
  for (var i = 0; i < jsonObj.length; i++) {
    jsonArr[i] = jsonObj[i];
  }
  //console.log('arrs:::' + jsonArr)
  return jsonArr
}

module.exports = {
  formatTime: formatTime,
  json2Array: json2Array,
}
