import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import '../../shared/css/buttons.css'
import Button from '../../shared/components/button/buttons'
import {Close, Check} from '../../shared/components/icons/icon'
import DisableButton from '../../shared/components/button/disableButtons'
import VerticalButtonBlock from '../../shared/components/blocks/verticalButtonBlock'
import BeachDate from './formComponents/beachDate'
import SelectCodes from './formComponents/selectCodes'
import EmptyModal from '../../shared/components/modal/emptyModal'
import {
    SURVEY_TO_SERVER,
    DIMS_TO_SERVER
} from '../api/apiUrls'
import ServerReplyModal from '../api/serverReplyModal'
import {saveToDb, clearItemFromDb} from '../../shared/utilities/indexeddb/indexeddb'

import {
    validateThese,
    can_never_be_zero,
    can_be_zero,
    PARTICIPATING,
    name,
    version
} from '../../shared/globals/variablesToEdit'

class Survey extends Component{
    constructor(props){
        super(props);
        this.state = {
            codesAndQuantities:[],
            canPostToServer:false,
            canPostToLocal:false,
            particpatingGroups:[],
            missingValues:[],
            validatedProperties:[],
            seeModal:false,
            validating:"",
        }
        this.logData = this.logData.bind(this)
        this.addToInventory = this.addToInventory.bind(this)
        this.removeFromInv = this.removeFromInv.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.postToServer = this.postToServer.bind(this)
        this.postToLocal = this.postToLocal.bind(this)
        this.isValid = this.isValid.bind(this)
        this.addGroup = this.addGroup.bind(this)
        this.dropGroup = this.dropGroup.bind(this)
        this.postHeaders = this.postHeaders.bind(this)
        this.makePostRequest = this.makePostRequest.bind(this)
        this.saveToServer = this.saveToServer.bind(this)
        this.dimResponse = this.dimResponse.bind(this)
        this.surveyResponse = this.surveyResponse.bind(this)
        this.seeModal = this.seeModal.bind(this)
        this.indexedResponse = this.indexedResponse.bind(this)
        this.loadSaved = this.loadSaved.bind(this)
        this.deleteLocalCopy = this.deleteLocalCopy.bind(this)
    };
    componentDidMount(){
        this._isMounted = true
    }
    componentDidUpdate(prevProps, prevState){
        console.log("surveys received some new props")
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    selectDate(e){
        e.preventDefault()
        this.setState({
            date:e.target.value,
            canPostToServer:false,
        })
    }
    loadSaved(e){
        e.preventDefault()
        let load_this = this.props.draftSurvey.result.filter(obj => obj.surveyId === e.target.value)
        this.setState({
            ...load_this[0]
        })
    }
    logData(e){
        e.preventDefault()
        this.setState({
            [e.target.id]:e.target.value,
            canPostToServer:false,
        })
    }
    seeModal(e){
        console.log("see modal called")
        e.preventDefault()
        this.setState({
            seeModal:!this.state.seeModal
        })
    }
    addToInventory(obj){
        if(obj.name === "codeAndQuantity"){
            let a_new_list = this.state.codesAndQuantities.slice()
            a_new_list.push(obj)
            this.setState({
                codesAndQuantities:a_new_list,
                canPostToServer:false,
            })
        }else if(obj.name === "particpatingGroups"){
            let a_new_list = this.state.particpatingGroups.slice()
            a_new_list.push(obj)
            this.setState({
                particpatingGroups:a_new_list,
                canPostToServer:false,
            })
        }
    }
    removeFromInv(e){
        e.preventDefault()
        let a_list = this.state.codesAndQuantities.slice()
        let removed = a_list.filter(obj => obj.code !== e.target.value)
        this.setState({
            codesAndQuantities:removed,
            canPostToServer:false,
        })
    }
    validateForm(e){
        e.preventDefault()
        console.log("Validating form data");
        let missingValues = []
        let validated = []
        const isNotUndefined = (a_list) => {
            let no_objects = this.state.codesAndQuantities.filter(obj => obj.code === "G999")
            if(no_objects.length){
                this.setState({
                    codesAndQuantities:[{name:"codeAndQuantity", code:"G999", quantity:1}]
                })
                var [totalWeight, ...rest]  = can_never_be_zero
                let could_be_zero = [totalWeight, ...can_be_zero]
                a_list.forEach(property =>{
                    if(rest.includes(property)){
                        if(property === "codesAndQuantities" || property === "particpatingGroups" || property==="date" || property === "selectedBeach" ){
                            if (this.state[property] &&  this.state[property].length){
                                validated.push(property)
                            }else{
                                missingValues.push(property)
                            }
                        }else{
                            if(this.state[property] && parseInt(this.state[property]) > 0){
                                validated.push(property)
                            }else{
                                missingValues.push(property)
                            }
                        }
                    }else if(could_be_zero.includes(property)){
                        if(this.state[property]){
                            validated.push(property)
                        }else{
                            missingValues.push(property)
                        }
                    }
                })
            }else{
                a_list.forEach(property =>{
                    if(can_never_be_zero.includes(property)){
                        if(property === "codesAndQuantities" || property === "particpatingGroups" || property === "date" || property === "selectedBeach"){
                            if (this.state[property] &&  this.state[property].length){
                                validated.push(property)
                            }else{
                                missingValues.push(property)
                            }
                        }else{
                            if(this.state[property] && parseFloat(this.state[property]) > 0.0001){
                                validated.push(property)
                            }else{
                                missingValues.push(property)
                            }
                        }
                    }else if(can_be_zero.includes(property)){
                        if(this.state[property]){
                            validated.push(property)
                        }else{
                            missingValues.push(property)
                        }
                    }
                })
            }
            this.setState({
                missingValues:missingValues,
                validatedProperties:validated,
                canPostToServer:missingValues.length ? false:this.props.network
            })
        }
        isNotUndefined(validateThese)
    }
    dimResponse(obj){
        this.setState({
            dimResponse:obj
        })
    }
    surveyResponse(obj){
        this.setState({
            surveyResponse:obj
        })
    }
    postHeaders = (theToken) => {
        console.log("making post headers")
        const authHeader = {"Authorization":`JWT ${theToken}`}
        const appHeader = {"Content-Type": "application/json"}
        const headers = {...authHeader, ...appHeader}
        return headers
    }
    makePostRequest = (putOrPost,url, headers, localdraft) => {
        return (
            fetch(url, {
                method: putOrPost,
                headers: headers,
                body:localdraft
            })
        )
    }
    saveToServer = async (putOrPost,jsonData, url, theToken, theResponse) =>{
        const serverPayLoad = JSON.stringify(jsonData)
        let the_response
        if(serverPayLoad){
            const headers = this.postHeaders(theToken)
            const makeRequest = this.makePostRequest(putOrPost,url, headers, serverPayLoad)
            the_response = await makeRequest.then(response => {return {ok:response.ok, status:response.status}})
            theResponse(the_response)
        }
    }
    postToServer(e){
        e.preventDefault()
        console.log("Posting to server")
        let the_groups = this.state.particpatingGroups.map(obj => obj.id)
        let data = this.state.codesAndQuantities.map(obj => Object.assign({}, {code:obj.code},{quantity:obj.quantity}, {location:this.state.selectedBeach}, {date:this.state.date}, {length:this.state.beachLength}))
        let jsoned = JSON.stringify(the_groups)
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
        this.setState({
            dimData:dims_data,
            survey_data:data,
            seeModal:true
        })
        this.saveToServer("POST",dims_data, DIMS_TO_SERVER, this.props.token, this.dimResponse)
        this.saveToServer("POST",data, SURVEY_TO_SERVER, this.props.token, this.surveyResponse)
    }
    indexedResponse(message){
        this.setState({
          seeModal:true,
          surveyDataResponse:"survey data",
          postToLocal:message
        })
    }
    postToLocal(){
        console.log("saving to local")
        let keydata = `${this.state.selectedBeach}${this.state.date}${this.state.beachLength}`
        let {canPostToServer, canPostToLocal,missingValues,validatedProperties,seeModal,validating,...rest} = this.state
        saveToDb(name, version, "draftSurvey",{surveyId:keydata,...rest}, this.indexedResponse)

    }
    isValid(obj){
        if(this.state.validatedProperties.includes(obj)){
            return (<Check color="green" size={20}/>)
        }else{
            return (<Close color="red" size={20} />)
        }
    }
    addGroup(e){
        e.preventDefault()
        let groups = this.state.particpatingGroups.slice()
        let new_group = PARTICIPATING.filter(obj => obj.id === e.target.value)
        groups.push(new_group[0])
        this.setState({
            particpatingGroups:groups
        })
    }
    dropGroup(e){
        e.preventDefault()
        let groups = this.state.particpatingGroups.slice()
        let new_groups = groups.filter(obj => obj.id !== e.target.value)
        this.setState({
            particpatingGroups:new_groups
        })
    }
    deleteLocalCopy(e){
        e.preventDefault()
        const indexedCallback = (response)=>{
          this.setState({
            data_removed:response
          })
        }
        clearItemFromDb(e.target.value, name, version,indexedCallback)
    }
    render(){
        const lakesAndRivers = (lakes) => {
            if(this.props.beachCategories){
                const places = this.props.beachCategories.filter(obj => obj.category === lakes)
                return places
            }else{
                return null
            }
        }
        const a_code_list = (some_data) => {
            if(this.state.codesAndQuantities.length){
                let usedCodes = this.state.codesAndQuantities.map(obj => obj.code)
                let new_list = this.props.codes.filter(obj => !usedCodes.includes(obj.code))
                return (new_list)
            }else{
                return (some_data)
            }
        }
        const localSave = () => {
            if(this.state.selectedBeach && this.state.date && this.state.beachLength){
                return true
            }else{
                return false
            }
        }
        return(

            <motion.div
                className="motion-cont"
                display="block"
                initial="open" exit="closed"
                variants={slideIn}
                >
                    <EmptyModal
                        showMe={this.state.seeModal}
                        component={
                            <ServerReplyModal
                                callback={this.seeModal}
                                dimsDataResponse={this.state.dimResponse}
                                surveyDataResponse={this.state.surveyResponse}
                                postToLocal={this.state.postToLocal}
                            />
                         }
                    />
                    <AnimatePresence initial={true}>
                        <motion.div
                            className="outer-row"
                            initial="open"  exit="closed"
                            variants={slideIn}
                            >
                            <div className="column-full-width" >
                                <div className="inner-column">
                                    <div className="inner-column-div">
                                        <div className="form-section-header">
                                            <h6 className="text-center">Saved surveys on this device:</h6>
                                        </div>
                                        {
                                            this.props.draftSurvey ?
                                                this.props.draftSurvey.result.map(obj =>
                                                    (<div key={obj.selectedBeach} className="row-no-wrap">
                                                        <Button label={`Load ${obj.selectedBeach}, ${obj.date}`} buttonclass="formButtonSelect" value={obj.surveyId} callback={this.loadSaved} />
                                                        <Button label={`Delete ${obj.selectedBeach}, ${obj.date}`} buttonclass="formButtonSelect" value={obj.surveyId} callback={this.deleteLocalCopy} />
                                                    </div>)
                                            ):(
                                                <p>
                                                    No surveys saved on this device
                                                </p>
                                            )
                                        }
                                        <div className="form-section-header">
                                            <h6 className="text-center">Location and date </h6>
                                        </div>
                                        <BeachDate
                                            logData={this.logData}
                                            my_beaches={JSON.parse(this.props.userdata.my_beaches)}
                                            lakes={lakesAndRivers('lakes')}
                                            rivers={lakesAndRivers('rivers')}
                                            beachesByCategory={this.props.beachesByCategory}
                                            addToInventory = {this.addToInventory}
                                        />
                                        <div className="row-wrap-stretch">
                                            <label className="display-inline-b label-position label-format">
                                                <h6 className="text-blue">Selected location:</h6>
                                                <h6 className="text-blue">
                                                    {
                                                        this.state.selectedBeach ? (this.state.selectedBeach):("No beach selected")
                                                    }
                                                </h6>
                                            </label>
                                            <label className="display-inline-b label-position label-format">
                                                <h6 className="">Select a date:</h6>
                                                <input
                                                    className="inputTall"
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={this.state.date || ""}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="inner-column-div">
                                        <div className="form-section-header">
                                            <h6 className=" text-center">People and time</h6>
                                        </div>
                                        <div className="row-wrap-stretch">
                                            <label className="display-inline-b label-position label-format">
                                                     <h6 className="">Staff members:</h6>
                                                     <input
                                                        className="inputTall"
                                                        type="number"
                                                        min="1"
                                                        id="numberOfStaff"
                                                        name="numberOfStaff"
                                                        value={this.state.numberOfStaff || ""}
                                                        onChange={this.logData}
                                                     />
                                            </label>
                                            <label className="display-inline-b label-position label-format">
                                                     <h6 className="">Volunteers:</h6>
                                                     <input
                                                        className="inputTall"
                                                        type="number"
                                                        min="0"
                                                        id="numberOfVolunteers"
                                                        name="numberOfVolunteers"
                                                        value={this.state.numberOfVolunteers || ""}
                                                        onChange={this.logData}
                                                     />
                                            </label>
                                            <label className="display-inline-b label-position label-format">
                                                     <h6 className="">Time in minutes:</h6>
                                                     <input
                                                        className="inputTall"
                                                        type="number"
                                                        min="1"
                                                        id="timeInMinutes"
                                                        name="timeInMinutes"
                                                        value={this.state.timeInMinutes || ""}
                                                        onChange={this.logData}
                                                     />
                                            </label>
                                            <div className="row-no-wrap">
                                                <h6>Partcipating groups:</h6>
                                            </div>
                                            <div className="row-no-wrap">
                                                <VerticalButtonBlock
                                                    addGroup={this.addGroup}
                                                    dropGroup={this.dropGroup}
                                                    selected={this.state.particpatingGroups}
                                                    choices={PARTICIPATING}
                                                    />
                                            </div>
                                        </div>
                                        <div className="form-section-header">
                                            <h6 className=" text-center">Weights and measures</h6>
                                        </div>
                                        <div className="row-wrap-stretch">
                                            <label className="label-position label-format">
                                                <h6 className="">Beach length meters:</h6>
                                                <input
                                                    className="inputTall"
                                                    type="number"
                                                    min="0"
                                                    id="beachLength"
                                                    name="beachLength"
                                                    value={this.state.beachLength || ""}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="label-position label-format">
                                                <h6 className="">Beach area meters<sup>2</sup>:</h6>
                                                <input
                                                    className="inputTall"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    id="beachArea"
                                                    name="beachArea"
                                                    value={this.state.beachArea || ""}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                        </div>
                                        <div className="row-wrap-stretch">
                                            <label className="label-position label-format">
                                                <h6 className="">Weight micro-plas grams:</h6>
                                                <input
                                                    className="inputTall"
                                                    type="number"
                                                    min="0"
                                                    max="9999.999"
                                                    step="0.001"
                                                    id="microWeight"
                                                    name="microWeight"
                                                    value={this.state.microWeight || ""}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="label-position label-format">
                                                <h6 className="">Weight macro-plas grams:</h6>
                                                <input
                                                    className="inputTall"
                                                    type="number"
                                                    min="0"
                                                    max="99999.999"
                                                    step="0.001"
                                                    id="macroWeight"
                                                    name="macroWeight"
                                                    value={this.state.macroWeight || ""}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                        </div>
                                        <div className="row-wrap-stretch">
                                            <label className="label-position label-format">
                                                <h6 className="">Weight estimated kg:</h6>
                                                <input
                                                    className="inputTall"
                                                    type="number"
                                                    min="0"
                                                    id="estimatedWeight"
                                                    name="estimatedWeight"
                                                    value={this.state.estimatedWeight || ""}
                                                    onChange={this.logData}
                                                    />
                                            </label>
                                            <label className="label-position label-format">
                                                <h6 className="">Total weight kg:</h6>
                                                <input
                                                    className="inputTall"
                                                    type="number"
                                                    min="0"
                                                    max="999.999"
                                                    step="0.001"
                                                    id="totalWeight"
                                                    name="totalWeight"
                                                    value={this.state.totalWeight || ""}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <SelectCodes
                                        logData={this.logData}
                                        codes={a_code_list(this.props.codes)}
                                        addToInventory = {this.addToInventory}
                                    />
                                    <div className="inner-column-div">
                                        <div className="row-wrap">
                                            <div className="table-div">
                                            <div className="t-row-header-label">
                                                Survey data for:
                                            </div>
                                                <div className="t-row-section-label">
                                                    {this.state.selectedBeach}
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Date
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.date}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('date')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Survey length
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.beachLength}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('beachLength')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Survey area
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.beachArea}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('beachArea')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Weight macro plastic
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.macroWeight}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('macroWeight')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Weight micro plastic
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.microWeight}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('microWeight')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Esitmated weights
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.estimatedWeight}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('estimatedWeight')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Total weight
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.totalWeight}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('totalWeight')}
                                                    </div>
                                                </div>
                                                <div className="t-row-header-label">
                                                    People and time
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Number of staff
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.numberOfStaff}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('numberOfStaff')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Number of volunteers
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.numberOfVolunteers}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('numberOfVolunteers')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Time in minutes
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.timeInMinutes}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('timeInMinutes')}
                                                    </div>
                                                </div>
                                                <div className="t-row-data">
                                                    <div className="t-row-label">
                                                        Partcipating groups
                                                    </div>
                                                    <div className="t-row-quantity">
                                                        {this.state.particpatingGroups.length}
                                                    </div>
                                                    <div className="t-row-validated">
                                                        {this.isValid('particpatingGroups')}
                                                    </div>
                                                </div>
                                                <div className="t-row-header-label">
                                                    Inventory items
                                                </div>
                                                {
                                                    this.state.codesAndQuantities.length ?
                                                        this.state.codesAndQuantities.map( obj =>
                                                            (<div key={obj.code} className="t-row-row">
                                                                <div className="t-row-code">
                                                                    {`${obj.code}: ${obj.description}`}
                                                                </div>
                                                                <div className="t-row-code-quantity">
                                                                    {obj.quantity}
                                                                </div>
                                                                <div className="t-row-remove">
                                                                <Button
                                                                    buttonclass="formButton"
                                                                    active={true}
                                                                    style={{fontSize:".9rem", padding:".1rem"}}
                                                                    id={obj.code}
                                                                    value={obj.code}
                                                                    callback={this.removeFromInv}
                                                                    label="Remove"
                                                                />
                                                                </div>
                                                            </div>)
                                                        ):null
                                                }
                                                <div className="t-row-header-label">
                                                    To edit an object you must remove it from the inventory. Then add the correct values.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row-wrap-stretch">
                                            <label className="label-flex label-format">
                                            {
                                                this.state.canPostToServer ? (
                                                    <>
                                                    <h6>Post to server</h6>
                                                    <DisableButton
                                                        buttonclass="formButtonSelect"
                                                        id="postToserver"
                                                        callback={this.postToServer}
                                                        label={`I affirm that this information was collected in accordance with current project protocols`}
                                                        disabled={this.state.canPostToServer ? false:true}
                                                    />
                                                    </>
                                                ):(
                                                    <>
                                                    <h6>Validate form</h6>
                                                    <Button
                                                        buttonclass="formButtonSelect"
                                                        id="validatePostToServer"
                                                        callback={this.validateForm}
                                                        label={`Validate the form data to post to server`}
                                                    />
                                                    </>
                                                )
                                            }
                                            </label>
                                            <label className="label-flex label-format">
                                                    <h6>Post to local</h6>
                                                    <DisableButton
                                                        buttonclass="formButtonSelect"
                                                        id="postToLocal"
                                                        active={true}
                                                        style={{padding:"1rem"}}
                                                        callback={this.postToLocal}
                                                        label={localSave() ? `Saving this data to my local device.`:`Date, length and location are required`}
                                                        disabled={!localSave()}
                                                    />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        )
    }
}

export default Survey
