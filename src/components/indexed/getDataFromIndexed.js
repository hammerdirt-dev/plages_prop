import { Component } from 'react'
import {
    name,
    version,
    theDataStores

} from '../../shared/globals/variablesToEdit'
import {indexGetAllFromStores} from '../../shared/utilities/indexeddb/indexeddb'

class GetDataFromIndexed extends Component {
    componentDidMount() {
        console.log("mounting getDataFromIndexed")
        this._isMounted = true
        const storeNames = theDataStores.map(obj => obj.store)
        indexGetAllFromStores(storeNames, name, version, this.props.statusCallBack,this.props.dataCallBack)
    }
    componentDidUpdate(prevProps, prevState){
        if (this.props.indexedData && this.props.indexedData !== prevProps.indexedData){
            const storeNames = theDataStores.map(obj => obj.store)
            indexGetAllFromStores(storeNames, name, version, this.props.statusCallBack,this.props.dataCallBack)
        }
    }
    componentWillUnmount(){
        console.log("unmounting add data")
        this._isMounted = false
    }
    render(){
        return(
            null
        )
    }
}

export default GetDataFromIndexed
