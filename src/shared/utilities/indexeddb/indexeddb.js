export const name = "BeachLitterOne"
export const version = 12
// check to see if there is a db
export function checkForDb(the_window){
    let isDb
    if(!the_window.indexedDB){
        return false
    }else{
        return true
    }
}

// check to see if the db opens
export function dbErrorFunction(name){
    return ({status:false, action:"open", dbName:name})
}
export function dbSuccessFunction(name){
    return ({status:true, action:"open", dbName:name})
}
export function dbUpgrading(name){
    return ({status:true, action:"upgrade", dbName:name})
}
export function startDBTrans(name, version, callback){
    let request = indexedDB.open(name, version)
    let request_status
    request.onerror = function(event){
        request_status=dbErrorFunction(name)
        callback(request_status)
    }
    request.onsuccess = function(event){
        request_status = dbSuccessFunction(name)
        callback(request_status)
        console.log("success")
    }
    request.onupgradeneeded = function(event){
        request_status = dbUpgrading(name)
        callback(request_status)
        console.log("upgrade needed")

    }

}
export function txErrorFunction(name){
    return ({status:false, action:"transaction", store:name})
}
export function txSuccessFunction(name){
    return ({status:true, action:"transaction", store:name})
}
export function indexGetAllFromStore(storeName,name,version, statusCallBack, dataCallBack){
    console.log("calling get all for date")
    let request = indexedDB.open(name, version)
    request.onerror = function(event){
        var request_status = dbErrorFunction(name)
        statusCallBack(request_status)
    }
    request.onsuccess = function(event){
        const a_callBack = dataCallBack
        const a_statusCallBack = statusCallBack
        let db = event.target.result
        var tx = db.transaction([storeName])
        var store = tx.objectStore(storeName)
        var get_data = store.getAll()
        get_data.onsuccess = function(event){
            console.log(event.target.result)
            dataCallBack({name:storeName,result:event.target.result})
        }
        tx.oncomplete = function(event){
            console.log("complete")
            statusCallBack(txSuccessFunction(storeName))
        }
        tx.onerror = function(event){
            console.log("error")
            statusCallBack(txErrorFunction(storeName))
        }
    }
    request.onupgradeneeded = function(event) {
        // const a_callBack = dataCallBack
        // const a_statusCallBack = statusCallBack
        let request_status = dbUpgrading(name)
        statusCallBack(request_status)
        console.log("upgrade needed")
        var db = event.target.result

        if(!db.objectStoreNames.contains("beaches")) {
            var store = db.createObjectStore("beaches", { keyPath: "location",unique:true })
            store.createIndex("city", "city")
            store.createIndex("water", "water")
            store.createIndex("owner", "owner")
            store.createIndex("post", "post")
            store.createIndex("water_name", "water_name",)
            store.createIndex("slug", "slug")
        }
        if(!db.objectStoreNames.contains('users')) {
            var store2 = db.createObjectStore('users', {keyPath:"username"})
            store2.createIndex('position', 'position')
            store2.createIndex('hd_status', 'hd_status')
        }
        if(!db.objectStoreNames.contains('codes')) {
            var store3 = db.createObjectStore('codes', {keyPath:"code", unique:true})
            store3.createIndex("source", "source")
            store3.createIndex("material", "material")
        }
        if(!db.objectStoreNames.contains('dailyTotals')) {
            db.createObjectStore('dailyTotals', { keyPath: "location", unique:true })
        }
        if(!db.objectStoreNames.contains('waterBodyCodeTotals')) {
            db.createObjectStore('waterBodyCodeTotals', {keyPath: "location", unique:true})
        }
        if(!db.objectStoreNames.contains('cityCodeTotals')) {
            db.createObjectStore('cityCodeTotals', {keyPath:"location", unique:true})
        }
        if(!db.objectStoreNames.contains('postCodeTotals')) {
            db.createObjectStore('postCodeTotals', { keyPath:"location", unique:true })
        }
        if(!db.objectStoreNames.contains('beachesByCategory')) {
            db.createObjectStore('beachesByCategory', {  keyPath: "location" })
        }
        if(!db.objectStoreNames.contains('beachCategories')) {
            db.createObjectStore('beachCategories', { keyPath: "category"})
        }
        if(!db.objectStoreNames.contains('referenceTitles')){
            db.createObjectStore('referenceTitles', { keyPath : "title" })
        }
        if(!db.objectStoreNames.contains('draftArticles')){
            db.createObjectStore('draftArticles', { keyPath:"title" })
        }
        if(!db.objectStoreNames.contains('articleSearchList')){
            var storeFour = db.createObjectStore('articleSearchList', { keyPath:"title" })
            storeFour.createIndex("owner", "owner")
            storeFour.createIndex("subject", "subject")
        }
        if(!db.objectStoreNames.contains('draftSurvey')){
            db.createObjectStore('draftSurvey', {keyPath:'surveyId'})
        }
        if(!db.objectStoreNames.contains('lastUpdate')){
            db.createObjectStore('lastUpdate', {keyPath:'date'})
        }
        if(!db.objectStoreNames.contains('surveyDetails')){
            db.createObjectStore('surveyDetails', {keyPath:'location'})
        }
        if(!db.objectStoreNames.contains('currentArticles')){
            db.createObjectStore('currentArticles', {keyPath:'slug'})

        }
    }
}


export function useIndexedCursorGet(Beach_Data, Beach_Data_Version, storeName, stateName, eventListener){
    var request
    if (Beach_Data_Version < 1){
        request = indexedDB.open( Beach_Data);

    }else{
        request = indexedDB.open( Beach_Data, Beach_Data_Version);
    }
    request.onsuccess = function(event){
        console.log("The db is open")
        const db = request.result
        const actualStores = request.result.objectStoreNames
        const tx = db.transaction(storeName, 'readonly')
        const codes = []
        tx.objectStore(storeName).openCursor().onsuccess = function(event){
            var cursor = event.target.result
            if(cursor){
                // console.log(cursor)
                codes.push(cursor.value)
                cursor.continue();
            }else{

            }
        }
        tx.addEventListener('error', () => {
            console.log("transaction error")
            console.log(stateName)
            eventListener(stateName, false, actualStores)
        })
        tx.addEventListener('complete', () => {
            console.log("transaction complete")
            console.log(stateName)
            eventListener(stateName, codes, actualStores)
        })
    }

}
export function useIndexedCursorGetKey(Beach_Data, Beach_Data_Version, storeName, stateName, key, eventListener){

    const request = indexedDB.open(Beach_Data, Beach_Data_Version)
    request.onerror = () => {
        console.log("error")
    }
    request.onblocked = () => {
        console.log("blocked")
    }
    request.onsuccess = function(event){
        console.log(`The db is open ${storeName}`)
        const db = event.target.result
        const tx = db.transaction(storeName)
        const some_data = tx.objectStore(storeName).get(key)
        tx.addEventListener('error', () => {
            eventListener(false, "not good")
        })
        tx.addEventListener('complete', () => {
            eventListener(key,some_data)
        })
    }


}
export const postDataToStore = async (storeName,Beach_Data, Beach_Data_Version, openDB, someData )=>{
    console.log("posting data to store")
    const db = await openDB(Beach_Data, Beach_Data_Version)
    const result = db.put(storeName,someData)
    return result
}
export function addMultipleToStore(Beach_Data, Beach_Data_Version, data,storeName, callback) {
    const request = indexedDB.open(Beach_Data, Beach_Data_Version)
    request.onerror = () => {
        console.log("error")
    }
    request.onblocked = () => {
        console.log("blocked")
    }
    request.onsuccess = function(event){
        console.log(`The db is open ${storeName}`)
        // console.log( event.target)
        let db = event.target.result
        let transaction = db.transaction([storeName], "readwrite")
        let a_Store = transaction.objectStore(storeName)
        a_Store.clear()
        const tx = db.transaction([storeName], "readwrite")
        const theStore = tx.objectStore(storeName)
        data.forEach(beach => {
            // console.log(beach)
            theStore.add(beach)
        })


        tx.addEventListener('error', () => {
            callback(false, "not good")
        })
        tx.addEventListener('complete', () => {
            callback(true, "completed")
        })
    }

}

export const clearStore = async(storeName,Beach_Data, Beach_Data_Version, openDB ) =>{
    const db = await openDB(Beach_Data, Beach_Data_Version)
    console.log("clear store called")
    db.clear(storeName)
}

export const clearItem = async(storeName,key, Beach_Data, Beach_Data_Version, openDB ) => {
    const db = await openDB(Beach_Data, Beach_Data_Version)
    const tx = db.transaction(storeName, 'readwrite')
    tx.store.delete(key)
}

// request.onupgradeneeded = function(event) {
//     console.log("the upgrade is needed")
//     upgradeOrNot(true)
//     var db = event.target.result
//     db.onerror = function(errorEvent){
//         upgradeError(true)
//     }
//     if(!db.objectStoreNames.contains("beaches")) {
//         var store = db.createObjectStore("beaches", { keyPath: "location",unique:true })
//         store.createIndex("city", "city")
//         store.createIndex("water", "water")
//         store.createIndex("owner", "owner")
//         store.createIndex("post", "post")
//         store.createIndex("water_name", "water_name",)
//         store.createIndex("slug", "slug")
//     }
//     if(!db.objectStoreNames.contains('users')) {
//         var store2 = db.createObjectStore('users', {keyPath:"username"})
//         store2.createIndex('position', 'position')
//         store2.createIndex('hd_status', 'hd_status')
//     }
//     if(!db.objectStoreNames.contains('codes')) {
//         var store3 = db.createObjectStore('codes', {keyPath:"code", unique:true})
//         store3.createIndex("source", "source")
//         store3.createIndex("material", "material")
//     }
//     if(!db.objectStoreNames.contains('dailyTotals')) {
//         db.createObjectStore('dailyTotals', { keyPath: "location", unique:true })
//     }
//     if(!db.objectStoreNames.contains('waterBodyCodeTotals')) {
//         db.createObjectStore('waterBodyCodeTotals', {keyPath: "location", unique:true})
//     }
//     if(!db.objectStoreNames.contains('cityCodeTotals')) {
//         db.createObjectStore('cityCodeTotals', {keyPath:"location", unique:true})
//     }
//     if(!db.objectStoreNames.contains('postCodeTotals')) {
//         db.createObjectStore('postCodeTotals', { keyPath:"location", unique:true })
//     }
//     if(!db.objectStoreNames.contains('beachesByCategory')) {
//         db.createObjectStore('beachesByCategory', {  keyPath: "location" })
//     }
//     if(!db.objectStoreNames.contains('beachCategories')) {
//         db.createObjectStore('beachCategories', { keyPath: "category"})
//     }
//     if(!db.objectStoreNames.contains('referenceTitles')){
//         db.createObjectStore('referenceTitles', { keyPath : "title" })
//     }
//     if(!db.objectStoreNames.contains('draftArticles')){
//         db.createObjectStore('draftArticles', { keyPath:"title" })
//     }
//     if(!db.objectStoreNames.contains('articleSearchList')){
//         var storeFour = db.createObjectStore('articleSearchList', { keyPath:"title" })
//         storeFour.createIndex("owner", "owner")
//         storeFour.createIndex("subject", "subject")
//     }
//     if(!db.objectStoreNames.contains('draftSurvey')){
//         db.createObjectStore('draftSurvey', {keyPath:'surveyId'})
//     }
//     if(!db.objectStoreNames.contains('lastUpdate')){
//         db.createObjectStore('lastUpdate', {keyPath:'date'})
//     }
//     if(!db.objectStoreNames.contains('surveyDetails')){
//         db.createObjectStore('surveyDetails', {keyPath:'location'})
//     }
//     if(!db.objectStoreNames.contains('currentArticles')){
//         db.createObjectStore('currentArticles', {keyPath:'slug'})
//
//     }
// }
