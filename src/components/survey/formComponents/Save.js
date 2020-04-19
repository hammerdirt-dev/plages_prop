import React, {Component} from "react";
import { motion, AnimatePresence } from "framer-motion";
// import {selectionkeys, accordionContent, motionHeader} from '../MotionDivs'
// import {Beach_Data, Beach_Data_Version} from '../dataBaseVariables'
// import {SURVEY_TO_SERVER, DIMS_TO_SERVER} from '../apiUrls'
// import { saveToServer, }from '../jWTheaders'
// import {clearItem} from '../helperMethods'
// import '../rogers.css'
// import '../main-style.css'

class Save extends Component {
    constructor(props){
        super(props)
        this.state={
            can_save:false,
            to_device:false,
            post_message:"",
            used_key:[],
        }
        this.setExpanded = this.setExpanded.bind(this)
        this.onChange = this.onChange.bind(this)
        this.saveToDb = this.saveToDb.bind(this)
        this.packageToDb = this.packageToDb.bind(this)
        this.packageToServer = this.packageToServer.bind(this)
        this.toServer = this.toServer.bind(this)
        this.clearItemFromDb = this.clearItemFromDb.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        this.setState({
            ...this.props
        }, this.packageToServer())
    }
    componentDidUpdate(prevProps, prevState){
        console.log("Save recieved new props")
        if(this.props !== prevProps){
            this.setState({
                ...this.props
            }, this.packageToServer())
        }
    }
    componentWillUnmount(){
        this._isMounted = false
    }
    setExpanded(){
        this.setState({
            open:!this.state.open
        }, function(){if(this.state.open){this.packageToServer()}})
    }
    onChange(e){
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    packageToServer(){
        // pulling data to send to server
        let data_pack ={
            micro_weight:this.state.micro_weight,
            macro_weight:this.state.macro_weight,
            length:this.state.length,
            selected_items:this.state.selected_items,
            staff:this.state.staff,
            volunteers:this.state.volunteers,
            total_weight:this.state.total_weight,
            estimated_weights:this.state.estimated_weights,
            beach:this.state.beach,
            date:this.state.date,
            time:this.state.time,
            participants:this.state.participants,
            project:this.state.project
        }
        var can_send = 0
        // ensuring there are no null values in the form
        Object.entries(data_pack).forEach(([k,v]) =>{
            if(!v){
                can_send += -1
            }
        })
        if (can_send < 0){
            this.setState({
                can_save:false
            })
        }else{
            this.setState({
                can_save:true
            })
        }
    }
    async toServer(){
        // data for survey results table
        let data = this.state.codesAndQuantities.map(obj => Object.assign({}, {code:obj.code},{quantity:obj.quantity}, {location:this.state.selectedBeach}, {date:this.state.date}, {length:this.state.beachLength}))
        // key for indexedDB
        // let key = `${this.state.beach}${this.state.date}${this.state.length}`
        // data for the admin_data table
        let jsoned = JSON.stringify(this.state.particpatingGroups)
        const dims_data = {
            date: this.state.date,
            length: this.state.beachLength,
            area: this.state.beachArea,
            mac_plast_w: this.state.macroWeight,
            mic_plas_w: this.state.microWeight,
            total_w: this.state.totalWeight,
            est_weight: this.state.estimatedWeight,
            num_parts_staff: this.numberOfStaff,
            num_parts_other: this.state.numberOfVolunteers,
            time_minutes: this.state.timeInMinutes,
            location: this.state.selectedBeach,
            participants:jsoned,
            project:"2020",
            is_2020:true,
        }
        // post survey data
        let response_survey = await saveToServer("POST",data, SURVEY_TO_SERVER, this.props.token)
        console.log(response_survey.ok)
        if(response_survey.ok){
            let a_key = `${dims_data.location}${dims_data.date}${dims_data.length}`
            this.setState({
                post_message:"Saved to server successfull",
                used_key:this.state.used_key.concat(a_key),
                is_saved:true,
            })
        }else{
            this.setState({
                post_message:"Post to server failed",
                is_saved:false,
            })
        }
        // post admin data
        let response_dims = await saveToServer("POST",dims_data, DIMS_TO_SERVER, this.props.token)
        console.log(response_dims.ok)
        if(response_dims.ok){
            this.setState({post_message:"Saved to server successfull"})
        }else{
            this.setState({post_message:"Post to server failed"})
        }
    }
    packageToDb(){
        // key for indexedDB object store
        let key = `${this.state.beach}${this.state.date}${this.state.length}`
        // data to be saved
        let data = {surveyId:key,...this.state}
        this.saveToDb(data)
    }
    saveToDb(data){
        var request = indexedDB.open(Beach_Data, Beach_Data_Version)
        const transactionOutcome = (message) => {
            this.setState({save_to_db_message:message})
        }
        request.onsuccess = (event) => {
            let db = request.result
            let tx = db.transaction('draftSurvey', 'readwrite')
            let store = tx.objectStore('draftSurvey')
            store.put(data)
            tx.oncomplete = function(event){
                transactionOutcome("The inventory was saved")
            }
            tx.onerror = function(event){
                transactionOutcome("Unable to save to local")
            }
        }
    }
    clearItemFromDb(data){
        var request = indexedDB.open(Beach_Data, Beach_Data_Version)
        const transactionOutcome = (message) => {
            this.setState({save_to_db_message:message})
        }
        request.onsuccess = (event) => {
            let db = request.result
            let tx = db.transaction('draftSurvey', 'readwrite')
            let store = tx.objectStore('draftSurvey')
            let clear = store.delete(data)
            clear.onsuccess = function(event){
                transactionOutcome("The record was removed from local")
            }
            tx.oncomplete = function(event){
                transactionOutcome("The record was removed from local")
            }
            tx.onerror = function(event){
                transactionOutcome("Unable to remove local copy")
            }
        }
    }
    render(){
        return( <div className="display-block">
            <motion.header
                initial={true}
                variants={motionHeader}
                onClick={this.setExpanded}
                animate={this.state.open ? "open":"closed"}
                className="motion-header"
            >
                <div className="w-100P">
                    <h6 className="white-text">Save this survey</h6>
                </div>
            </motion.header>
            <AnimatePresence initial={false}>
                {this.state.open && (
                <motion.section
                    key={this.props.label}
                    animate={this.state.open ? "open":"closed"}
                    variants={accordionContent}
                    exit="closed"
                >
                {
                    <motion.div variants={selectionkeys} exit="closed" animate={this.state.open ? "open":"closed"} key={this.props.label} className="row-wrap j-start display-flex w-100P">
                            {
                                this.state.can_save && !this.state.is_saved ? (
                                    <label className="input-label">
                                    <span className="label-header">Push this to server</span>
                                    <button className="save-form-button" onClick={this.toServer}>
                                        To server
                                    </button>
                                    <div>{this.state.post_message}</div>
                                    </label>

                                ):this.state.can_save && this.state.is_saved ? (<label className="input-label">
                                <span className="label-header">Push this to server</span>
                                <button className="save-form-button a-red-background" onClick={this.toServer} type="button" disabled={true}>
                                    {this.state.post_message}
                                </button>

                                </label>):(
                                    <label className="input-label">
                                    <span className="label-header ">The form is not complete</span>
                                    <button className="disable-save-form a-fadedblue-background" type="button" disabled={true}>
                                        Unable to push data
                                    </button>
                                    </label>
                                )
                            }{
                                this.state.beach && this.state.length && this.state.date ? (
                                    <label className="input-label">
                                        <span className="label-header">Save on this device</span>
                                        <button onClick={this.packageToDb} className="save-form-button">
                                            To device
                                        </button>
                                        <span className="label-header">{this.state.save_to_db_message}</span>
                                    </label>
                                ):(
                                    <label className="input-label">
                                        <span className="label-header">Missing some data</span>
                                        <button className="save-form-button" disabled={true}>
                                            Unable to save
                                        </button>
                                        <span className="label-header">{this.state.save_to_db_message}</span>
                                    </label>
                                )
                            }
                    </motion.div>
                }
                </motion.section>
                )}
            </AnimatePresence>
            </div>
        )
    }
}

export default Save
