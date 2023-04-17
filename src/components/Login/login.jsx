import React ,{useContext,useEffect} from "react";
import {Redirect ,Switch ,Link} from 'react-router-dom';
import './login.css'
import {LoginContext} from '../context/context'
const  SignIn =  () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const auth =useContext(LoginContext)
  const handleLogin = async (e) => {

  
    e.preventDefault();
        var body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    auth.loginFunction(body.username , body.password ,e.target.code.value)
    // console.log("+++++++++++++++",auth.loginFunction(body.username , body.password))
    auth.loginStatus(true)

  };
  return (
      <div className="container">

      {auth.loginStatus && auth.user.id ?  
    <Switch>
    <Redirect from='*' to={`/dashboard`}></Redirect>
    </Switch>
    :<Switch>
      <form onSubmit={handleLogin} className="loginForm">
        <br></br>
        <label>Username</label>
        <input type="text" name="username" required></input>
        <label>Password </label>
        <input type="password" name="password" required />
        <label><a href="/contact">Subscription Code ?</a></label>
        <input type="password" name="code" placeholder=""></input>
        <button className="buttonSignin">login </button>
      <Link to={'/signup'}>
            <p className='signinlink'>
              <i className='fa fa-sign-out'></i> Don't have account ?  Sign Up
            </p>
            </Link>
      </form>

      <Redirect from='/signup' to="/signin"></Redirect>
      </Switch>
    }
      
    </div>
   
  );
};
export default SignIn;
