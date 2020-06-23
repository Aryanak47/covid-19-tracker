import React ,{ Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class SignIn extends Component{ 
    
    state = {
        email:"",
        password:""

    }

    onPasswordChange = ( e ) => {
        this.setState({ password:e.target.value })
    }

    onEmailChange = ( e ) => { 
        this.setState({ email:e.target.value })
    }

    onSignIn = () => {

        const { onRouteChange, loadUser } =  this.props
        const { password, email } = this.state
        const ele = document.querySelectorAll(".inp")
        const toastStyle = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
            
        if( password.length <= 0 || email.length <= 0  ) {
            const ele = document.querySelectorAll(".inp")
            ele.forEach(item => {
                item.style.borderColor = "rgba(250,0,0,0.5)";
            })
            return toast.warn('Please fill in all the required fields',toastStyle);
        }

        fetch("https://safe-bayou-46118.herokuapp.com/signin",{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        .then(res => res.json() )
        .then(user => {
            if( user.id ) {
                onRouteChange ("home")
                loadUser(user)
            }else{
                ele.forEach(item => {
                    item.style.borderColor = "rgba(250,0,0,0.5)";
                })
                toast.error('Email and password did not match 😏', toastStyle );
            }
        })
    }
   
    render(){
    return (
        <div>
            <div className="form-group">
                <ToastContainer />
            </div>
           <article className=" shadow-3 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa3 black-80">
                    <main className="measure" >
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                            <input className="pa2 f4 input-reset ba bg-transparent  inp  w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                required
                                onChange={ this.onEmailChange }
                                />
                        </div>
                        <div className="mv3">
                            <label className="db  fw6 lh-copy f3" htmlFor="password">Password</label>
                            <input className="pa2 f4 input-reset ba bg-transparent hover-bg-black inp  w-100"
                                type="password"
                                name="password" 
                                id="password"
                                required
                                onChange={ this.onPasswordChange }
                                />
                        </div>
                    
                        <div className="">
                        <input className="b  ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
                                type="submit" value="Sign in" onClick = { this.onSignIn }/>
                        </div>
                        <div className="lh-copy mt3">
                        <a  href="#0" className="f6 link dim black db pointer" onClick = { () => this.props.onRouteChange ("register") }>Register</a>
                        </div>
                        </fieldset>
                    </main>
                </main>
             </article>
      </div>
    )
}
}
export default SignIn