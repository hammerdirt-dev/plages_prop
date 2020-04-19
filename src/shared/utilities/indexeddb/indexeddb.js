// export const name = "BeachLitterOne"
// export const version = 13
// check to see if there is a db
export function checkForDb(the_window){
    if(!the_window.indexedDB){
        return false
    }else{
        return true
    }
}
// check to see if the db opens
export function dbErrorFunction(name){
    // console.log("error")
    return ({status:false, action:"open", dbName:name})
}
export function dbSuccessFunction(name){
    // console.log("success")
    return ({status:true, action:"open", dbName:name})
}
export function dbUpgrading(name){
    // console.log("upgrade needed")
    return ({status:true, action:"upgrade", dbName:name})
}
export function txErrorFunction(name){
    return ({status:false, action:"transaction", store:`${name}DbTx`})
}
export function txSuccessFunction(name){
    return ({status:true, action:"transaction", store:`${name}DbTx`})
}
export function indexGetAllFromStore(storeName,name,version, statusCallBack, dataCallBack){
    console.log(`calling get all for ${storeName}`)
    let request = indexedDB.open(name, version)
    request.onerror = function(event){
        var request_status = dbErrorFunction(name)
        statusCallBack(request_status)
    }
    request.onsuccess = function(event){
        // console.log("The db is open")
        const db = request.result
        const tx = db.transaction(storeName, 'readonly')
        const codes = []
        console.log(`tx on ${storeName}`)
        tx.objectStore(storeName).openCursor().onsuccess = function(event){
            var cursor = event.target.result
            if(cursor){
                codes.push(cursor.value)
                cursor.continue();
            }else{

            }
        }
        tx.oncomplete = function(event){
            console.log("tx complete !!")
            statusCallBack(txSuccessFunction(storeName))
            dataCallBack({name:storeName,result:codes})
        }
        tx.onerror = function(event){
            console.log("check date error")
            statusCallBack(txErrorFunction(storeName))
        }
    }
    request.onupgradeneeded = function(event) {
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
            store.createIndex("water_name", "water_name")
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
            var storeFive = db.createObjectStore('surveyDetails', {keyPath:'location'})
            storeFive.createIndex('code', 'code')
        }
        if(!db.objectStoreNames.contains('currentArticles')){
            db.createObjectStore('currentArticles', {keyPath:'slug'})
        }
        if(!db.objectStoreNames.contains('latestDailyTotals')){
            db.createObjectStore('latestDailyTotals', {keyPath:'location'})
        }
    }
}
export function indexGetOneFromStore(storeName,indexName, name,version,statusCallBack, dataCallBack){
    // console.log("calling get all for date")
    let request = indexedDB.open(name, version)
    request.onerror = function(event){
        var request_status = dbErrorFunction(name)
        statusCallBack(request_status)
    }
    request.onsuccess = function(event){
        // console.log("The db is open")
        let db = request.result
        let  tx = db.transaction(storeName, 'readonly')
        let objectStore = tx.objectStore(storeName)
        let the_request = objectStore.get(indexName)
        the_request.onsuccess = function(event){
            dataCallBack({name:indexName,result:the_request.result.results})
        }
        tx.oncomplete = function(event){
            // console.log("tx complete!!")
            statusCallBack(txSuccessFunction(storeName))

        }
        tx.onerror = function(event){
            // console.log("check date error")
            statusCallBack(txErrorFunction(storeName))
        }
    }
}
export const packageToDb = (name, version, store,  keydata, data, callback ) => {
    this.saveToDb(name, version, {surveyId:keydata,...data}, callback)
}
export const saveToDb = (name, version, a_store, data, callback) => {
    var request = indexedDB.open(name, version)
    request.onsuccess = (event) => {
        let db = request.result
        let tx = db.transaction(a_store, 'readwrite')
        let store = tx.objectStore(a_store)
        store.put(data)
        tx.oncomplete = function(event){
            callback("The record was saved")
        }
        tx.onerror = function(event){
            callback("Unable to save the record")
        }
    }
}
export const clearItemFromDb = (data, name, version, callback) => {
    var request = indexedDB.open(name, version)
    // const transactionOutcome = (message) => {
    //     this.setState({save_to_db_message:message})
    // }
    request.onsuccess = (event) => {
        let db = request.result
        let tx = db.transaction('draftSurvey', 'readwrite')
        let store = tx.objectStore('draftSurvey')
        store.delete(data)
        // clear.onsuccess = function(event){
        //     callback("The record was removed from local")
        // }
        tx.oncomplete = function(event){
            callback("The record was removed from local")
        }
        tx.onerror = function(event){
            callback("Unable to remove local copy")
        }
    }
}
export function indexGetAllFromStores(storeNames,name,version, statusCallBack, dataCallBack){
    // console.log(`calling get all for ${storeName}`)
    let request = indexedDB.open(name, version)
    request.onerror = function(event){
        var request_status = dbErrorFunction(name)
        statusCallBack(request_status)
    }
    request.onsuccess = function(event){
        // console.log("The db is open")
        const db = request.result
        const tx = db.transaction(storeNames)
        const codes = {}
        storeNames.forEach(name => {
            var data = []
            var objectStore = tx.objectStore(name)
            objectStore.openCursor().onsuccess = (event) => {
                var cursor = event.target.result
                if(cursor){
                    data.push(cursor.value)
                    cursor.continue();
                }
                codes[name]=data
            }
        })

        tx.oncomplete = function(event){
            console.log("tx complete !!")
            statusCallBack(txSuccessFunction("allStores"))
            dataCallBack({result:codes})
        }
        tx.onerror = function(event){
            console.log("check date error")
            statusCallBack(txErrorFunction("allstores"))
        }
    }
}
