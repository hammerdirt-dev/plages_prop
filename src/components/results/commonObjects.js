import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import { getTheMedianValue, getTheMeanValue } from '../../shared/utilities/jsHelper/stats'
import {arrayUnique} from  '../../shared/utilities/jsHelper/helperMethods'
import ColumnChart from '../../shared/components/chart/columnChart'
import Button from '../../shared/components/button/buttons'
import {
    section_active_style,
    active_style
} from '../../shared/globals/variablesToEdit'

class CommonObjects extends Component{
    constructor(props){
        super(props);
        this.state = {
            regionalChoice:''
        }
        this.getLocationBeaches = this.getLocationBeaches.bind(this)
        this.getBeachData = this.getBeachData.bind(this)
        this.groupValuesByDateAndCode = this.groupValuesByDateAndCode.bind(this)
        this.getUniqueDates = this.getUniqueDates.bind(this)
        this.getTheMedianFromRegionalData = this.getTheMedianFromRegionalData.bind(this)
        this.barChartData = this.barChartData.bind(this)
        this.selectCategory = this.selectCategory.bind(this)
        this.sortAndGetMedian = this.sortAndGetMedian.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        let theLakes = this.barChartData(this.props.lakes)
        let theRivers = this.barChartData(this.props.rivers)
        this.setState({
            "Lakes median":theLakes[0],
            "Rivers median":theRivers[0],
            "Lakes average":theLakes[1],
            "Rivers average":theRivers[1],
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){
    }
    showEvent(e){
        e.preventDefault()
    }
    getLocationBeaches(aName){
        return this.props.beachesByCategory.filter(obj => obj.location === aName)[0].beaches
    }
    getBeachData(aName){
        if(this.props.surveyDetails.filter(obj => obj.location === aName).length){
            return this.props.surveyDetails.filter(obj => obj.location === aName)[0].dailyTotals
        }else{
          console.log(`There was no data for ${aName}`)
        }
    }
    getCodeDataByRegion(aRegion){
        // Returns an array of code values for each location in a region.
        // The codes are specified in the codes variable.
        if(this.props.waterBodyCodeTotals.filter(obj => obj.location === aRegion).length){
            let regionTotals = this.props.waterBodyCodeTotals.filter(obj => obj.location === aRegion)[0].results
            let regionCodes = regionTotals.map(obj => obj.code)
            let holder = {}
            regionCodes.forEach(code => holder[code] = [])
            var i
            // Retrieving the survey locations in the region
            let regionBeaches = this.getLocationBeaches(aRegion)
            for(i=0; i < regionBeaches.length; i++){
                // Retrieving all the survey data for a survey location
                let someBeachData = this.getBeachData(regionBeaches[i])
                if(someBeachData && someBeachData.length){
                    let codesAndValues = this.groupValuesByDateAndCode(someBeachData,regionCodes, aRegion)
                    regionCodes.forEach(code => holder[code].push(...codesAndValues[code]))
                }
            }
            let allCodeData = regionCodes.map(code => ({code:code, results:holder[code]}))
            return {region:aRegion, data:allCodeData}
        }
    }
    getUniqueDates(regionalData){
        // let dates = regionalData.map(obj => obj.date)
        return arrayUnique(regionalData.map(obj => obj.date))
    }
    groupValuesByDateAndCode(beachData, regionCodes, aRegion){
        let uniqueDates = this.getUniqueDates(beachData)
        let holder = {}
        regionCodes.forEach(code => holder[code] = [])
        var i
        for(i=0; i < uniqueDates.length; i++){
            //getting the survey data for one date
            let theDate = uniqueDates[i]
            // grouping all the results from the specified date
            let dateGroup = beachData.filter(obj => obj.date === theDate)
            let codesFoundThisDay = dateGroup.map(obj => obj.code)
            let codesNotFound = regionCodes.filter(obj => !codesFoundThisDay.includes(obj))
            var j
            var k
            for(j=0; j < codesFoundThisDay.length; j++){
                let matchThis = codesFoundThisDay[j]
                let aValue = dateGroup.filter(obj => obj.code === matchThis)[0].pcs_m
                holder[codesFoundThisDay[j]].push(aValue)
            }
            for(k=0; k < codesNotFound.length; k++){
                holder[codesNotFound[k]].push(0)
            }
        }
        return holder
    }
    sortAndGetMedian(codeData){
        return getTheMedianValue(codeData.sort(function(a,b){return a-b}))*100
    }
    getTheMedianFromRegionalData(region){
        let regionalData = this.getCodeDataByRegion(region)
        if(regionalData){
          const areaData = JSON.parse(JSON.stringify(regionalData))
          regionalData.data.forEach(obj => {
              obj.data = this.sortAndGetMedian(obj.results)
          })
          areaData.data.forEach(obj => {
              obj.data = getTheMeanValue(obj.results)*100
          })
          let sortedValues = regionalData.data.sort((a,b) => b.data - a.data)
          let meanSortedValues = areaData.data.sort((a,b) => b.data - a.data)
          let topFive = sortedValues.slice(0,6)
          let topFiveMean = meanSortedValues.slice(0,6)
          topFive.forEach(obj => {
              let getTheDescription = this.props.codes.filter(item => item.code === obj.code)[0]
              obj.name = getTheDescription.description
              obj.data = [obj.data]
          })
          topFiveMean.forEach(obj => {
              let getTheDescription = this.props.codes.filter(item => item.code === obj.code)[0]
              obj.name = getTheDescription.description
              obj.data = [obj.data]
          })
          return [{title:regionalData.region, id:Math.floor(Math.random() * 100), data:topFive}, {title:regionalData.region, id:Math.floor(Math.random() * 100), data:topFiveMean}]

        }else{
          console.log(`There was no data for ${region}`)
        }

    }
    barChartData(regions){
        let target = [[],[]]
        regions.forEach(region => {
            let chartData =this.getTheMedianFromRegionalData(region)
            if(chartData){
              target[0].push(chartData[0])
              target[1].push(chartData[1])
            }

        })
        return target
    }
    selectCategory(e){
        e.preventDefault()
        this.setState({
            displayCategories:true,
            regionalChoice:e.target.id,
        })
    }
    render(){
        const regionalChoices = [
            {id:"Lakes median", label:"Lakes median"},
            {id:"Lakes average", label:"Lakes average"},
            {id:"Rivers median", label:"Rivers median"},
            {id:"Rivers average", label:"Rivers average"},
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
                                <h6> The six most common objects</h6>
                                <p >
                                    Select one of the the four criteria. This represents the average or median of the individual survey results for each survey site and each object code identified at that body of water.
                                </p>
                                <p>
                                  The six most common objects represent 60-80% of the total value for most surveys. Thus giving an approximate view of the most abundant trash items on a given body of water.
                                </p>
                                <span className="rubik font-one-rem">All results are an indicator of the minimum quantity and type of objects present on the shoreline on the date of the survey.</span>
                            </div>
                              <div className="inline-block-50-left pad-one-rem">
                                <p >
                                  <strong>Accounting for zero:</strong> the survey results are a list of objects and quantities identified at a given location. Once an object
                                  has been identified on a lake or river it is added to the "master list" for that region. All surveys are then compared to the master list. If the individual survey does not have
                                  an entry for an object on the master list, an entry is made in the survey for that object with a value of zero.
                                </p>
                                <p>
                                  Adding a zero to the sum of the results has no effect when calculating the average, it does change the resulting median calculation and any probability distributions generated from that data. This gives a better
                                  idea of what you would most likely find on any subsequent surveys.
                                </p>
                            </div>
                        </div>
                        <div className="block-row pad-point3-rem">
                            <div className="inline-block-50-left pad-one-rem">
                                <h6>Interpreting results</h6>
                                <p  >
                                    <strong>Median</strong>: the median value gives you an indication of the objects and the quantities you would most likely find if you were to do a survey on that lake or river.
                                </p>
                                <p >
                                    <strong>Average/mean</strong>: the average is the cumulative sum of all survey results for that location and speaks only to results on a regional scale and not any survey result in particular.
                                </p>
                            </div>
                            <div className="inline-block-50">
                                <p className="text-blue marg-top-one-rem">
                                    {
                                        this.state.regionalChoice ? `Selected: ${this.state.regionalChoice}`:`No location selected`
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
                            </div>

                        </div>
                        <div className="block-row">
                            {
                                this.state[this.state.regionalChoice] ? this.state[this.state.regionalChoice].map((obj, i) => <div className="inline-block-25" key={`columnChartContainer${i}${Math.floor(Math.random() * 100)}`} > <ColumnChart  id={`columnChart${i}${Math.floor(Math.random() * 100)}`} title={obj.title} data={obj.data} /> </div>):null
                            }
                        </div>
                    </div>
                </motion.div>

        )
    }
}

export default CommonObjects
