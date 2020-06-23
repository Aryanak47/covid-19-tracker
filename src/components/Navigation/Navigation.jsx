import React from 'react'
import './Navigation.css'

const Navigation = ( { home, onRouteChange } ) => {

  return (
      
    <div className="btn-group">
      <button type="button" className=" btn btn-dark dropdown-toggle "data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Menus
      </button>
      <div className="dropdown-menu menus">
        { !home ? (
          <div>
            <span className="dropdown-item" onClick = { () => onRouteChange("signin") }>Sign In</span>
            <span className="dropdown-item" onClick = {()=> onRouteChange("register")}>Register</span>
          </div>
          )
          : <span className="dropdown-item" onClick = { () => onRouteChange("signin") } >Sign Out</span>  
        }
      </div>
    </div>
  )

}
export default Navigation;
