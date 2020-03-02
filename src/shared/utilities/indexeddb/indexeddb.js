export function checkForDb(the_window){
    let isDb
    if(!the_window.indexedDB){
        return false
    }else{
        return true
    }

}
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
    }
    request.onupgradeneeded = function(event){
        request_status = dbUpgrading(name)
        callback(request_status)

    }
}
