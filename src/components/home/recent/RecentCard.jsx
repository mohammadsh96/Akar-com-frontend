import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../../utilize/constants";
// import { list } from "../../data/Data"
import { LoginContext } from "../../context/context"
import Button from "react-bootstrap/Button";
import {Redirect ,Switch } from 'react-router-dom';
import  cookie from 'react-cookies'
// import FeaturedCard from "../featured/FeaturedCard";
import { featured } from "../../data/Data";
import "../featured/FeaturedCard.css";
// import PostProvider from '../../context/postContext'
import Logo from "./noImage.png";
const RecentCard = (props) => {
  const auth = useContext(LoginContext);
  const [users, setUsers] = useState([]);
  const [model, setModel] = useState("lands");
  const [images, setImages] = useState([]);
  const [bid, setBid] = useState(false);

  const [postId, setPostId] = useState();

  const fetchData = async () => {
    console.log("Data fetched");
    await fetch(`${baseURL}/${model}`)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setUsers(data);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, [model]);

const setBids=(id)=>{
setPostId(id);
setBid(true)

}

  return (
    <>
      <div className="modelIcon">
        {featured.map((items, index) => (
          <div className='model-box' key={index} >
            <img src={items.cover} alt='' />
            <h5 >{items.name}</h5>
            <label>{items.total}</label>
            <br></br>
            <br></br>
            <Button variant="danger" onClick={() => setModel(items.name)}>
              Filter
            </Button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <div className="content grid3 mtop">
        {users.map((val, index) => {
          const { process, model, owner, price, city, id, url1 } = val
          return (
            <div className="box shadow" key={index}>
              <Link to={`/postdetails/${model}/${id}`}>
                <div className="postImg">

                  <img src={url1 || Logo} alt='' />
                
                </div>
                <div className="text">
                  <div className="category flex">
                    <span
                      style={{
                        background:
                          process === "Sell" ? "#25b5791a" : "#ff98001a",
                        color: process === "Sell" ? "#25b579" : "#ff9800",
                      }}
                    >
                      {process}
                    </span>
                    <i className="fa fa-heart"></i>
                  </div>
                  <h4>{owner}</h4>
                  <p>
                    <i className="fa fa-location-dot"></i> {city}
                  </p>
                </div>
                <div className="button flex">
                  <div>
                    <button className="btn2">{price}</button>{" "}
                    <label htmlFor=""> JOD</label>
                  </div>
                  <span>{model}</span>
                  {/* <span>post id = {id} </span> */}
                </div>
              </Link>
              {cookie.load('code') ?  
              
              <Link to={`/bid/${model}/${id}`}>
              <button onClick={()=>setBids(id)}>bidding</button>
              {/* <span>go to bid</span> */}
              </Link>
            : <></>
            }
            </div>
          );
        })}
      </div>
{/* {bid ? <Switch>
  <Redirect from="*" to={`/bid/${model}/${postId}`} /> 
</Switch>  :<></> }    */}

    </>
  );
};

export default RecentCard;
