import React,  { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api/index'
import { Line, Bar } from 'react-chartjs-2'
import style from './Charts.module.css'


const Charts = ( {data : { confirmed,recovered,deaths }, country})=>{

    const [ dailyData, setDailyData ] = useState([])

    useEffect( ()=>{
        const fetch =  ( async () => {
            const data = await fetchDailyData()
            setDailyData(data)
        })()
    },[])
    const lineChart = (
        dailyData.length
        ? (<Line
            data = {{
                labels:dailyData.map( ( { date } ) => date ),
                datasets:[{
                    data:dailyData.map( ({ confirm }) => confirm),
                    label:"Infected",
                    borderColor:'rgba(0,250,0,0.9)',
                    fill:true

                },{
                    data:dailyData.map( ({ deaths }) => deaths),
                    label:"Deaths",
                    borderColor:'rgba(250,0,0,0.9)',
                    backgroundColor:'#E91E63',
                    fill:true
                }]
            }}
            />):null
    )
  
    const barChart = (
        confirmed
        ?(<Bar 
            data = {{
                labels:["Infected","Recovered","Deaths"],
                datasets:[{
                    label:"People",
                    backgroundColor:["rgba(0, 250, 0, 0.5)",
                                    "rgba(0, 0, 250, 0.5)",
                                    "rgba(250, 0, 0, 0.5)"],
                    data:[confirmed.value,recovered.value,deaths.value]
                }]

            }}
            options = {{
                legend :{display:false},
                title : {display:true , text:`Current state in the context of ${country}`}
            }}

        />):null
    )

    return (
        <div className={style.container}>
            { country ? barChart:lineChart }
        </div>
    )
}

export default Charts;