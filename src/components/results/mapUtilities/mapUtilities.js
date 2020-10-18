import L from 'leaflet'
import {
    getFirstAndLastDate,
} from '../../../shared/utilities/jsHelper/stats'

export const MAP_API_KEY = "pk.eyJ1IjoiaGFtbWVyZGlydCIsImEiOiJja2dlemJ6cjMxZm1qMnRzNWtqcTFzMHNhIn0.WR0tuIA2KrsvqxgigR5T4w"

export const getLatLongPopUp = (beachList, beachData, color) =>  {
    const aDifferentList =[]
    beachList.forEach(beachName => {
        const aBeach = beachData.find(beach => beach.slug === beachName)
        const markerList = [aBeach.location, aBeach.latitude, aBeach.longitude, color, aBeach.city, aBeach.post]
        aDifferentList.push(markerList)
    })
    return aDifferentList
}
export const doNotRepeat = (firstBeachList, secondBeachList) =>{
    const newBeachList = firstBeachList.filter(beach => !secondBeachList.includes(beach))
    return (newBeachList)
}
export const makeBoundsArray = (theLists) => {
    const boundsArray = []
    for (var beach of theLists){
        boundsArray.push([beach.lat, beach.lon])
    }
    const latLngs = boundsArray.map(position => {
        return L.latLng(position[0], position[1])
      })
    const bounds = L.latLngBounds(latLngs)
    return bounds
}
export const singlePointBounds = (theLists) => {
    const thePoint = theLists[0]
    var center = L.latLng(thePoint.lat,thePoint.lon);
    var bounds = center.toBounds(1000);
    return bounds

}
export const markerHtmlStyles = (color) =>{
    return (`background-color: ${color};
        width: 1rem;
        height: 1rem;
        display: block;
        position: relative;
        border-radius: 1rem;
        border: 2px solid #FFFFFF`)
}
export const icon = (color) => {
    return (
        L.divIcon({
          className: "my-custom-pin",
          iconAnchor: [15,15],
          labelAnchor: [0, 0],
          popupAnchor: [0, 0],
          html: `<span style="${markerHtmlStyles(color)}" />`
      })
  )
}

export function makeOneSetOfMarkers(geoData, surveyData, aBeach, users){
    const locationData = geoData.filter(obj => obj.slug === aBeach)[0]
    // console.log(aBeach)
    // console.log(surveyData)
    const locationSurveys = surveyData.filter(obj => obj.location === aBeach)
    var dates = "No data"
    var firstSample = "No data"
    var lastSample = "No data"
    var lastSampleResult = "No data"
    var noOfSamples = 0
    var owner = "hammerdirt"
    if(locationSurveys.length){
        dates = locationSurveys[0].results.map(obj => obj[0])
        const firstLastSorted = getFirstAndLastDate(dates)
        firstSample = firstLastSorted.first
        lastSample = firstLastSorted.last
        noOfSamples = dates.length
        lastSampleResult = locationSurveys[0].results.filter(obj => obj[0] === lastSample)
    }
    var color = locationData.is_2020 ? "red":"blue"
    if(locationData.owner){
        let theOwner = users.filter(obj => obj.id === locationData.owner)
        owner = theOwner[0].username
    }
    return ({
        lat:locationData.latitude,
        lon:locationData.longitude,
        city:locationData.city,
        name:locationData.location,
        first:firstSample,
        last:lastSample,
        number:noOfSamples,
        result:lastSampleResult[0][1],
        color:color,
        manager:owner
    })
}

export function makeMapMarkers(geoData,listOfBeaches, surveyData, users){
    let myMarkers = []
    listOfBeaches[0].beaches.forEach(location => {
        const aMarker = makeOneSetOfMarkers(geoData, surveyData, location, users)
        myMarkers.push(aMarker)
    })
    return myMarkers
}

export function mapBounds(geoData, listOfBeaches, surveyData, users){
    // sets the initial bounds of the viewable map data
    // uses Leaflett methods
    var bounds
    const mapMarkers = makeMapMarkers(geoData, listOfBeaches, surveyData, users)
    if (mapMarkers.length > 1) {
        bounds = makeBoundsArray(mapMarkers)
    }else if (mapMarkers.length === 1){
        bounds = singlePointBounds(mapMarkers)
    }else {
        bounds = singlePointBounds([["Montreux", "Le Pierrier", "46.43972700", "6.88896800", "rgba(183, 21, 64,0.5)"]])
    }
    const mapControls =  {bounds:bounds, markers:mapMarkers}
    return mapControls
}
