import axios from 'axios'

const url = "https://covid19.mathdro.id/api/"

export const fetchData = async ( country ) => {
    let newUrl = url
    if ( country ) {
        newUrl = `${newUrl}countries/${country}`

    }
    try {
        const { data : { confirmed ,recovered , deaths , lastUpdate } } = await axios.get(newUrl)
        return { confirmed ,recovered , deaths , lastUpdate }
    } catch (error) {
        
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}daily`)
        const modifiedData = data.map((dailyData) => ({
            deaths:dailyData.deaths.total,
            confirm:dailyData.confirmed.total,
            date:dailyData.reportDate
        })
        ) 
        return modifiedData
    } catch (error) {
        
    }
   
}

export const fetchCountryName = async () => {
    try {
        const  { data }  = await axios.get(`${url}countries`)
        const modifiedData = data.countries.map( ( { name }) => name)
        return modifiedData
       
    } catch (error) {
        
    }
}
