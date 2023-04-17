import React, { useState, useEffect } from "react";
import superagent from 'superagent';
import base64 from 'base-64';
// import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import axios from 'axios';
import { baseURL } from "../../utilize/constants";
import Swal from "sweetalert2";

export const LoginContext = React.createContext();
const API = `${baseURL}`
// const API = `https://akarcom-mid-project.herokuapp.com`
export default function LoginProvider(props) {
 const [signUp ,setSignUp] =useState(false)
    const [loginStatus, setLoginStatus] = useState(false);
    const [user, setUser] = useState({
        username: cookie.load('username') || "",
        actions: cookie.load('actions') || [],
        id:cookie.load('id')|| null 
    });
// useEffect(()=>{
//     cookie.save('signUp' ,signUp)
// },[signUp])
    useEffect(() => {
        const tokenFromCookies = cookie.load('token');
        const userId = cookie.load('id');

        if (tokenFromCookies) {
            setLoginStatus(true);
            setUser(user);
        } else {
            setLoginStatus(false);
            setUser({})
        }
    }, []);

    const SignUpFunction = async (username, password ,email ,phone ,first ,last) => {
      try {
        console.log("hello from sign up : ");
          // const response = await superagent.post(`${API}/users/signup`).set( ` ${base64.decode(`${username}:${password}`)}`);
          // console.log('body >>> ', response);
         
         const userData = { username:`${username}`, password:`${password}` , phoneNumber:`${phone}` , email:`${email}`, firstName:`${first}`, lastName:`${last}`}
          // validateMyUser(response.body);
       let data = await axios.post(`${baseURL}/signup` , userData)    
.then(setSignUp(true))
      } catch (err) {
          setSignUp(false)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to sign up!',
            footer: '<a href="/signup">username must be unique ..please try again?</a>'
          })
        
// alert("username must be unique ..please try again")
      }
  }
    const loginFunction = async (username, password, code) => {
        try {
            const response = await superagent.post(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
            console.log('body >>> ', response.body.user.token);
            validateMyUser(response.body.user ,code);
        } catch (err) {
return("error")
        }
    }
    const logoutFunction = () => {
        setLoginStatus(false);
        setUser({});
        cookie.remove('token');
        cookie.remove('actions');
        cookie.remove('username');
        cookie.remove('id');
        cookie.remove('code');
        cookie.remove('email');

      
    }
    const validateMyUser = (user ,code) => {
        if (user.token) {
            // const userFromToken = jwt.decode(user.token);
            console.log('user.token >>>> ', user.token);
            setLoginStatus(true);
            setUser(user);
            cookie.save('token', user.token);
            cookie.save('username', user.username);
            cookie.save('id', user.id);
            cookie.save('email', user.email);
            if(code==="abcd1234"){
                cookie.save("code", "subscriber")
                
                    }

            // const actionsCookie = JSON.stringify(user.actions);
            cookie.save('actions', user.capabilities)
        } else {
            setLoginStatus(false);
            setUser({});
        }
    }
    //read
    const can = (action) => {
        // console.log('user.actions >>>> ', user.actions)
        // if (user.actions.includes(action)) {
        //     return true;
        // }
        // else {
        //     return false;
        // }
        return user?.actions?.includes(action);
    }
    const state = {
        loginStatus: loginStatus,
        SignUpFunction:SignUpFunction,
        loginFunction: loginFunction,
        logoutFunction: logoutFunction,
        user: user,
        canDo: can,
        signUp :signUp,
        setSignUp : setSignUp
    }
    return (
        
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}



