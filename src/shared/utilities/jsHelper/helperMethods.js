export function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1)
        }
    }
    return a
}
export const truncate = (str, max) => {
    const array = str.trim().split(' ');
    const ellipsis = array.length > max ? '...' : '';
    return array.slice(0, max).join(' ') + ellipsis;
}
export const getBySubject = (data, subject) => {
    if(data){
        const protocols = data.filter(obj => obj.subject === subject)
        return protocols
    }
}
export const getByDate = (data, date) => {
    if(data){
        const request = data.filter(obj => obj.date === date)
        return request
    }
}

export const getFilteredDocs = (data, subject, callBack) => {
    if(data){
        let filteredData = getBySubject(data, subject)
        return filteredData.map(obj => (
            {
                cardTitle:obj.title,
                cardDescription:truncate(obj.summary, 7),
                callback:callBack,
                buttonclass: "cardButton",
                id:obj.slug,
                label:obj.title
            }
        ))
    } else {
        return ([{
            cardTitle:"Waiting on data",
            cardDescription:"If you did not download data this will not function",
            callback:"None",
            buttonclass: "cardButton",
            name:"noIndexedDb",
            label:"No Data",
        }])
    }
}
export const thousandsSeparators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return num_parts.join(".")
}
export const hasData = (name, dataList) => {
    let data = dataList.filter(obj => obj.location === name)
    if(data.length){
        return true
    }else{
        return false
    }
}
export const sumOfObjects = (data, property) => {
  var i
  var total = 0
  for(i=0; i<data.length; i++){
    total += data[i][property]
  }
  return total
}
export const intersectionX = (setA, setB) => {
    console.log("this intersectionX")
    var _intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    if(_intersection.size === 0){
        return false
    }else{
        return  [..._intersection.values()]
    }
}
