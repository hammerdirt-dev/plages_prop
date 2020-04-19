import { Component } from 'react'
import {
    name,
    theDataStores,
} from '../../shared/globals/variablesToEdit'

class GetNewData extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        this.getAndAddData = this.getAndAddData.bind(this)
        this.addDateOfUpdate = this.addDateOfUpdate.bind(this)
        // this.makeTheApiCalls = this.makeTheApiCalls.bind(this)
    }
    async componentDidMount() {
        console.log("mounting add data")
        this.getAndAddData(name, this.props.updateDBStatus)
        this._isMounted = true
    }
    componentDidUpdate(prevProps, prevState){
        if (this.props.getData && this.props.getData !== prevProps.getData){
            console.log("Calling get and add data")
            this.getAndAddData(name, this.props.updateDBStatus)
        }
    }
    componentWillUnmount(){
        console.log("unmounting add data")
        this._isMounted = false
    }
    addDataToDataBase = (data, store, dataBase, callback) =>{
        const aDb = indexedDB.open(dataBase)
        var transaction, theStore
        let updateDBStatus = callback
        aDb.onsuccess = event => {
            let db = event.target.result
            transaction = db.transaction([store], "readwrite")
            theStore = transaction.objectStore(store)
            theStore.clear()
            data.forEach(beach => {
                theStore.add(beach)

            })

            if(store === "lastUpdate"){
              transaction.oncomplete = function(event){
                  console.log(store)
                  updateDBStatus({name:"lastUpdate", result:data})
              }
              transaction.onerror = function(event) {
                  updateDBStatus({name:"lastUpdate", result:[]})
              };

            }else{
              transaction.oncomplete = function(event){
                  console.log(store)
                  updateDBStatus(store)
              }
              transaction.onerror = function(event) {
                  updateDBStatus("error")
              };
            }

        }
    }
    getAndAddData = (database, callback) =>{
      Promise.all(theDataStores.map(obj => fetch(obj.url)))
          .then(function(replys){
            return Promise.all(replys.map(obj => obj.json()))
          })
          .then(data => data.forEach((obj,i)=> this.addDataToDataBase(obj, theDataStores[i].store, database, callback)))
          .catch(this.addDateOfUpdate(database))
    }
    addDateOfUpdate(dataBase){
      console.log("setting update")
      const now = new Date()
      this.addDataToDataBase([{date:now, lastUpdate:now}], "lastUpdate", dataBase, this.props.isThereData)

    }
    render(){
      console.log(this.props.isoDate)
        return(
            null
        )
    }
}

export default GetNewData
