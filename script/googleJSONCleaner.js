const googleJSONCleaner = arr => {
  let cleanArr = []

  for (let obj of arr) {
    let newObj = {}
    for (let key in obj) {
      if (key.startsWith('gsx$')) {
        let cleanedKey = key.replace('gsx$', '')
        newObj[cleanedKey] = obj[key].$t
      }
    }
    cleanArr.push(newObj)
  }
  return cleanArr
}

module.exports = googleJSONCleaner
