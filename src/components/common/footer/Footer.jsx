import React from "react"
import { footer } from "../../data/Data"
import { BsTwitter } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";
import logo from "../../images/logo.png"

import "./footer.css"

const Footer = () => {
  return (
    <>
    

      <footer>
             
             <div className='box2'>
              <a className="afot" href="/" >Home</a> 
              <a  className="afot" href="/about" >About</a>
              <a className="afot"  href="/services" >Services</a>
            </div>
            
            <img className="im3" src={logo}></img>
       
        <div className="con2">
           <a className="afot" href="https://twitter.com/login"><BsTwitter  size={30} /> </a>
           <a className="afot" href="www.linkedin.com"></a><BsLinkedin size={30} />
           <FaFacebookSquare size={30} />
        </div>
          
       

    
             
          
      

      </footer>
      <div className='legal'>
        <span>© 2022 AkarCom. Designd By GitTop Team.</span><br/>
        <span>Please reference the Terms of Use and the Supplemental Terms for specific information related to your state. Your use of this website constitutes acceptance of the Terms of Use, Supplemental Terms, Privacy Policy and Cookie Policy. Do Not Sell My Personal Information</span>
        <span></span>
      </div>
    </>
  )
}

export default Footer
