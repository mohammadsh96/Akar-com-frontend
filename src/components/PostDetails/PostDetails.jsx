import React, { useContext, useEffect, useState } from "react";
import { baseURL } from "../../utilize/constants";
import noImage from "../images/noImage.png";
import cookie from "react-cookies";
import "./PostDetails.css";
import { useHistory } from "react-router-dom";

import { Redirect, Switch, Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useParams } from "react-router-dom";

import { LoginContext } from "../context/context";

const PostDetails = (props) => {
  const auth = useContext(LoginContext);

  let params = useParams();
  console.log(params);
  const [post, setPost] = useState({});
  const [images, setImages] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const getPost = async () => {
    await fetch(
      `${baseURL}/${props.match.params.model}/${props.match.params.id}`
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setPost(data);
        let imag = Object.keys(data).map((key) =>
          key.includes("url") ? data[key] : null
        );
        let filteredImage = imag.filter(function (el) {
          return el !== null && el !== "";
        });
        setImages(filteredImage);
      });
  };

  const deletePost = async () => {
    await fetch(
      `${baseURL}/${props.match.params.model}/${cookie.load("id")}/${
        props.match.params.id
      }`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookie.load("token")}`,
        },
      }
    )

      .then((response) => {
        Swal.fire(
          "Post has been Deleted Successfully!",
          "Please Wait Until the Admin Contact You.",
          "success"
        );
        return response;
      })
      .then((data) => {
        console.log("done delete post");
        history.push("/");
      });
  };

  const orderNow = async () => {
    const message = "here is the message";
    let data = {
      user: {
        id: post.userId,
        owner: post.owner,
      },
      message: message,
    };
    await fetch(`${baseURL}/${props.match.params.model}/${post.id}/neworder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if(auth.loginStatus){

          setRedirect(true);
        }else if(!auth.loginStatus){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'I Think You  Forget to Sign in  !',
            footer: '<a href="/signin">Click here to Sign In</a>'
          })
          setRedirect(false);
        }
        return response;
      })
      .then((data) => {
        console.log("done order");
      });
      if(auth.loginStatus){

        Swal.fire(
          "Order Sent Successfully!",
          "Please Wait Until the Admin Contact You.",
          "success"
        );
      }
  };
  const getDateTime = (dateTime) => {
    try {
      dateTime = dateTime.toString().replace("T", " ").replace("Z", "");
      let date = dateTime.split(" ")[0];
      let time = dateTime.split(" ")[1].split(".")[0];
      return date + " " + time;
    } catch (error) {
      return "";
    }
  };
  const getTrashIcon = () => {
    if (
      cookie.load("actions") !== undefined &&
      cookie.load("actions")[1] !== undefined &&
      cookie.load("actions")[1] === "CRUD_Users"
    ) {
      return (
        <i
          className="deletePostIcon"
          class="fa fa-trash"
          aria-hidden="true"
          style={{ float: "right", marginTop: "20px", cursor: "pointer" }}
          onClick={deletePost}
        >
          {" "}
          Delete Post
        </i>
      );
    }
  };
  let slideIndex = 1;
  const automaticShowSlides = () => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex += 1;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
  };

  useEffect(() => {
    getPost();
    window.scrollTo(0, 0);
    let interval = setInterval(() => automaticShowSlides(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container post-container-final">
      {getTrashIcon()}

      <div>
        <div class="slideshow-container">
          {images.length > 0 ? (
            images.map((image, index) => {
              return (
                <div
                  class="mySlides fade-card-carosel"
                  style={{ display: index === 0 ? "block" : "none" }}
                >
                  <img src={image} style={{ width: "600px", height:"300px" }} alt="" />
                </div>
              );
            })
          ) : (
            <div
              class="mySlides fade-card-carosel"
              style={{ display: "block" }}
            >
              <img src={noImage} style={{ width: "60%" }} alt="" />
            </div>
          )}

          {/* <a class="prev" onClick={() => plusSlides(-1)}>
            &#10094;
          </a>
          <a class="next" onClick={() => plusSlides(1)}>
            &#10095;
          </a> */}
        </div>
        <br />
      </div>

      <div className="post-details">
        <ul>
          {Object.keys(post).map((key, index) => {
            return post[key] !== null &&
              !key.includes("url") &&
              !key.includes("id") &&
              !key.includes("userId") &&
              !key.includes("updated") ? (
              <li
                key={index}
                className="post-details-item"
                style={{ color: "#27ae60" }}
              >
                <strong style={{ color: "#000" }}>
                  {key === "createdAt" ? "Created At" : key}:
                </strong>{" "}
                {key === "createdAt"
                  ? getDateTime(post[key])
                  : post[key].toString()}
              </li>
            ) : null;
          })}
        </ul>
      </div>
      { auth.user.id != post.userId && post != {} && (
        <>
          <button onClick={() => orderNow()}>order now</button>
        </>
      )}

      {redirect ? (
        <Switch>
          <Redirect from="*" to="/">
            {" "}
          </Redirect>
        </Switch>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostDetails;
