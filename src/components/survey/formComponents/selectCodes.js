import React, {Component} from "react";
import {slideDown, slideIn} from '../../../shared/utilities/framer/variants'
import '../../../shared/css/grids.css'
import '../../../shared/css/main.css'
import '../../../shared/css/blocks.css'
import Button from '../../../shared/components/button/buttons'
import {ICONS} from '../../../shared/components/icons/allIcons'
import {Close} from '../../../shared/components/icons/icon'
import {motion, AnimatePresence } from 'framer-motion'

class SelectCodes extends Component {
    constructor(props){
        super(props)
        this.state={
            filtered_beaches:[],
        }
        this.selectType = this.selectType.bind(this)
        this.selectRegion = this.selectRegion.bind(this)
        this.selectBeach = this.selectBeach.bind(this)
        this.selectedBeach = this.selectedBeach.bind(this)
        // this.setExpanded = this.setExpanded.bind(this)
        // this.onFocus = this.onFocus.bind(this)
        // this.onSearchBeaches = this.onSearchBeaches.bind(this)
        // this.filterBeaches = this.filterBeaches.bind(this)
        // this.selectBeach = this.selectBeach.bind(this)
        // this.selectDate = this.selectDate.bind(this)
        // this.onConfirm = this.onConfirm.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        this.setState({

        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props !== prevProps){
            console.log("Beach Selector Recieved new props")
            // this.setState({
            //     // filtered_beaches:this.props.choices,
            //     beach_list:this.props.choices
            // })
        }
    }
    componentWillUnmount(){
        this._isMounted = false
    }
    // onFocus(e){
    //     e.preventDefault()
    //     this.setState({
    //         beach_search:"",
    //         selected_beach:"",
    //         confirmed:false,
    //     })
    // }
    // onConfirm(){
    //     let some_state = {
    //         beach:this.state.selected_beach,
    //         date:this.state.date,
    //     }
    //     this.setState({
    //         confirmed:true,
    //         open:!this.state.open
    //     },this.props.callBack(some_state))
    // }
    // onSearchBeaches(e){
    //     e.preventDefault()
    //     if(e.target.value){
    //         this.setState({
    //             confirmed:false,
    //             beach_search:e.target.value
    //         },this.filterBeaches(e.target.value))
    //     }else{
    //         this.setState({
    //             filtered_beaches:this.state.beach_list,
    //             beach_search:e.target.value,
    //             confirmed:false,
    //         })
    //     }
    // }
    // filterBeaches(targetValue){
    //     let searchTerm = targetValue.toLowerCase()
    //     let filterTerms = this.state.filtered_beaches
    //     let filteredBeaches = filterTerms.filter(beach => beach.location.toLowerCase().startsWith(searchTerm, 0))
    //     // if(filteredBeaches.length){
    //         this.setState({filtered_beaches:filteredBeaches})
    //     // }else{
    //     //     this.setState({filtered_beaches:this.state.beach_list, beach_search:""})
    //     // }
    // }
    // setExpanded(){
    //     this.setState({
    //         open:!this.state.open
    //     })
    // }
    // selectBeach(e){
    //     e.preventDefault()
    //     this.setState({
    //         beach_search:e.target.value,
    //         selected_beach:e.target.value,
    //         confirmed:false,
    //     }, this.filterBeaches(e.target.value))
    // }
    // selectDate(e){
    //     e.preventDefault()
    //     this.setState({
    //         date:e.target.value,
    //         confirmed:false,
    //     })
    // }
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
        console.log(e.target.id)
        this.setState({
            selectedBeach:e.target.id
        })
    }
    render(){
        console.log(this.state)
        const lakesRivers = {
            lakes:["lake-one", "lake-two", "lake-three"],
            rivers:["river-one", "river-two", "river-three"]

        }
        const availableBeaches = {
            "lake-one":["l-one-1", "l-one-2"],
            "lake-two":["l-two-2", "l-two-3"],
            "lake-three":["l-three-1", "l-three-2"],
            "river-one":["r-one-1", "r-one-2"],
            "river-two":["r-two-3", "r-two-1"],
            "river-three":["r-three-1", "r-three-4"]
        }
        const beachToSurvey = () => {
            var label
            if(this.state.selectedBeach) {
                label = `Survey ${this.state.selectedBeach}`
            }else{
                label = "No beach selected"
            }
            return label
        }
        return(
            <div className="modal-column-full-width">
                <div className="row-no-wrap no-wrap">
                    <h6>This is the code selector</h6>
                </div>
                <div className="row-no-wrap">
                     <Button
                         buttonclass="navButton"
                         id="lakes"
                         callback={this.selectType}
                         label="Lakes"
                     />
                     <Button
                         buttonclass="navButton"
                         id="rivers"
                         callback={this.selectType}
                         label="Rivers"
                     />
                </div>
                <motion.div
                    variants={slideDown}
                    initial={false}
                    animate={this.state.beachSearchCategory ? "open":"closed"}
                    className="row-wrap"
                    >
                    <div className="no-wrap">
                        choose one:

                    </div>
                    {
                            this.state.beachSearchCategory ?
                                lakesRivers[this.state.beachSearchCategory].map((a_lake, i) =>
                                    <Button
                                        key={i}
                                        buttonclass="navButton"
                                        id={a_lake}
                                        callback={this.selectRegion}
                                        label={a_lake}
                                        />
                            ):<div>There was an error, sorry.</div>
                    }

                </motion.div>
                <motion.div
                    variants={slideDown}
                    initial={false}
                    animate={availableBeaches[this.state.region] ? "open":"closed"}
                    className="row-wrap"
                    >
                    <div className="no-wrap">
                        Select a beach:

                    </div>
                    {
                            availableBeaches[this.state.region]  ?
                                availableBeaches[this.state.region].map((a_lake, i) =>
                                    <Button
                                        key={i}
                                        buttonclass="navButton"
                                        id={a_lake}
                                        callback={this.selectedBeach}
                                        label={a_lake}
                                        />
                            ):<div>There was an error, sorry.</div>
                    }

                </motion.div>


                {/*
                <AnimatePresence initial={true}>
                {
                    this.state.filtered_beaches ? (
                        this.state.filtered_beaches.map( (choice, i) =>{
                            return (
                                <motion.div variants={slideIn} key={choice.location} exit="closed" className="button-wrapper">
                                    <button
                                        className="dynamic-select dynamic-button"
                                        id={choice.location}
                                        name="beach"
                                        key={choice.location}
                                        value={choice.location}
                                        onClick={this.selectBeach}
                                        >
                                        {choice.location}
                                    </button>
                                </motion.div>
                            )
                        })
                    ):null
                }
               </AnimatePresence>
               */}
               <div className="row-no-wrap">
                    <Button
                    buttonclass="navButton"
                    id="constrolButton"
                    callback={this.props.seeModal}
                    label={<Close size={24} color="red" />}
                    />
                    <Button
                    buttonclass="navButton"
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

export default SelectCodes
