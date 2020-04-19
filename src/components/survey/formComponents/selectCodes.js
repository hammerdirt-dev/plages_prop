import React, {Component} from "react";
import {slideDownAuto} from '../../../shared/utilities/framer/variants'
import '../../../shared/css/grids.css'
import '../../../shared/css/main.css'
import '../../../shared/css/blocks.css'
import Button from '../../../shared/components/button/buttons'
import DisableButton from '../../../shared/components/button/disableButtons'
import {motion} from 'framer-motion'

class SelectCodes extends Component {
    constructor(props){
        super(props)
        this.state={
            filteredCodes:[],
            selectedCode:"",
            disableButton:true,
        }
        this.selectMaterial = this.selectMaterial.bind(this)
        this.selectCode = this.selectCode.bind(this)
        this.filterCodes = this.filterCodes.bind(this)
        this.searchTerm = this.searchTerm.bind(this)
        this.codeQuantity = this.codeQuantity.bind(this)
        this.addToInventory = this.addToInventory.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        this.filterCodes = this.filterCodes.bind(this)
    }
    componentWillUnmount(){
        this._isMounted = false
    }
    filterCodes(targetValue){
        let searchTerm = targetValue.toLowerCase()
        let filteredCodes = this.props.codes.filter(obj => obj.code.toLowerCase().startsWith(searchTerm, 1))
        this.setState({filteredCodes:filteredCodes})
    }
    searchTerm(e){
        e.preventDefault()
        this.setState({
            searchTerm:e.target.value
        },this.filterCodes(e.target.value))
    }
    selectMaterial(e){
        e.preventDefault()
        const materialGroups = () => {
            if(this.props.codes){
                return ({
                    Plastic:this.props.codes.filter(obj => obj.material === "Plastic"),
                    Wood:this.props.codes.filter(obj => obj.material === "Wood"),
                    Metal:this.props.codes.filter(obj => obj.material === "Metal"),
                    Rubber:this.props.codes.filter(obj => obj.material === "Rubber"),
                    Paper:this.props.codes.filter(obj => obj.material === "Paper"),
                    Glass:this.props.codes.filter(obj => obj.material === "Glass"),
                    Unidentified:this.props.codes.filter(obj => obj.material === "Unidentified")
                })
            }
        }
        this.setState({
            filteredCodes:materialGroups()[e.target.id]
        })
    }
    selectCode(e){
        e.preventDefault()
        this.setState({
            selectedCode:e.target.id,
            filteredCodes:[]
        })
    }
    codeQuantity(e){
        e.preventDefault()
        this.setState({
            codeQuantity:e.target.value,
            disableButton:false,
        })
    }
    addToInventory(e){
        e.preventDefault()
        let codeAndQuantity = {name:"codeAndQuantity", code:this.state.selectedCode, quantity:this.state.codeQuantity}
        this.props.addToInventory(codeAndQuantity)
        this.setState({
            disableButton:true,
            codeQuantity:"",
            selectedCode:"",
            searchTerm:"",
        })
    }
    render(){
        return(
                <div className="inner-column-div">
                    <div className="form-section-header">
                        <h6 className=" text-center">Add objects to survey</h6>
                        <p className="">Select material type or enter a code number to see available choices: </p>
                    </div>
                    <div className="row-wrap">
                         <Button
                             buttonclass="formButton"
                             id="Plastic"
                             callback={this.selectMaterial}
                             label="Plastic"
                         />
                         <Button
                             buttonclass="formButton"
                             id="Wood"
                             callback={this.selectMaterial}
                             label="Wood"
                         />
                         <Button
                             buttonclass="formButton"
                             id="Rubber"
                             callback={this.selectMaterial}
                             label="Rubber"
                         />
                         <Button
                             buttonclass="formButton"
                             id="Paper"
                             callback={this.selectMaterial}
                             label="Paper"
                         />
                         <Button
                             buttonclass="formButton"
                             id="Metal"
                             callback={this.selectMaterial}
                             label="Metal"
                         />
                         <Button
                             buttonclass="formButton"
                             id="Glass"
                             callback={this.selectMaterial}
                             label="Glass"
                         />
                         <Button
                             buttonclass="formButton"
                             id="Unidentified"
                             callback={this.selectMaterial}
                             label="Unidentified"
                         />
                    </div>
                    <div className="row-wrap">
                        <label className="display-inline-b label-position label-format">
                            <h6 className="">Or search by code:</h6>
                            <input
                                className="inputTall"
                                type="number"
                                id="codeSearch"
                                name="codeSearch"
                                value={this.state.searchTerm || ""}
                                onChange={this.searchTerm}
                            />
                        </label>
                    </div>
                    <motion.div
                        variants={slideDownAuto}
                        initial={false}
                        animate={this.state.filteredCodes ? "open":"closed"}
                        className="row-wrap-stretch"
                        >
                        {
                            this.state.filteredCodes ?
                                this.state.filteredCodes.map((a_lake, i) =>
                                    <Button
                                        key={i}
                                        buttonclass="formButton formButtonBorder"
                                        id={a_lake.code}
                                        value={a_lake.code}
                                        callback={this.selectCode}
                                        label={`${a_lake.code}: ${a_lake.description}`}
                                    />
                                ):<div>There was an error, sorry.</div>
                        }
                    </motion.div>
                    <div className="row-wrap label-format">
                        {
                            this.state.selectedCode ? <h6 className="">Code selected: {this.state.selectedCode}</h6>:null
                        }
                    </div>
                    <div className="row-wrap" >
                        <label className="display-inline-b label-position label-format">
                            <h6 className="">Quantity:</h6>
                            <input
                                className="inputTall"
                                type="number"
                                min="1"
                                id="codeQuantity"
                                name="codeQuantity"
                                value={this.state.codeQuantity || ""}
                                onChange={this.codeQuantity}
                            />
                        </label>
                    </div>
                    <div className="row-wrap label-format">
                        {
                            this.state.selectedCode && this.state.codeQuantity ? (
                                <DisableButton
                                    buttonclass="formButtonSelect"
                                    id="addToSurvey"
                                    value={{code:this.state.selectedCode, quantity:this.state.codeQuantity}}
                                    callback={this.addToInventory}
                                    label={`Add ${this.state.codeQuantity} of ${this.state.selectedCode} to survey`}
                                    disabled={this.state.disableButton}
                                />
                            ):null
                        }
                    </div>
                </div>
        )
    }
}

export default SelectCodes
