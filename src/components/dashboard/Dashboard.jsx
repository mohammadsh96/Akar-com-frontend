import React, { useState, useContext, useEffect } from "react";
import img from "../images/services.jpg";
import Back from "../common/Back";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { LoginContext } from "../context/context";
import { Redirect, Switch } from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import PostsCards from "../userMane/userPostCards"
import Heading from "../common/Heading";
import { baseURL, NotificationType, Placment } from "../../utilize/constants";
import { pushNotification } from "../../utilize/pushNotifications";
import { RotatingCircleLoader } from 'react-loaders-kit';
import Button from "react-bootstrap/Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './dashboard.css'
export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [user] = useState({
    token: cookie.load("token") || null,
    id: cookie.load("id"),
  });
  const auth = useContext(LoginContext);
  const handleLogout = () => {
    auth.logoutFunction();
  };

  const [orders, setOrders] = useState([]);
  const [client, setClient] = useState([]);
  const [owner, setOwner] = useState([]);
  const [post, setPost] = useState([]);

  const [show ,setShow]=useState(true)
  const [orderId ,setOrderId]=useState()

  const [Reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
   
  const loaderProps = {
    loading,
    size: 40,
    duration: 1.3,
    colors: ['#5e22f0', '#5e22f0', '#c46210', '#27ae60']
  }

  const fetchOrders = async () => {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    const data = await axios.get(
      `${baseURL}/allorders`,

      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    for (let stu of data.data) {
      let a1 = await fetchOwners(stu.ownerId);
      let a2 = await fetchClients(stu.clientId);
      let a3 = await fetchPosts(stu.postId, stu.model);
      arr1.push(a1);
      arr2.push(a2);
      arr3.push(a3);
    }
    setOwner(arr1);
    setClient(arr2);
    setPost(arr3);
    setOrders(data.data);
    setReload(false)
  };
  const fetchClients = async (clientId) => {
    if (clientId) {
      const allClients = await axios.get(`${baseURL}/users/${clientId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return allClients.data;
      // setClient([...client, allClients.data]);
    }
  };

  const fetchOwners = async (ownerId) => {
    if (ownerId) {
      const allOwners = await axios.get(`${baseURL}/users/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return allOwners.data;
      // setOwner([...owner, allOwners.data]);
    }
  };
  const fetchPosts = async (postId, model) => {
    if (postId && model) {
      const allPosts = await axios.get(`${baseURL}/${model}/${postId}`);
      return allPosts.data;
      // setPost([...post, allPosts.data]);
    }
  };
  const onAcceptOrder = async (clientId, ownerId ,id ,postId) => {
    let client1 = client.find((item) => item.id === clientId);
    let owner1 = owner.find((item) => item.id === ownerId);
    let clientEmail = client1.email;
    let ownerEmail = owner1.email;
    let data = {
      name: "AkarCom system",
      email: clientEmail,
      message: "the admin has been accepted your order",
      subject: "order accepted",
    };
    console.log(id ,postId)
    console.log(user.token)

    acceptOrder(id, postId)

    // let res = await axios.post(`${baseURL}/sendEmail`, data);
    // data = {
    //   name: "AkarCom system",
    //   email: ownerEmail,
    //   message: "the admin has been accepted order on your post",
    //   subject: "order accepted",
    // };
    // res = await axios.post(`${baseURL}/sendEmail`, data);
    // if (res.status === 200) {
    //   pushNotification(
    //     "Order accepted Successfully",
    //     NotificationType["success"],
    //     "Success",
    //     Placment["bottomLeft"]
    //   );
    // } else {
    //   pushNotification(
    //     "Error when accept order",
    //     NotificationType["danger"],
    //     "Error",
    //     Placment["bottomLeft"]
    //   );
    // }
  };
  const acceptOrder =async (orderId , postId)=>{
    let accept = await axios.post(`${baseURL}/allorders/${postId}/${orderId}/accept` , {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
   
     console.log(accept);
     setOrderId(orderId)

     setShow(false)
     
   }
  const onRejectOrder = async (clientId ,id ,postId) => {
    let client1 = client.find((item) => item.id === clientId);
    let clientEmail = client1.email;
    rejectOrder(id,postId)

    // let data = {
    //   name: "AkarCom system",
    //   email: clientEmail,
    //   message: "the admin has been rejected your order",
    //   subject: "order rejected",
    // };
    // let res = await axios.post(`${baseURL}/sendEmail`, data);
    // if (res.status === 200) {
    //   pushNotification(
    //     "Order rejected Successfully",
    //     NotificationType["success"],
    //     "Success",
    //     Placment["bottomLeft"]
    //   );
    // } else {
    //   pushNotification(
    //     "Error when reject order",
    //     NotificationType["danger"],
    //     "Error",
    //     Placment["bottomLeft"]
    //   );
    // }

  };


  const rejectOrder =async (orderId,postId)=>{
    let reject = await axios.post(`${baseURL}/allorders/${postId}/${orderId}/reject` , {
       headers: {
         Authorization: `Bearer ${user.token}`,
       },
     })
     console.log(reject)
     setOrderId(orderId)
    setShow(false)

    }


  useEffect(() => {

    fetchOrders();
  }, []);

  // const getOrder = async (orderId, postId) => {
  //   const order = await axios.get(`${baseURL}/allorders/${postId}/${orderId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );
  // }


  // const handleAcceptEvent = async (orderId, postId) => {
  //   let order = getOrder(orderId, postId);
  //   console.log(order);

  //   try {
  //     const data = await axios.post(
  //       `${baseURL}/allorders/${postId}/${orderId}/accept`, {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     console.log(data);
  //   }
  //   catch (error) {
  //     console.log(error.response.data);
  //   }
  //   //if (data.data) {
  //   // cookie.save("postId", data.data.id);
  //   // setGoToPost(true);
  //   //  }


  // }

  // const handleRejectEvent = async (orderId, postId) => {
  //   let order = getOrder(orderId, postId);
  //   console.log(order);

  //   try {
  //     const data = await axios.post(
  //       `${baseURL}/allorders/${postId}/${orderId}/reject`, {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //       }
  //     );
  //     console.log(data);
  //   }
  //   catch (error) {
  //     console.log(error.response.data);
  //   }
  // }

  return (
    <>
      <section className="services mb">
        <Back
          name="Dashboard"
          title="Dashboard - Find all your posts"
          cover={img}
        />
        <div className="featured container"></div>
      </section>

      {cookie.load("actions").includes("CRUD_Users") ? (

        <div>
          <Heading title="clients recent orders" subtitle="orders table"></Heading>
          <br></br>

          {Reload ? 
          <div align="middle">
            <RotatingCircleLoader {...loaderProps} />
            <br></br>
            <br></br>
            <br></br>
          </div> :

          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Client</th>
                <th scope="col">Location</th>
                <th scope="col">Process</th>
                <th scope="col">model</th>
                <th scope="col">Created At</th>
                <th scope="col">Owner</th>
                <th scope="col">Post ID</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {orders.map((val, index) => {
                const { id, clientId, ownerId, postId, model, createdAt } = val;
                if (id !== undefined) {
                  return (
                    <tr key={index}>
                      <td>{id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                            alt=""
                            style={{ width: "45px", height: "45px" }}
                            className="rounded-circle"
                          />

                          <div className="ms-3">

                            <p className="fw-bold mb-1">{client[index].username}</p>
                            <p className='text-muted mb-0'>{client[index].email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="fw-normal mb-1">{post[index].city}</p>
                      </td>
                      <td>
                        <MDBBadge
                          color={post[index].process === "Rent" ? "warning" : "primary"}
                          pill
                          style={{ width: "70px", height: "25px" }}>
                          {post[index].process}
                        </MDBBadge>
                      </td>
                      <td>{model}</td>
                      <td>{createdAt.split("T")[0]}
                          <br></br>
                          {createdAt.split("T")[1].split(".")[0]}</td>
                      <td>{owner[index].username}</td>
                      <td>{postId}</td>
                        {show  || orderId!==id ?   
                      <td>
                        
                        <Button onClick={() => {
                            onAcceptOrder(clientId, ownerId ,id ,postId);
                          }} variant="success"> Accept</Button>
                     
                            <Button onClick={() => {
                              onRejectOrder(clientId, id ,postId);
                            }} variant="danger"> Reject</Button>
                                <FloatingLabel
        controlId="floatingTextarea"
        label="Let's Meet on "
        className="mb-3"   className="ordersInput"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>             
                      </td>
                        : 
                        <td>
                        <label  >Client has been notified </label>
                        </td>
                        }
                    </tr>
                  );
                }
                return {};
              })}
            </MDBTableBody>
          </MDBTable>
          }
        </div>
      ) : (
        <>



          <section>
            <Heading title="manage your posts" subtitle="Start your Business"></Heading>
            <a href='/posts'>
              <button className='cc1'>Create Post</button>
            </a>
          </section>

          <div className='container recent'>
            < PostsCards />
          </div>


        </>
      )}
    </>
  );
}

