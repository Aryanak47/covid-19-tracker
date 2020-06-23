import React, {Component} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component{ 
    
    state={
        name:"",
        email:"",
        password:"",
        image:"",
    }

    onNameChange = ( e ) => {
        let name = e.target.value
        let firstLetter = name.charAt(0).toUpperCase()
        let fulName= firstLetter+name.substring(1,name.length)
        this.setState({ name:fulName })
    
    }

    onPasswordChange = ( e ) => {
        this.setState({ password:e.target.value })
      
    }

    onEmailChange = ( e ) => { 
        this.setState({ email:e.target.value })
        
    }
    onProfileChange = ( e ) => {
        this.setState({image:e.target.files[0]})
    }
 
    onRegister = () => {

    const { onRouteChange, loadUser } =  this.props
    const { name, password, email, image } = this.state
    const toastStyle = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        }

    if( name.length <= 0 || password.length <= 0 || email.length <= 0  ) {
         return toast.warn('Please fill in all the required fields',toastStyle);
    }
      
    const formData = new FormData()
    formData.append('profileImg', image);
    formData.append('name',name)
    formData.append('password',password)
    formData.append('email',email)

    axios.post("https://safe-bayou-46118.herokuapp.com/register" ,formData)
    .then(({ data }) => {
        if( data.id ) {
            toast.success('Registered successfully', toastStyle );
            onRouteChange("home")
            loadUser(data)
        }
    })
    .catch(er => { 
        toast.warn('User with this email already exits', toastStyle );
    })
}

    render(){
    return (
        <div>
            <div className="form-group">
                <ToastContainer />
             </div>
           <article className="shadow-3 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa3 black-80 ">
                    <div className="measure" >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f3" >Full Name</label>
                                <input className="pa2 f4 input-reset ba bg-transparent hover-bg-black  w-100"
                                    type="fName"
                                    name="full-name"
                                    required
                                    id="full-name"
                                    onChange={ this.onNameChange }
                                    />
                            </div> 
                            <div className="mv3">
                                <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                                <input className="pa2 f4 input-reset ba bg-transparent hover-bg-black  w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    required
                                    onChange={ this.onEmailChange }
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f3" htmlFor="password">Password</label>
                                <input className="pa2 f4 input-reset ba bg-transparent hover-bg-black  w-100"
                                    type="password"
                                    name="password" 
                                    id="password"
                                    required 
                                    onChange={ this.onPasswordChange }
                                    />
                            </div>
                            <div className="mv3">
                                <input type="file" onChange = {this.onProfileChange}   name="profileImg" accept="image/*" /> 
                            </div>
                            <div >
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                                type="submit" value="Register"  onClick = { this.onRegister } />
                            </div>
                        
                        </fieldset>
                    </div>
                </main>
          </article>
        </div>
    )
}
}
export default Register