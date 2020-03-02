import React from 'react'
import Home from  '../../components/home/home'
import Project from '../../components/project/project'

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
