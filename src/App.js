import React,{Component} from 'react'
import {Cards , Charts, CountryPicker,Profile , Navigation, SignIn, Register} from './components'
import styles from './App.module.css'
import { fetchData } from './api'
import profileimage from './image/noprofile.jpg'
import SkeletonLoader from "tiny-skeleton-loader-react";
import logo from './image/Coronalogo.png'


class App extends Component{

     state= {
      data:{},
      load:true,
      country:"",
      route:"signin",
      home:false,
      userData:{
          Profile:"",
          name:""
      },
     
    }

    componentDidMount = async ()=>{
        const fetchedData = await fetchData()
        this.setState({data:fetchedData})
        if(this.state.data){
            this.setLoader(false)
        }
    }

    setLoader = (bol)=>{
        this.setState({load:bol})
    }

    changeListener = async ( event ) => {
        let country = event.target.value
        this.setState({ data:await fetchData(country), country:country})
       
    }

    onRouteChange  = (newRoute) => {
        this.setState( {route:newRoute} )
        if ( newRoute === "home" ) {
            this.setState( {home:true} )
        }
        else if( newRoute === "signin" ){
            this.setState({userData:{
                name:"",
                profile:""
            }})
            this.setState( { home : false } )
          }
         
    }
    
    loadUser = ( user ) => {
        let image
        const { profile } = user;
        if( profile.length ) {
            image = "https://safe-bayou-46118.herokuapp.com/"+profile
        }else{
            console.log("No image")
            image = profileimage
        }
        this.setState({ userData:{
            Profile:image,
            name:user.fullname
        }})

    }

    render(){
        const { data, load, country, route, home,userData } = this.state
        return (
            !load?
            (    
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Profile className={styles.prof} userData = {userData} />
                        <img src={logo} width="400" height="200" alt="covid-logo" className={styles.logo}/>
                        <Navigation home = {home} onRouteChange = {this.onRouteChange}/>
                    </div>
                   { route==="home"?(
                        <div className={styles.webbody}>
                            <Cards data={data} setLoader = {this.setLoader} />
                            <CountryPicker changeListener={this.changeListener}/>
                            <Charts country={country} data={data}/>
                        </div> )
                     :route==="signin"? <SignIn onRouteChange = {this.onRouteChange} loadUser = { this.loadUser }/>
                     :<Register onRouteChange = {this.onRouteChange} loadUser = { this.loadUser } />
                    }
                </div>     
            )
            :<SkeletonLoader height={"39em"} />
                
        )
    }
}

export default App