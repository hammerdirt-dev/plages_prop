import React, {Component} from "react";
import {slideDownAuto} from '../../../shared/utilities/framer/variants'
import '../../../shared/css/grids.css'
import '../../../shared/css/main.css'
import '../../../shared/css/blocks.css'
import Button from '../../../shared/components/button/buttons'
import {motion} from 'framer-motion'

class BeachDate extends Component {
    constructor(props){
        super(props)
        this.state={
            filtered_beaches:[],
        }
        this.selectType = this.selectType.bind(this)
        this.selectRegion = this.selectRegion.bind(this)
        this.selectBeach = this.selectBeach.bind(this)
        this.selectedBeach = this.selectedBeach.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount(){
        this._isMounted = false
    }
    selectType(e){
        e.preventDefault()
        this.setState({
            beachSearchCategory:e.target.id
        })
    }
    selectRegion(e){
        e.preventDefault()
        this.setState({
            region:e.target.id
        })
    }
    selectBeach(e){
        e.preventDefault()
        this.setState({
            selectBeach:e.target.id
        })
    }
    selectedBeach(e){
        e.preventDefault()
        this.setState({
            selectedBeach:e.target.id
        })
    }
    render(){
        console.log("Beach date State !!")
        console.log(this.props.my_beaches)
        const lakesRivers = {
            lakes:this.props.lakes[0].results,
            rivers:this.props.rivers[0].results,
            beaches:this.props.my_beaches
        }
        const beaches = () => {
            if(this.state.region){
                const a_set = this.props.beachesByCategory.filter(obj => obj.location === this.state.region)
                return a_set[0].beaches
            }
        }
        const beachToSurvey = () => {
            var label
            if(this.state.selectedBeach) {
                label = `Survey data for: ${this.state.selectedBeach}`
            }else{
                label = "No beach selected"
            }
            return label
        }
        return(
            <div className="modal-column-full-width">
                {
                    this.props.my_beaches[0] === 'none' ? (
                        <div className="row-wrap formTabButtonBorder">

                             <Button
                                 buttonclass="formButtonTab"
                                 id="lakes"
                                 callback={this.selectType}
                                 label="Lakes"
                             />
                             <Button
                                 buttonclass="formButtonTab"
                                 id="rivers"
                                 callback={this.selectType}
                                 label="Rivers"
                             />
                         </div>
                        ):
                        (<div className="row-wrap formTabButtonBorder">
                            <Button
                                 buttonclass="formButtonTab"
                                 id="beaches"
                                 callback={this.selectType}
                                 label="My beaches"
                             />
                        </div>)
                }
                <motion.div
                    variants={slideDownAuto}
                    initial={false}
                    animate={this.state.beachSearchCategory ? "open":"closed"}
                    className="row-wrap pad-one-rem formTabBorder"
                    >
                    {
                        this.state.beachSearchCategory ?
                            this.state.beachSearchCategory === 'beaches' ?
                                lakesRivers.beaches.map((place, i)=>
                                    <Button
                                        key={i}
                                        buttonclass="formButton"
                                        id={place}
                                        callback={this.selectedBeach}
                                        label={place}
                                        />
                                     ):(
                                lakesRivers[this.state.beachSearchCategory].map((a_lake, i) =>
                                    <Button
                                        key={i}
                                        buttonclass="formButton"
                                        id={a_lake}
                                        callback={this.selectRegion}
                                        label={a_lake}
                                        />
                                    )
                                ):<div>There was an error, sorry.</div>
                    }
                </motion.div>
                <motion.div
                    variants={slideDownAuto}
                    initial={false}
                    animate={beaches() ? "open":"closed"}
                    className="row-wrap pad-one-rem"
                    >
                    <div className="no-wrap">
                        Select a beach:

                    </div>
                    {
                            this.state.region  ?
                                beaches().map((a_lake, i) =>
                                    <Button
                                        key={i}
                                        buttonclass="formButton"
                                        id={a_lake}
                                        callback={this.selectedBeach}
                                        label={a_lake}
                                        />
                            ):<div>There was an error, sorry.</div>
                    }
                </motion.div>
                <div className="row-no-wrap marg-one-rem pad-one-rem">
                    <Button
                        buttonclass="formButtonSelect"
                        id="selectedBeach"
                        value={this.state.selectedBeach}
                        callback={this.props.logData}
                        label={beachToSurvey()}
                        />
                </div>
            </div>
        )
    }
}

export default BeachDate
