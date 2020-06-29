import {max, min,mean, median } from 'simple-statistics'

export function makeScatterPoints(aList){
    var data = []
    aList.forEach(obj => {
        var dateList = []
        obj.results.forEach(result => dateList.push({x:Date.parse(result[0]), y:result[1]}))
        data.push({name:obj.location, color:"blue", type:"scatter", marker:{radius:6, symbol:'circle', lineWidth:1, lineColor:'#fff'}, data:dateList})
    })
    return data
}

export function makeSingleScatterPoints(aList){
    var data = []
    aList.forEach(obj => {
        var dateList = []
        aList.forEach(result => dateList.push({x:Date.parse(result[0]), y:result[1]}))
        data.push({name:obj.location, color:"blue", stacking:'normal', marker:{radius:5, symbol:'circle', lineWidth:1, lineColor:'#fff'}, data:dateList})
    })
    return data
}
export function combineObjectProps(objs, objProp){
    let aCodeGroup = objs.filter(obj => obj.code === objProp)
    return (aCodeGroup.map(obj => obj.quantity).reduce((prev,next) => prev + next))
}
export function getCodeQtyFromDetails(aList, aName){
    var codeList = []
    var target = []
    let surveys =  aList.filter(obj => obj.location === aName)
    if(surveys[0]){
        surveys[0].dailyTotals.forEach((item) => {
            if(!codeList.includes(item.code)){
                codeList.push(item.code)
            }
        })
    }
    codeList.forEach(code => target.push({code:code, total:combineObjectProps(surveys[0].dailyTotals, code)}))
    return target
}
export function rearangeCodes(obj, target){
    let data = {}
    data.source = obj.source
    data.description = obj.description
    data.material = obj.material
    let theKey ={}
    theKey[obj.code] = data
    Object.assign(target, theKey)
}
export function treeLeaves(obj, codeKeys, parentIds, target){
    let data = {}
    let clipSourceName = codeKeys[obj.code].source.split(' ')[0]
    data.id = obj.code
    data.name = codeKeys[obj.code].description
    data.parent = `id_${parentIds[clipSourceName]}`
    data.value = obj.total
    data.locator = clipSourceName
    target.push(data)
}
export function makeSourceGroups(codes, sources, target){
    const group = {}
    sources.forEach(source => {
        group[source] = codes.filter(obj => obj.source === source)
    })
    target.push(group)
}
export function groupCodesBySource(codes, sources){
    let target = []
    makeSourceGroups(codes,sources, target)
    return target
}


export function makeTreeBranches(parents, parentIds, target){
    parents.forEach((parent) =>{
        let clipSourceName = parent.split(' ')[0]
        let getLeaves = target.filter(obj => obj.locator === clipSourceName)
        let leavesTotal = getLeaves.reduce( (total, leaf) => {
            return total + leaf.value},0)
        let data = {}
        data.id = `id_${parentIds[clipSourceName]}`
        data.name = parent
        data.value = leavesTotal
        data.color =  "#fff"
        target.push(data)
    })
}
export function makeTreeLeaves(results, codeKeys, parentIds){
    const target = []
    results.forEach(result => treeLeaves(result, codeKeys, parentIds, target))
    return target
}

export function makeTree(parents, parentIds, leaves){
    makeTreeBranches(parents,parentIds, leaves)
    return leaves
}

export function codeLookUp(codes){
    const target = {}
    codes.forEach(obj => rearangeCodes(obj, target))
    return target
}

export function getKeys(codes, key){
    const keys = []
    var i
    for(i=0; i < codes.length; i++){
        if(!keys.includes(codes[i][key])){
            keys.push(codes[i][key])
        }
    }
    return keys
}

export function makeParentId(aList){
    let ids = {}
    aList.forEach((name, i) => {
        let brief = name.split(' ')[0]
        ids[brief]=i
    })
    return ids
}

export function getCodeTotals(aList){
    var total = 0
    aList.forEach(obj => total += obj.total)
    return total
}

export function getFirstAndLastDate(aList){
    const sortedList = aList.sort((a,b) => new Date(a) - new Date(b))
    const firstSample = sortedList[0]
    const lastSample = sortedList[sortedList.length-1]
    return {first:firstSample, last:lastSample, sorted:sortedList}
}

export function makeTimeSeriesData(data){
    const aList = combineDailyResults(data)
    const timeSeries = aList.map(obj => ({x: new Date(obj[0]), y:obj[1]}))
    return timeSeries
}

export function makeMaterialTreeMapData(aList, codeKeys, materialKeys){
    let target = []
    const theList = aList.map(obj => ({name:codeKeys[obj.code].material, y:obj.total}))
    materialKeys.forEach( material =>{
        let aMaterial = theList.filter(obj => obj.name === material)
        let materialTotal = aMaterial.reduce((total, item) => {
            return total + item.y},0)
        let data = {}
        data.name = material
        data.value = materialTotal
        data.color =  "#fff"
        target.push(data)
    })
    return target
}

export function combineDailyResults(aList){
    var dateList = []
    aList.forEach(obj => dateList.push(...obj.results))
    return dateList
}
export function getTheMedianValue(list){
    return median(list)
}
export function getTheMeanValue(list){
    return mean(list)
}
export function makeRegionalSummary(pcsMeter, codeTotals, beaches){
    const combinedResults = combineDailyResults(pcsMeter)
    const dates = combinedResults.map(obj => obj[0])
    const pcsM = combinedResults.map(obj => obj[1])
    const firstLastSorted = getFirstAndLastDate(dates)
    return ({
        firstSample:firstLastSorted.first,
        lastSample:firstLastSorted.last,
        noOfSamples:dates.length,
        totalPieces:getCodeTotals(codeTotals),
        categories:codeTotals.length,
        median:median(pcsM),
        max:max(pcsM),
        min:min(pcsM),
        locations:beaches.length
    })
}
