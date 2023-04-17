import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import cookie from "react-cookies";
import { baseURL, defaultImageLink } from "../../utilize/constants";
import axios from "axios";

const UserDetails = (props) => {
  console.log("props is : ", props);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(props.location.userData);
  }, []);

  return (
    <div className="totalProfile container">
      <div className="profile container">
        <div>
          <img id="img" src={user.userImage || defaultImageLink} alt=""></img>
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
              <strong>phone :</strong> {user.phoneNumber}
            </li>
            <li>
              <strong>email :</strong> {user.email}
            </li>
          </ul>

          {/* <button onClick={handleEdit}>Edit Profile</button> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
