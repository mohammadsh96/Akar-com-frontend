import React ,{useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'
import {Redirect ,Switch} from 'react-router-dom';

// const url = 'https://akarcom-final.herokuapp.com'
import './signup.css'
import {LoginContext} from '../context/context'
 const SignUp = ()=>{
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
const auth =useContext(LoginContext)

const handleLogin =(e)=>{
    e.preventDefault()

auth.SignUpFunction(e.target.username.value,e.target.password.value  ,e.target.email.value ,e.target.phone.value ,e.target.firstName.value ,e.target.lastName.value)


}



return(    <div className="container">

<form onSubmit={handleLogin} className="loginForm">
  <br></br>
<label>Username</label>
<input type='text' name='username' required ></input>
<label>Password </label>
<input type="password" name="password" required />

<label>First Name</label>
<input type='text' name='firstName' required ></input>
<label>Last Name</label>
<input type='text' name='lastName' required ></input>

<label>Email </label>
<input type="email" name="email" required />
<label>Phone Number </label>
<input type="number" name="phone"  required/>

<button className='buttonSignup'>Sign Up</button>
<Link to={'/signin'}>
            <p className='signinlink'>
              <i className='fa fa-sign-out'></i> already have account ?  Sign In
            </p>
            </Link>
</form>

{auth.signUp ? <> <Switch>
    <Redirect from='/signup' to={`/signin`}></Redirect>
    </Switch></> : <> </>}

</div>)

}
export default SignUp ;