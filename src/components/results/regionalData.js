import React, {Component} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {slideIn, slideDown, openClose, openCloseChildren} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import SummaryTable from './summaryTable'
import SurveyMap from './map'
import TreeMap from '../../shared/components/chart/treeMap'
import ScatterPlot from '../../shared/components/chart/scatter'
import {
    makeRegionalSummary,
    makeScatterPoints,
    makeTreeLeaves,
    makeTree,
    makeParentId,
    getCodeQtyFromDetails,
    makeMaterialTreeMapData,
} from '../../shared/utilities/jsHelper/stats'
import {hasData} from  '../../shared/utilities/jsHelper/helperMethods'
import {
    section_active_style,
    active_style
} from '../../shared/globals/variablesToEdit'
import {mapBounds, MAP_API_KEY} from './mapUtilities/mapUtilities'
import Button from '../../shared/components/button/buttons'


class RegionalData extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCategory:false,
            displayCategories:false,
        }
        this.selectLocation = this.selectLocation.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
        this.getSelectionTotals = this.getSelectionTotals.bind(this)
        this.getSelectionBeaches = this.getSelectionBeaches.bind(this)
        this.getSelectedBeachesPcsPm = this.getSelectedBeachesPcsPm.bind(this)
        this.makeMarkers = this.makeMarkers.bind(this)
        this.beachDetails = this.beachDetails.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        console.log("regional data mounted")
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.selectedLocation !== prevState.selectedLocation){
            this.setState({
                pcsPmSelectedBeaches:this.getSelectedBeachesPcsPm(),
                selectedBeachesSurveyDetails:this.getSelectedBeachesSurveyDetails(),
                selectedBeachData:this.props.beaches.filter(obj => this.state.selectionBeaches[0].beaches.includes(obj.slug)),
            })
        }if(this.state.selectedBeachData !== prevState.selectedBeachData){
            this.makeMarkers()
        }if(this.state.selectionTotal !== prevState.selectionTotal){
            let parentIds = makeParentId(this.props.sourceKeys)
            let leaves = makeTreeLeaves(this.state.selectionTotal[0].results, this.props.codeKeys, parentIds)
            this.setState({
                tree:makeTree(this.props.sourceKeys, parentIds, leaves),
                regionalMaterialTree:makeMaterialTreeMapData(this.state.selectionTotal[0].results, this.props.codeKeys, this.props.materialKeys)
            })
        }if(this.state.pcsPmSelectedBeaches !== prevState.pcsPmSelectedBeaches){
            this.setState({
                regionalSummary: makeRegionalSummary(this.state.pcsPmSelectedBeaches, this.state.selectionTotal[0].results, this.state.selectedBeachData)
            })
        }
        if(this.state.aSelectedBeachCodeTotals !== prevState.aSelectedBeachCodeTotals){
            let parentIds = makeParentId(this.props.sourceKeys)
            let beachLeaves = makeTreeLeaves(this.state.aSelectedBeachCodeTotals, this.props.codeKeys, parentIds)
            this.setState({
                beachMaterialTree:makeMaterialTreeMapData(this.state.aSelectedBeachCodeTotals,this.props.codeKeys, this.props.materialKeys),
                beachTreeMap: makeTree(this.props.sourceKeys, parentIds, beachLeaves),
            })
        }if(this.state.aSelectedBeachCodeTotals !== prevState.aSelectedBeachCodeTotals){
            this.setState({
                locationSummary: makeRegionalSummary(this.state.aSelectedBeachPcsM, this.state.aSelectedBeachCodeTotals, this.state.aSelectedBeachDetails)
            })
        }
    }
    getSelectionBeaches(aName){
        var beaches = this.props.beachesByCategory.filter(obj => obj.location === aName)
        var beachData = this.props.dailyTotals.filter(obj => beaches[0].beaches.includes(obj.location))
        if(beachData.length){
          const beachesWithData = []
          beaches[0].beaches.forEach(beach => {
              if(hasData(beach, beachData)){
                  beachesWithData.push(beach)
              }
          })
          return [{location:this.state.selectLocation, beaches:beachesWithData}]
        }else{
          console.log(`There is no regional data for ${aName}`)
        }
    }
    getSelectedBeachesPcsPm(){
        const data = this.props.dailyTotals.filter(obj => this.state.selectionBeaches[0].beaches.includes(obj.location))
        return data
    }
    getSelectedBeachesSurveyDetails(){
        const data = this.props.surveyDetails.filter(obj => this.state.selectionBeaches[0].beaches.includes(obj.location))
        return data
    }
    getSelectionTotals(aName, aCategory){
        const dataKeys = {lakes:"waterBodyCodeTotals", rivers:"waterBodyCodeTotals", cities:"cityCodeTotals"}
        const dataSource = this.props[dataKeys[aCategory]]
        const selectionTotals = dataSource.filter(obj => obj.location === aName )
        return selectionTotals
    }
    selectCategory(e){
        e.preventDefault()
        this.setState({
            displayCategories:true,
            selectedCategory:e.target.id
        })
    }
    selectLocation(e){
        e.preventDefault()
        const locationHasBeachData = this.getSelectionBeaches(e.target.id)
        if(locationHasBeachData){
          this.setState({
              selectedLocation:e.target.id,
              displayCategories:false,
              selectionBeaches:this.getSelectionBeaches(e.target.id),
              selectionTotal:this.getSelectionTotals(e.target.id, this.state.selectedCategory)
          })
        }
    }
    makeMarkers(){
        this.setState({
            mapMarkers:mapBounds(
                this.state.selectedBeachData,
                this.state.selectionBeaches,
                this.state.pcsPmSelectedBeaches,
                this.props.users
            )
        })
    }
    beachDetails(e){
        e.preventDefault()
        this.setState({
            aSelectedBeach:e.target.name,
            aSelectedBeachPcsM:this.state.pcsPmSelectedBeaches.filter(obj => obj.location === e.target.name),
            aSelectedBeachSurveyDetails:this.state.selectedBeachesSurveyDetails.filter(obj => obj.location === e.target.name),
            aSelectedBeachDetails:this.state.selectedBeachData.filter(obj => obj.slug === e.target.name),
            aSelectedBeachCodeTotals:getCodeQtyFromDetails(this.state.selectedBeachesSurveyDetails, e.target.name)
        })
    }
    render(){
        const regionalChoices = [
            {id:"lakes", label:"Lakes"},
            {id:"rivers", label:"Rivers"},
            {id:"cities", label:"Cities"}
            ]
        const startSearch = regionalChoices.map(obj => (
            {
                buttonclass:"sectionNavButton",
                active: this.props.regionalChoice === obj.id ? true:false,
                id:obj.id,
                name:"regionalChoice",
                style:active_style,
                callback:this.selectCategory,
                label:obj.label
            }
        ))
        return(
            <motion.div
                className="outer-row"
                initial="closed"
                animate="open"
                exit="closed"
                variants={slideIn}
                >
                <div className="column-full-width background-white">
                    <motion.div
                        variants={slideDown}
                        initial={false}
                        animate={this.state.displayCategories ? "open":"closed"}
                        className="modal-abs"
                        >
                        <div className="modal-row">
                            <h6>Select one:</h6>
                            {
                                this.state.selectedCategory && this.props[this.state.selectedCategory].map((a_lake, i) =>

                                    <Button
                                        key={i}
                                        buttonclass="navButton"
                                        id={a_lake}
                                        name="selectedLocation"
                                        callback={this.selectLocation}
                                        label={a_lake}
                                        />
                                    )
                            }
                        </div>
                    </motion.div>
                    <div className="block-row pad-point3-rem">
                        <div className="inline-block-50-left pad-one-rem">
                            <h6>Start</h6>
                            <p >
                                Begin by selecting either lake, river or city. Then Select one from the resulting list, if you don't see your region of interest then we have no data.
                            </p>
                            <p >
                                The survey results for individual locations is available at the end of the regional survey. For each selection you will find:
                            </p>
                            <ul>
                              <li>Summary table </li>
                              <li>Time series display</li>
                              <li>A drill down tree map </li>
                              <li>A tree map </li>
                            </ul>
                        </div>
                        <div className="inline-block-50-left pad-one-rem">
                            <p className="text-blue marg-top-one-rem">
                                {
                                    this.state.selectedLocation ? `Selected: ${this.state.selectedLocation}`:`No location selected`
                                }
                            </p>
                                {
                                    startSearch.map((aPlace, i) =>
                                        <Button
                                            key={i}
                                            buttonclass="cardButton"
                                            active= {this.props.regionalChoice === aPlace.id ? true:false}
                                            id={aPlace.id}
                                            name={aPlace.name}
                                            style={section_active_style}
                                            callback={aPlace.callback}
                                            label={aPlace.label}
                                            />
                                        )
                                }
                            <p>
                                <span className="rubik font-one-rem">All results are an indicator of the minimum quantity and type of objects present on the shoreline on the date of the survey.</span>
                            </p>
                        </div>
                    </div>
                    <motion.div
                        className="block-row"
                        initial={false}
                        animate={this.state.selectedLocation ? "open":"closed"}
                        exit="closed"
                        variants={openClose}
                        >
                        <motion.div
                            key={`mapsummary${Math.floor(Math.random() * 100)}`}
                            className="block-row"
                            initial="open"
                            exit="closed"
                            variants={openCloseChildren}
                            >
                            <div className="inline-block-50">
                            {
                                this.state.regionalSummary ? <SummaryTable key={Math.floor(Math.random() * 100)}
                                    selectedLocation={this.state.selectedLocation}
                                    dataSummary={this.state.regionalSummary}
                                    />:null
                            }
                            </div>
                            <div className="inline-block-50">
                            <span className="rubik">The 20-21 survey sites <span className="text-red">appear in red</span></span>
                            {
                                this.state.mapMarkers ? (
                                    <SurveyMap
                                        key={Math.floor(Math.random() * 100)}
                                        zoom={7}
                                        api_key={MAP_API_KEY}
                                        bounds={this.state.mapMarkers.bounds}
                                        markers={this.state.mapMarkers.markers}

                                        />
                                ):null
                            }
                            </div>
                        </motion.div>
                        <motion.div
                            key={`scatterandSourceTree${Math.floor(Math.random() * 100)}`}
                            className="block-row"
                            initial="open"
                            exit="closed"
                            variants={openCloseChildren}
                            >
                            <div className="inline-block-50" style={{backgroundColor:"#fff"}}>
                            {
                                this.state.pcsPmSelectedBeaches ? (
                                    <div className="inner-block">

                                        <ScatterPlot
                                            key={Math.floor(Math.random() * 100)}
                                            data={makeScatterPoints(this.state.pcsPmSelectedBeaches)}
                                            id="regionalScatter"
                                         />
                                    </div>):null
                            }
                            </div>
                            <div className="inline-block-50">
                            {
                                this.state.tree ? (
                                    <div className="inner-block">
                                        <TreeMap
                                            key={Math.floor(Math.random() * 100)}
                                            data={this.state.tree}
                                            id="regionalTreeMap"
                                            title="Total objects by use or source"
                                         />
                                    </div>):null
                            }
                            </div>
                        </motion.div>
                        <motion.div
                            key={`materialsandlocations${Math.floor(Math.random() * 100)}`}
                            className="block-row"
                            initial="open"
                            exit="closed"
                            variants={openCloseChildren}
                            >
                            <div className="inline-block-50">
                            {
                                this.state.regionalMaterialTree ? (
                                    <div className="inner-block">
                                        <TreeMap
                                            key={Math.floor(Math.random() * 100)}
                                            data={this.state.regionalMaterialTree}
                                            id={"regionalMaterialTree"}
                                            title="Total objects by material"
                                         />
                                    </div>):null
                            }
                            </div>
                            <div className="inline-block-50">
                                {
                                    this.state.selectionBeaches ?(
                                        <div className="inner-block">
                                        <p style={{color:"blue"}}> Select a site from the region</p>
                                        {
                                            this.state.selectionBeaches[0].beaches.map((beach, i) =>
                                                <Button
                                                    key={`${i}${beach}`}
                                                    buttonclass="navButton"
                                                    id={`${i}${beach}`}
                                                    name={beach}
                                                    callback={this.beachDetails}
                                                    label={beach}
                                                    />)
                                        }
                                        </div>
                                    ):null
                                }
                            </div>
                        </motion.div>
                    </motion.div>
                    <AnimatePresence initial={false}>
                    <motion.div
                        className="block-row"
                        initial={false}
                        animate={this.state.aSelectedBeach ? "open":"closed"}
                        exit="closed"
                        variants={openClose}
                        >

                        <motion.div
                            key={`locationChartSummary${Math.floor(Math.random() * 100)}`}
                            className="block-row"
                            initial="open"
                            exit="closed"
                            variants={openCloseChildren}
                            >
                            <div className="inline-block-50">
                            {
                                this.state.locationSummary ? <SummaryTable key={Math.floor(Math.random() * 100)}
                                    selectedLocation={this.state.aSelectedBeach}
                                    dataSummary={this.state.locationSummary}
                                    />:null
                            }
                            </div>
                            <div className="inline-block-50">
                                {
                                    this.state.aSelectedBeachPcsM ? (
                                        <div className="inner-block">
                                            <ScatterPlot
                                                key={Math.floor(Math.random() * 100)}
                                                data={makeScatterPoints(this.state.aSelectedBeachPcsM)}
                                             />
                                        </div>):null
                                }
                            </div>
                        </motion.div>
                        <motion.div
                            key={`locationMaterialSource${Math.floor(Math.random() * 100)}`}
                            className="block-row"
                            initial="open"
                            exit="closed"
                            variants={openClose}
                            >
                            <div className="inline-block-50">
                                {
                                    this.state.beachMaterialTree ? (
                                        <div className="inner-block">
                                            <TreeMap
                                                key={Math.floor(Math.random() * 100)}
                                                data={this.state.beachMaterialTree}
                                                id={"beachMaterialTreeMap"}
                                                title="Total objects by material"
                                             />
                                        </div>):null
                                }
                            </div>
                            <div className="inline-block-50">
                                {
                                    this.state.beachTreeMap ? (
                                        <div className="inner-block">
                                            <TreeMap
                                                key={Math.floor(Math.random() * 100)}
                                                data={this.state.beachTreeMap}
                                                id="beachTreeMap"
                                                title="Total objects by use or source"
                                             />
                                        </div>):null
                                }
                            </div>
                        </motion.div>
                        <motion.div
                            key={`surveyors${Math.floor(Math.random() * 100)}`}
                            className="block-row"
                            initial="open"
                            exit="closed"
                            variants={openCloseChildren}
                            >
                            <div className="inline-block-50">
                                <h6>Surveyors</h6>
                            </div>
                            <div className="inline-block-50">
                                <h6>Questions?</h6>
                                <p className="pad-point3-rem">
                                    Please send your comments and questions to info@hammerdirt.ch
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>

        )
    }
}

export default RegionalData
