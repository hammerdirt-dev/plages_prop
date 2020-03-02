import React from 'react'

export async function getSomeData(props){
    // Takes in a URL and makes a GET request
    // returns the status and a payload
    let some_data = await fetch(props).then(response =>{
        let a_clone = response.clone()
        if (a_clone.ok){
            return ({data:response.json(), status:true})
        }
        else {
            return ({data:[{message:"Fetch data failed"}], status:false})
        }
    })
    return some_data
}
export async function returnSomeData(getSomeData, label){
    // handles the value of getSomeData(<a url>)
    // resolves the promise of getSomeData.data or returns error message
    // returns fetch-status, the-message and the callers label
    let some_data = await getSomeData;
    let this_data;
    if(some_data.status){
        console.log("status")
        this_data = await some_data.data
    } else {
        this_data = some_data.data
    }
    return {status:some_data.status, label:label, data:this_data}
}
