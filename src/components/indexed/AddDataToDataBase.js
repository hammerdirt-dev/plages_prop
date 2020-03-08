import { Component } from 'react'
import React from 'react'
import {
    name,
    version,
    theDataStores,
} from '../../shared/globals/variablesToEdit'

class GetNewData extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.getAndAddData = this.getAndAddData.bind(this)
        this.addDateOfUpdate = this.addDateOfUpdate.bind(this)
    }
    async componentDidMount() {
        console.log("mounting add data")
        this._isMounted = true
    }
    componentDidUpdate(prevProps, prevState){
        if (this.props.getData && this.props.getData !== prevProps.getData){
            console.log("Calling get and add data")
            this.getAndAddData(name)
        }
    }
    componentWillUnmount(){
        console.log("unmounting add data")
        this._isMounted = false
    }
    addDataToDataBase = (data, store, dataBase) =>{
        const aDb = indexedDB.open(dataBase)
        var transaction, theStore
        aDb.onsuccess = event => {
            let db = event.target.result
            transaction = db.transaction([store], "readwrite")
            theStore = transaction.objectStore(store)
            theStore.clear()
            transaction.onerror = function(event) {
            };
            data.forEach(beach => {
                const added_data = theStore.add(beach)
                added_data.onerror = function(event){
                }
            })
        }
    }
    getAndAddData = (database) =>{
        console.log("fetching data from server")
        theDataStores.forEach(obj =>{
            fetch(obj.url)
                .then(response =>  response.json()
                .then(data => ({status: response.status, body: data})))
                .then(theData => {
                    this.addDataToDataBase(theData.body, obj.store, database)
                })
        })
        this.addDateOfUpdate(database)
    }
    addDateOfUpdate(dataBase){
        const now = new Date()
        this.addDataToDataBase([{date:now, lastUpdate:now}], "lastUpdate", dataBase)
        this.props.lastUpdate({result:[{date:now, lastUpdate:now}]})
    }
    render(){
        return(
            null
        )
    }
}

export default GetNewData
