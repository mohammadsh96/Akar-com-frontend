import React, { useContext, useEffect, useState } from "react";
import { baseURL } from "../../utilize/constants";

import "./PostBidDetails.css";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { useParams } from "react-router-dom";
import { LoginContext } from "../context/context";

const Subscribe = () => {
  const auth = useContext(LoginContext);

  let params = useParams();
  console.log(params);
  const [savedNotes] = useState(
    localStorage.getItem(`list${params.id1}${params.model1}`)
  );
  const [list, setList] = useState(savedNotes ? JSON.parse(savedNotes) : []);
  const [post, setPost] = useState({});
  const [images, setImages] = useState([]);
  const [highBid, sethighest] = useState({});

  let count = 0;

  useEffect(() => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].totalPrice > count) {
        count = list[i].totalPrice;
        sethighest(list[i]);
      }
    }
  }, [list]);

  const getPost = async () => {
    await fetch(`${baseURL}/${params.model1}/${params.id1}`)
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setPost(data);
        let imag = Object.keys(data).map((key) =>
          key.includes("url") ? data[key] : null
        );
        let filteredImage = imag.filter(function (el) {
          return el != null && el != "";
        });
        setImages(filteredImage);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let totalprice = parseInt(e.target.Price.value) + post.price;

    if (e.target.Price.value !== null || e.target.Price.value !== undefined) {
      setList([
        ...list,
        {
          client: auth.user.username,
          email: auth.user.email,
          BidAmount: e.target.Price.value,
          totalPrice: totalprice,
          id: post.id,
        },
      ]);
      alert("Your bidding has been placed !");
    } else {
      alert("Please add correct value !");
    }
  };
  const deleteBid = (id) => {
    const items = list.filter((item) => item.id !== id);
    setList(items);
  };
  useEffect(() => {
    localStorage.setItem(
      `list${params.id1}${params.model1}`,
      JSON.stringify(list)
    );
    //   const LocalStorageData = JSON.parse(localStorage.getItem('list'))
    //   setList([...list] , LocalStorageData)
  }, [list]);

  //  useEffect(()=>{

  //   const LocalStorageData = JSON.parse(localStorage.getItem('list'))
  //   setList([...list] , LocalStorageData)
  // },[])

  useEffect(() => {
    getPost();
    window.scrollTo(0, 0);
    // showSlides(slideIndex);
  }, [auth.user.id]);

  return (
    <div className="container1">
      <div className="postBid-details">
        <img src={post.url1} alt="" />
        <h4>Process : {post.process} </h4>
        <h4>Category : {post.model}</h4>

        <h4> I'm a/an {post.owner}</h4>
        <h4>
          <i className="fa fa-location-dot"></i> {post.city}
        </h4>

        <div className="button-flex">
          <button className="btn2">{post.price} JOD</button>
        </div>
      </div>
      <div className="price-cards">
        <h2>Do you have an offer ? </h2>
        <div className="price">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="price-Left">
                Price JOD
              </InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                name="Price"
                type="number"
                placeholder="Enter price in JD."
                className="price-mid"
                required
              />
              <Button type="submit" className="price-right">
                Bid
              </Button>
            </InputGroup>
          </Form>
        </div>
<div className="HighestPrice"><h3>highest Price : {highBid.totalPrice} JOD /{highBid.client}</h3></div>

        <div className="bid-card">
          <div className="card-inner">
            <ul>
              {list.map((item, idx) => {
                return (
                  <li key={idx}>
                    <h3>
                      Total Price Offered : <span> {item.totalPrice} JOD </span>{" "}
                    </h3>
                    <h3>Client : {item.client} </h3>
                    <h3 id="h33">Client Email : {item.email}</h3>
                    <h3>Bid Amount : {item.BidAmount}</h3>
                    {auth.user.id === post.userId ? (
                      <button
                        className="btn-Delete"
                        onClick={() => {
                          deleteBid(item.id);
                        }}
                      >
                        delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Subscribe;
// localStorage.setItem('list', JSON.stringify(list));
