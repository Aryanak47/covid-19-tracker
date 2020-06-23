import React from 'react'
import ExampleComponent  from "react-rounded-image";
import styles from './Profile.module.css'
import { Typography } from '@material-ui/core'


const Profile = ( { userData } ) => {
    return (
        <div className = { styles.profile}>
            <ExampleComponent 
                image={userData.Profile}
                roundedSize="0"
                imageWidth="90"
                imageHeight="90"/>
            <Typography  gutterBottom color="textSecondary" className="uName"> { userData.name } </Typography>
        </div>
    )
} 
export default Profile;