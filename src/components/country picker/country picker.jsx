import React,  { useState, useEffect } from 'react'
import styles from './countrypicker.module.css'
import { NativeSelect, FormControl } from  '@material-ui/core'
import { fetchCountryName } from '../../api/index'

const CountryPicker = ( { changeListener } )=>{
    const [ selectedCountry, setSelectedCountry ] = useState([])

    useEffect( () =>{
        const fetch = (async() => {
            setSelectedCountry(await fetchCountryName())
        })()
    },[])
 
    return (
        <div className={styles.container}>
           <FormControl className={styles.formControl} >
               <NativeSelect defaultValue="" onChange={changeListener}  disableUnderline className={styles.select}  >
               <option value="">Global</option>
               {
                selectedCountry.map( (item,i) => <option key={i} value = {item} >{item}</option> )
               }
               </NativeSelect>
           </FormControl>
         </div>
          
      
    )
}

export default CountryPicker;