import React, {Component} from 'react'
import {AnimatePresence } from 'framer-motion'
import '../../shared/css/grids.css'
import '../../shared/css/navigation.css'
import {
    appsToLoad,
    name,
    version,
    theDataStores,
    } from '../../shared/globals/variablesToEdit'
import '../../shared/css/main.css'
import FetchData from '../api/fetchData'
import Header from '../../shared/components/header/header'
import LogIn from '../authentication/authentication'
import Footer from '../../shared/components/footer/footer'
import GetNewData from '../indexed/AddDataToDataBase'
import GetDataFromIndexed from '../indexed/getDataFromIndexed'
import Modal from '../../shared/components/modal/modal'
import {
    checkForDb,
    indexGetAllFromStore,
    } from '../../shared/utilities/indexeddb/indexeddb'
import {getBySubject} from '../../shared/utilities/jsHelper/helperMethods'
import {ARE_WE_ONLINE} from '../api/apiUrls'
import Prism from "prismjs"
import NoDataNoNetwork from '../noDataNoNetwork/noDataNoNetwork'

class AppWrapper extends Component{
    constructor(){
        super();
        this.state = {
            loggedin:false,
            network:false,
            indexed:false,
            indexedData:false,
            updateDB:false,
            lastUpdate:false,
            updateComponent:"",
            currentapp:"",
            userdata:false,
            locationdata:false,
            authData:true,
            updated:[],
            currentArticles:false,
        }
        this.requestedApp = this.requestedApp.bind(this)
        this.dataBaseState = this.dataBaseState.bind(this)
        this.networkStatus = this.networkStatus.bind(this)
        this.calendarCallback = this.calendarCallback.bind(this)
        this.calendarError = this.calendarError.bind(this)
        this.requestLogIn = this.requestLogIn.bind(this)
        this.loginStatus = this.loginStatus.bind(this)
        this.dataBaseCallBack = this.dataBaseCallBack.bind(this)
        this.authData = this.authData.bind(this)
        this.updateDB = this.updateDB.bind(this)
        this.lastUpdate = this.lastUpdate.bind(this)
        this.updateDBStatus = this.updateDBStatus.bind(this)
        this.getAllStores = this.getAllStores.bind(this)
        this.isThereData = this.isThereData.bind(this)
    };
    async componentDidMount(){
        this.setState({
          indexed:checkForDb(window)
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.indexed && this.state.indexed !== prevState.indexed){
          // if there is an indexedDB check the last update
          // and upgrade the db if needed.
          indexGetAllFromStore("lastUpdate", name, version, this.dataBaseState, this.isThereData)
        }if(this.state.currentArticles !== prevState.currentArticles && !this.state.fieldNotes){
          console.log("calling for dev and field notes")
          var fieldNotes = getBySubject(this.state.currentArticles, "Field notes")
          var devNotes = getBySubject(this.state.currentArticles, "Dev notes")
          if(fieldNotes || devNotes){
            var latestDevNotes = devNotes.sort((a,b) => new Date(a.last_edit.slice(10)) - new Date(b.last_edit.slice(10)))
            var latestFieldNotes = fieldNotes.sort((a,b) => new Date(a.last_edit.slice(10)) - new Date(b.last_edit.slice(10)))
            this.setState({
              fieldNotes:latestFieldNotes[0],
              devNotes:latestDevNotes[0]
              })
            }
        }if(this.state.loggedin !== prevState.loggedin){
          var draftSurveys = indexGetAllFromStore('draftSurvey',name,version, this.dataBaseState, this.dataBaseCallBack)
          if (this.state.loggedin){
            let the_user = this.state.users.filter(obj => obj.username == this.state.username)
            this.setState({
                draftSurvey:draftSurveys,
                userdata:the_user[0]
            })
           }

        }
    }
    isThereData(obj){
      // if the database has a date value for last updated
      // then there is data in the db
      if(obj.result.length){
        const a_date = new Date(obj.result[0].date)
        let day = a_date.getDate()
        let month = a_date.getMonth() + 1
        let year = a_date.getFullYear()
        const newDate =  year + "/" + month + "/" + day;
        this.setState({
            [obj.name]:obj,
            indexedData:true,
            currentapp:"Home",
            updateComponent:newDate,
            isoDate:a_date ? a_date.toISOString():false
        })
      }else{
        this.setState({
            [obj.name]:obj,
            indexedData:false
        })
      }
    }
    dataBaseState(obj){
      // returns {status:true, action:"transaction", store:`${name}DbTx`}
      // from the txSuccessFunction on the db
      this.setState({
          [obj.store]:obj.status
      })
    }
    dataBaseCallBack(obj){
      // returns the data from the call to indexed db
      // {name:storeName,result:data}
      this.setState({
          [obj.name]:obj
      })
    }
    getAllStores(obj){
      this.setState({
            ...obj.result
        })
    }
    networkStatus(obj){
        this.setState({
            network:obj.status,
        })
    }
    requestLogIn(){
        this.setState({
            logMeIn:!this.state.logMeIn
        })
    }
    loginStatus(obj){
        console.log(obj)
        this.setState(
            obj
        )
    }
    requestedApp(e){
        e.preventDefault()
        if(e.target.id === "LogMeIn"){
            this.requestLogIn()
        }else if(e.target.id === "updateDB"){
            this.authData()
        }else{
            this.setState({
                currentapp:e.target.id
            })
        }
    }
    authData(){
        this.setState({
            authData:!this.state.authData
        })
    }
    updateDB(){
        this.setState({
            updateDB:true,
            updated:[],
            theDataStoresLength:theDataStores.length +1
        })
    }
    updateDBStatus(a_store){
        var new_array = this.state.updated.slice();
        new_array.push(a_store)
        this.setState({
            updated:new_array,
            dbIsUpdated:true,
        })
    }
    lastUpdate(obj){
        this.setState({
            lastUpdate:obj
        })
    }
    calendarCallback(days){
      this.setState({
            events:days,
        })
    }
    calendarError(error){
        this.setState({
            calendarError:error,
        })
    }

    render(){
        console.log(this.state.userdata)
        const availableApps = appsToLoad(this.state)
        const headerProps = {
            updateComponent:this.state.updateComponent,
            currentapp:this.state.currentapp,
            requestedApp:this.requestedApp,
            loggedin:this.state.loggedin,
            network:this.state.network,
            indexedData:this.state.indexedData,
            indexed:this.state.indexed,
            updateDb:this.authData,
        }
        const dataBaseUpdateContent = () => {
            if(!this.state.updateComponent){
                return (
                    <>
                        <p>You have no project data on your device. Click "update data" to use this app.</p>
                        <p>Certain portions of this app will not be available if you do not.</p>
                    </>
                    )
                }else{
                    return(
                        <p className="pad-one-rem">Your last update was on {this.state.updateComponent}. <br/>Click "Update data" to get the latest surveys</p>
                    )
                }
        }
        return(
            <div className="the-container">
              {
                this.state.network ? (
                  <>
                  <LogIn
                      logMeIn={this.state.logMeIn}
                      callBack={this.requestLogIn}
                      reportStatus={this.loginStatus}
                  />
                  <Modal
                      modalControlProps={{callback:this.authData, buttonclass:"navButton", label:"Close"}}
                      modalCallBackProps={{callback:this.updateDB, buttonclass:"navButton", label:"Update data"}}
                      showMe={this.state.authData}
                      modalTitleProps={{className:"section-block rubik", content:<h6 className="text-white text-center">Update the data on device</h6>}}
                      modalContentProps={{className:"inputDiv", content:dataBaseUpdateContent()}}
                  />

                </>):null
              }
              <Header {...headerProps} />
              {
                this.state.network && this.state.updateDB ? (
                  <GetNewData
                    getData={this.state.updateDB}
                    updateDBStatus={this.updateDBStatus}
                    isThereData={this.isThereData}
                    isoDate={this.state.isoDate}
                  />

                  ):null
                }
                <FetchData url={ARE_WE_ONLINE}
                    label={"Network"}
                    callback={this.networkStatus}
                    network={this.state.network}
                    calendarCallback={this.calendarCallback}
                    calendarError = {this.calendarError}
                />
                {
                    this.state.indexedData ? (
                        <GetDataFromIndexed
                          dataCallBack={this.getAllStores}
                          statusCallBack={this.dataBaseState}
                          indexedData={this.state.indexedData}
                        />):null
                }
                {
                  this.state.indexedData ? (
                    <AnimatePresence initial={true}>
                    {
                        availableApps[this.state.currentapp]
                    }
                    </AnimatePresence>):(
                      <NoDataNoNetwork />
                    )

                }
                <Footer {...headerProps} />
            </div>
        )
    }
}

export default AppWrapper
