import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import "./profile.css";
import cookie from "react-cookies";
import { baseURL } from "../../utilize/constants";
import axios from "axios";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
const Profile = () => {
  const defaultEmailLink =
    "https://i.pinimg.com/550x/1c/c5/35/1cc535901e32f18db87fa5e340a18aff.jpg";

  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    username: cookie.load("username"),
    id: cookie.load("id"),
    token: cookie.load("token"),
  });

  const [userImage, setUserImage] = useState(defaultEmailLink);

  const getUserDetails = async () => {
    await fetch(`${baseURL}/user/profile/${cookie.load("id")}`, {
      headers: new Headers({
        Authorization: `Bearer ${cookie.load("token")}`,
      }),
    })
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setUser({
          ...data,
          firstName: data.name.split(" ")[0],
          lastName: data.name.split(" ")[1],
        });
        if (data.img !== null && data.img !== undefined) {
          setUserImage(data.img);
        } else {
          setUserImage(defaultEmailLink);
        }
      });
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      city: e.target.city.value,
      username: e.target.userName.value,
      userImage: e.target.userImage.value,
      phone: e.target.phone.value,
    };

    const res = await axios({
      method: "put",
      url: `${baseURL}/user/profile/${cookie.load("id")}/update`,
      headers: { Authorization: `Bearer ${cookie.load("token")}` },
      data: data,
    });
    console.log("res : ", res);
    setEdit(false);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
    console.log("user is : ", user);
  };

  useEffect(() => {
    getUserDetails();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [edit]);

  return (
    <>
      <div className="totalProfile container">
        {edit ? (
          <>
            <button
              onClick={handleEdit}
              style={{ height: "fit-content", marginTop: "5px" }}
            >
              Back
            </button>
            <div className="edit-form-profile">
              <form onSubmit={handleSubmit}>

              <FloatingLabel
                  controlId="floatingTextarea"
                  label="Username"
                  className="mb-3"  
                >
                  <Form.Control className="inputF"
                    placeholder="edit Username"
                    name="userName"   value={user.username}  onChange={handleChange}
                  />
                </FloatingLabel>

              <FloatingLabel
                  controlId="floatingTextarea" 
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control className="inputF"
                    as="textarea"
                    placeholder="edit first name"
                    name="firstName" value={user.firstName}  onChange={handleChange}
                  />
                </FloatingLabel>
                 

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                  className="inputF"
                  as="textarea" 
                    placeholder="edit last name"
                    name="lastName" value={user.lastName}  onChange={handleChange}
                  />
                </FloatingLabel>

                 <FloatingLabel
                  controlId="floatingTextarea"
                  label="Password"
                  className="mb-3" 
                >
                  <Form.Control
                    
                    placeholder="Password"  className="inputF"
                    name="password" type="password" onChange={handleChange} required
                  />
                </FloatingLabel>
              
                <FloatingLabel controlId="floatingSelect" label="City">
                  <Form.Select
                    aria-label="Floating label select example"   className="inputF"
                    name="city" placeholder="edit City"  value={user.city}  onChange={handleChange}
                  >
                    <option value="Amman">Amman</option>
                    <option value="Zarqa">Zarqa</option>
                    <option value="Irbid">Irbid</option>
                    <option value="Aqaba">Aqaba</option>
                    <option value="Mafraq">Mafraq</option>
                    <option value="Jarash">Jarash</option>
                    <option value="Ma'an">Ma'an</option>
                    <option value="Karak">Karak</option>
                    <option value="Madaba">Madaba</option>
                    <option value="Ajloun">Ajloun</option>
                    <option value="Tafilah">Tafilah</option>
                    <option value="Al-Balqa">Al-Balqa</option>
                  </Form.Select>
                </FloatingLabel>
                {/* <label>City : </label>
                <input
                  type="text"
                  placeholder="edit City"
                  name="city"
                  value={user.city}
                  onChange={handleChange}
                /> */}


                {/* <label>Username : </label>
                <input
                  type="text"
                  placeholder="edit Username"
                  name="userName"
                  value={user.username}
                  onChange={handleChange}
                /> */}
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control className="inputF"
                   
                    placeholder="edit email"
                    name="email" type="email"   value={user.email}  onChange={handleChange}
                  />
                </FloatingLabel>
{/* 
                <label>Email : </label>
                <input
                  type="text"
                  placeholder="edit email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                /> */}
<FloatingLabel
                  controlId="floatingTextarea"
                  label="Phone"
                  className="mb-3"
                >
                  <Form.Control className="inputF"
                    as="textarea"
                    placeholder="edit phone"
                    name="phone"     value={user.phone}  onChange={handleChange}
                  />
                </FloatingLabel>
                {/* <label>phone : </label>
                <input
                  type="text"
                  placeholder="edit phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />  */}

<FloatingLabel
                  controlId="floatingTextarea"
                  label="User Image"
                  className="mb-3"
                >
                  <Form.Control className="inputF"
                    as="textarea"
                    placeholder="https://...... "
                    name="userImage"  value={userImage}
                    onChange={(e) => {
                      setUserImage(e.target.value);
                    }}
                  />
                   </FloatingLabel>
                {/* <label>User image : </label>
                <input
                  type="text"
                  placeholder="add image link"
                  name="userImage"
                  value={userImage}
                  onChange={(e) => {
                    setUserImage(e.target.value);
                  }}
                /> */}

                <button type="submit" style={{ marginTop: "5px" }}>
                  Save Changes
                </button>
              </form>
            </div>

            <div className="profile">
              <img
                id="img"
                style={{ height: "120px", width: "120px" }}
                src={userImage}
                alt=""
              ></img>
            </div>
          </>
        ) : (
          <div className="profile container">
            <div>
              <img id="img" src={userImage} alt=""></img>
            </div>
            <div>
              <h2 style={{ marginBottom: "20px" }}>Personal information</h2>
              <ul style={{ marginBottom: "20px" }}>
                <li>
                  <strong>name :</strong> {user.firstName + " " + user.lastName}
                </li>
                <li>
                  <strong>username :</strong> {user.username}
                </li>
                <li>
                  <strong>city :</strong> {user.city}
                </li>
                <li>
                  <strong>phone :</strong> {user.phone}
                </li>
                <li>
                  <strong>email :</strong> {user.email}
                </li>
              </ul>

              <button onClick={handleEdit}>Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
