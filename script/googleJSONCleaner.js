const googleJSONCleaner = arr => {
  let cleanArr = []
  // Google Sheets changes column names to all lowercase when displaying in json. Workaround here is to include column names in row1 & row2 and use first line of data as property name values when iterating through
  let columnNames = []
  let firstTimeThrough = true

  for (let obj of arr) {
    let newObj = {}
    let index = 0
    for (let key in obj) {
      if (key.startsWith('gsx$')) {
        //builds object that will be used for propery names
        if (firstTimeThrough) {
          newObj[key] = obj[key].$t
        } else {
          let cleanedKey = columnNames[index++]
          newObj[cleanedKey] = obj[key].$t
        }
      }
    }
    //pushes values to columnNames to be used to name the rest of the objects
    if (firstTimeThrough) {
      firstTimeThrough = false
      columnNames = Object.values(newObj)
    } else cleanArr.push(newObj)

  }
  return cleanArr.slice(1, arr.length)
}

module.exports = googleJSONCleaner
