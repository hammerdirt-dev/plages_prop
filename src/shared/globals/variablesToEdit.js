import React from 'react'
import Home from  '../../components/home/home'
import Project from '../../components/project/project'
import {
    LIST_OF_BEACHES,
    LIST_OF_CODES,
    LIST_OF_USERS,
    WATER_BODY_CODE_TOTAlS,
    CITY_CODE_TOTALS,
    POST_CODE_TOTAlS,
    ARTICLE_SEARCH_TERMS,
    DAILY_TOTALS_PCS_M,
    LIST_OF_BEACHES_CATEGORY,
    LIST_OF_CATEGORIES,
    LOCATION_SURVEY_DETAILS,
    ARTICLE_LIST
} from '../../components/api/apiUrls'
export const name = "BeachLitterOne"
export const version = 12

export function appsToLoad(state){
    let {currentapp, userdata, locationdata, ...someState} = state
    return ({
        Project:<Project key="Project" {...someState}  />,
        Home:<Home key="Home" {...someState}/>
    })
}
export const active_style = {
    border: "medium solid #50c7c7",
    color:"#50c7c7",
    backgroundColor:"#fff"
}
export const theDataStores = [
    {store:"codes", url:LIST_OF_CODES},
    {store:"users", url:LIST_OF_USERS},
    {store:"beaches", url:LIST_OF_BEACHES},
    {store:"dailyTotals", url:DAILY_TOTALS_PCS_M},
    {store:"waterBodyCodeTotals", url:WATER_BODY_CODE_TOTAlS},
    {store:"cityCodeTotals", url:CITY_CODE_TOTALS},
    {store:"postCodeTotals", url:POST_CODE_TOTAlS},
    {store:"beachesByCategory", url:LIST_OF_BEACHES_CATEGORY},
    {store:"beachCategories", url:LIST_OF_CATEGORIES},
    {store:"articleSearchList", url:ARTICLE_SEARCH_TERMS},
    {store:'surveyDetails', url:LOCATION_SURVEY_DETAILS},
    {store:'currentArticles', url:ARTICLE_LIST},
]

export const analysisCategories = [
    {abundance:"Abundance"},
    {probability:"Probability"},
    {timeSeries:"Time series"}
]
export const PARTICIPATING = [
    {id:"STPPP", name:"Stop Plastic Polution"},
    {id:"HD", name:"hammerdirt!"},
    {id:"WWF", name:"World Wildlife Fund"},
    {id:"PRCS", name:"Precious Plastic"},
    {id:"EG", name:"Ecole International"},
    {id:"HKQM", name:"Hackuarium"},
    {id:"ASL", name:"Association Sauvegarde du Léman"},
    {id:"SAT", name:"Sol à Tous"}
]
export const PROJECT = [
    {id:"SLR", name:"Swiss Litter Report"},
    {id:"MCBP", name:"Montreux Clean Beach"},
    {id:"GL", name:"Grand Lac"},
    {id:"2020", name:"Project 2020"},
]
export const colorSelector = {
    Plastic:"#2980b9",
    Wood:"#2980b9",
    Metal:"#2980b9",
    Paper:"#2980b9",
    Rubber:"#2980b9",
    Ceramic:"#2980b9",
    Cloth:"#2980b9",
    None:"#2980b9",
    Glass:"#2980b9",
    Unidentified:"#2980b9",
    Chemicals:"#2980b9"
}
export const locationColors = [
    'rgba(235, 47, 6,1.0)',
    'rgba(246, 185, 59,1.0)',
    'rgba(106, 137, 204,1.0)',
    'rgba(120, 224, 143,1.0)'
]
export const storeKey ={
    'cities':'cityCodeTotals',
    'lakes':'waterBodyCodeTotals',
    'rivers':'waterBodyCodeTotals',
    'post':'postCodeTotals',
}
export const sourceColorSelector ={
    Food:"#2980b9",
    Medical:"#2980b9",
    Household:"#2980b9",
    Industrial: "#2980b9",
    None:"#2980b9",
    Fragmented:"#2980b9",
    Recreation:"#2980b9",
    Industry:"#2980b9",
    Other:"#2980b9",
    Tobaco:"#2980b9",
    Fishing:"#2980b9",
    Construction:"#2980b9",
    Packaging:"#2980b9",
    waterTreatment: "#2980b9",
    personalEffects:"#2980b9",
    Agriculture:"#2980b9",
    personalHygiene:"#2980b9",
    utilityItems:"#2980b9",
    Clothing:"#2980b9",
    Vehicle:"#2980b9",
    Hunting:"#2980b9",
    Undefined:"#2980b9",
    Aquaculture:"#2980b9",
    Shipping:"#2980b9"
}
