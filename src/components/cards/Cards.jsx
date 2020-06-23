import React from 'react'
import { Grid, Card, Typography, CardContent } from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from 'react-countup';
import cx from 'classnames'



const Cards = ( { data :{ confirmed , recovered , deaths, lastUpdate },setLoader } )=>{


    if(!confirmed){
        setLoader(true)
        return
    }
    
    const txt = [
    {
        heading:"Infected",
        desc:" Number of Confirmed cases of covid-19",
        value : confirmed.value,
        sty : styles.Infected
    },
    {
        heading:"Recovered",
        desc:"  Number of recoveries from covid-19",
        value :  recovered.value,
        sty : styles.Recovered
    },
    {
        heading:"Deaths",
        desc:" Number of deaths from covid-19 ",
        value :  deaths.value,
        sty : styles.Deaths
    }
]

    return (
       <div className = {styles.container} >
            <Grid container justify="center" spacing={3}>
                { txt.map( ( item, i ) => (  
                    <Grid item component={Card} xs={12} md={3} key = {i} className={cx(item.sty,styles.cards)}>
                        <CardContent>
                            <Typography gutterBottom color="textSecondary" >
                                {item.heading}
                            </Typography>
                            <Typography variant="h5" component="h2" >
                                <CountUp start={0} end={ item.value } duration={2.75}separator=","/>
                            </Typography>
                            <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                            <Typography variant="body2" >
                            { item.desc }
                            </Typography>
                        </CardContent>
                    </Grid>)
                )}
            </Grid>
       </div>
    )
}

export default Cards;