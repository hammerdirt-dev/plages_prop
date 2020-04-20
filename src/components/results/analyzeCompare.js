import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import ColumnChart from '../../shared/components/chart/columnChart'
import {
    groupCodesBySource,
    getTheMedianValue,
    getTheMeanValue
} from '../../shared/utilities/jsHelper/stats'
import {arrayUnique, truncate} from  '../../shared/utilities/jsHelper/helperMethods'
import {
    section_active_style,
    active_style,
    barchartGroups
} from '../../shared/globals/variablesToEdit'
import Button from '../../shared/components/button/buttons'
import DisableButton from '../../shared/components/button/disableButtons'

class AnalyzeCompare extends Component{
    constructor(props){
        super(props);
        this.state = {
            groupedCodes:false,
            displayCategories:false,
            indexedData:false,
            meanOrMedian:0,
            meanMedianLabel:"median"
        }
        this.getLocationBeaches = this.getLocationBeaches.bind(this)
        this.getBeachData = this.getBeachData.bind(this)
        this.getCodeValuesByDate = this.getCodeValuesByDate.bind(this)
        this.getUniqueDates = this.getUniqueDates.bind(this)
        this.sortAListOfValues = this.sortAListOfValues.bind(this)
        this.getTheMedianFromRegionalData = this.getTheMedianFromRegionalData.bind(this)
        this.barChartData = this.barChartData.bind(this)
        // this.anArrayOfBarCharts = this.anArrayOfBarCharts.bind(this)
        this.chooseBarchart = this.chooseBarchart.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
        this.selectMeanOrMedian = this.selectMeanOrMedian.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        console.log("compare region")
        let plastic = [
            {code:"G78"},
            {code:"G79"},
            {code:"G80"}
        ]
        let styrofoam = [
            {code:"G81"},
            {code:"G82"},
            {code:"G83"}
        ]
        let sheeting = [
            {code:"G67"}
            ]
        let newLabels = ["Plastic", "Styrofoam", "Sheeting"]
        let sourceKeys = [...this.props.sourceKeys, ...newLabels]
        const groupedCodes = groupCodesBySource(this.props.codes, sourceKeys)[0]
        groupedCodes["Plastic pieces"] = plastic
        groupedCodes["Styrofoam pieces"] = styrofoam
        groupedCodes["Plastic Sheeting"] = sheeting
        this.setState({
            groupedCodes:groupedCodes
        })

    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.barchartGroups && this.state.barchartGroups !== prevState.barchartGroups ){
            this.setState({
                currentBarGroups:this.barChartData(this.state.selectedRegion,this.state.groupedCodes, this.state.barchartGroups)
            })
        }
    }
    getLocationBeaches(aName){
        return this.props.beachesByCategory.filter(obj => obj.location === aName)[0].beaches
    }
    getBeachData(aName){
        if(this.props.surveyDetails.filter(obj => obj.location === aName).length){
            return this.props.surveyDetails.filter(obj => obj.location === aName)[0].dailyTotals
        }
    }
    getCodeDataByRegion(aRegion,codes){
        // Returns an array of code values for each location in a region.
        // The codes are specified in the codes variable.
        var i
        let allCodeData = []
        // Retrieving the survey locations in the region
        let regionBeaches = this.getLocationBeaches(aRegion)
        for(i=0; i < regionBeaches.length; i++){
            // Retrieving all the survey data for a survey location
            let someBeachData = this.getBeachData(regionBeaches[i])
            if(someBeachData){
                // grouping the specified code values by date
                const someCodeData = this.getCodeValuesByDate(someBeachData,codes)
                allCodeData.push(...someCodeData)
            }
        }
        return allCodeData
    }
    getUniqueDates(regionalData){
        let dates = regionalData.map(obj => obj.date)
        return arrayUnique(dates)
    }
    getCodeValuesByDate(regionalData, codes, label){
        // gets the value in pcs_m of a group of codes
        // on a particular date. Returns the sum of those
        // values.
        // getting the unique survey dates from the data
        let dates = this.getUniqueDates(regionalData)
        let target = []
        var i
        for(i=0; i < dates.length; i++){
            //getting the survey data for one date
            let theDate = dates[i]
            // grouping all the results from the specified date
            let dateGroup = regionalData.filter(obj => obj.date === theDate)
            // filtering for the specifiec codes
            let codeGroup = dateGroup.filter(obj => codes.includes(obj.code))
            if(codeGroup.length){
                // retrieving the pieces per meter value for each code on a date
                let values = codeGroup.map(obj => obj.pcs_m)
                // summing up the values
                target.push(values.reduce(function(a, b){return a + b}))
            }else{
                target.push(0)
            }
        }
        return target
    }
    sortAListOfValues(regionalCodeData){
        const sortedTarget = regionalCodeData.sort(function(a,b){return a-b})
        return sortedTarget
    }
    getTheMedianFromRegionalData(region, codeGroup, label){
        let aCodeGroup = codeGroup.map(obj => obj.code)
        let regionalData = this.getCodeDataByRegion(region, aCodeGroup)
        if(regionalData.length){
          const meanData = JSON.parse(JSON.stringify(regionalData))
          let sortedData = this.sortAListOfValues(regionalData)
          let theMedian = getTheMedianValue(sortedData) * 100
          let theMean = getTheMeanValue(meanData) * 100
          return [{name:label, data:[theMedian]}, {name:label, data:[theMean]}]

        }else{
          console.log(`There is no category data for ${region}`)
        }

    }
    barChartData(regions, codeGroups, labels){
        let target = []
        regions.forEach(region => {
            let aList = [{title:region, data:[]},{title:region, data:[]}]
            labels.forEach(label =>{
              const chartData = this.getTheMedianFromRegionalData(region, codeGroups[label], label)
              if(chartData){
                aList[0].data.push(chartData[0])
                aList[1].data.push(chartData[1])
              }
            })
            target.push(aList)
        })
        return target
    }
    showEvent(e){
        e.preventDefault()
    }
    selectCategory(e){
        e.preventDefault()
        this.setState({
            displayCategories:true,
            regionalChoice:e.target.id,
            selectedRegion:this.props[e.target.id],
            barchartGroup:false,
            barchartGroups:false,
            currentBarGroups:false,
        })
    }
    selectMeanOrMedian(e){
      e.preventDefault()
      this.setState({
        meanOrMedian:e.target.value,
        meanMedianLabel:e.target.id
      })
    }
    chooseBarchart(e){
        e.preventDefault()
        this.setState({
            barchartGroup:e.target.name,
            barchartGroups:barchartGroups[e.target.name]
        })
    }

    render(){
        const regionalChoices = [
            {id:"lakes", label:"Lakes"},
            {id:"rivers", label:"Rivers"},
            ]
        const startSearch = regionalChoices.map(obj => (
            {
                buttonclass:"sectionNavButton",
                active: this.state.regionalChoice === obj.id ? true:false,
                id:obj.id,
                name:"regionalChoice",
                style:active_style,
                callback:this.selectCategory,
                label:obj.label
            }
        ))
        const meanOrMedian =[
          {id:"average", label:"Average", value:1},
          {id:"median", label:"Median", value:0}
        ]
        const barchartCoices = [
            {name:"Pieces: plastic, styrofoam & plastic sheeting"},
            {name:"Personal hygiene & medical products"},
            {name:"Industry, utility items, construction & vehicle"},
            {name:"Packaging, recreation, food & hunting"}
        ]
        return(
            <motion.div
                className="outer-row"
                initial="closed"
                animate="open"
                exit="closed"
                variants={slideIn}
                >
                <div className="column-full-width background-white">
                <div className="block-row pad-point3-rem">
                    <div className="inline-block-50-left pad-one-rem">
                            <h6>Start</h6>
                            <p >
                                Begin by selecting either lake or river. Then select one the available categories. <strong>This will give you the average or the median value
                                of all the individual survey results for that location.</strong>.
                            </p>
                            <p >
                                The categories are defined in the project tab, under methods. Each category is a group of objects that have a similar use case or source.
                            </p>
                            <span className="rubik font-one-rem">All results are an indicator of the minimum quantity and type of objects present on the shoreline on the date of the survey.</span>
                        </div>
                        <div className="inline-block-50-left pad-one-rem">
                            <h6>Interpreting results</h6>
                            <p >
                                <strong>Median</strong>: the median is the survey result that separates the lower half of the results from the higher half. It gives
                                a better indication of what a "typical value" is for that body of water.
                            </p>
                            <p >
                                <strong>Average</strong>: the arithmetic mean is the sum all values for that category, divided by the number of surveys for that location. Easy to understand, it is very sensitive
                                to extreme values and is not an indicator of typical values or central tendency.
                            </p>
                        </div>
                    </div>
                    <div className="block-row pad-point3-rem">
                        <div className="inline-block-50">
                            <p className="text-blue marg-top-one-rem">
                                {
                                    this.state.regionalChoice ? `Selected: ${this.state.regionalChoice} ${this.state.meanMedianLabel}`:`No location selected`
                                }
                            </p>
                                {
                                    startSearch.map((aPlace, i) =>
                                        <Button
                                            key={i}
                                            buttonclass="cardButton"
                                            active= {this.state.regionalChoice === aPlace.id ? true:false}
                                            id={aPlace.id}
                                            name={aPlace.name}
                                            style={section_active_style}
                                            callback={aPlace.callback}
                                            label={aPlace.label}
                                            />
                                        )
                                }
                                {
                                  meanOrMedian.map((obj, i) =>
                                    (<Button
                                      key={`meanmedian${i}`}
                                      buttonclass="cardButton"
                                      id={obj.id}
                                      name={obj.name}
                                      value={obj.value}
                                      callback={this.selectMeanOrMedian}
                                      label={obj.label}
                                      style={section_active_style}
                                      />)
                                  )
                                }
                        </div>
                        <div className="inline-block-50">
                            <p className="text-blue marg-top-one-rem">
                                {
                                    this.state.barchartGroup ? truncate(this.state.barchartGroup, 4):`No category selected`
                                }
                            </p>
                            {
                                barchartCoices.map((choice, i) =>{
                                    return(
                                        <DisableButton
                                            key={i}
                                            buttonclass="cardButton"
                                            active= {this.state.barchartGroup === choice.name ? true:false}
                                            id={choice.name}
                                            name={choice.name}
                                            style={section_active_style}
                                            callback={this.chooseBarchart}
                                            disabled={this.state.displayCategories ? false:true}
                                            label={choice.name}
                                            />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="block-row">
                        {
                            this.state.currentBarGroups ? this.state.currentBarGroups.map((obj, i) => <div className="inline-block-25" key={`columnChartContainer${i}${Math.floor(Math.random() * 100)}`} > <ColumnChart  id={`columnChart${i}${Math.floor(Math.random() * 100)}`} title={obj[this.state.meanOrMedian].title} data={obj[this.state.meanOrMedian].data} /> </div>):null
                        }
                    </div>
                </div>
            </motion.div>
        )
    }
}

export default AnalyzeCompare
