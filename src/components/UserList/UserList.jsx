import { useEffect, useState } from "react";
import { baseURL, defaultImageLink } from "../../utilize/constants";
import "./UserList.css";
import cookie from "react-cookies";
import Heading from "../common/Heading";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserList = () => {
  const [userList, setUserList] = useState([]);

  const getUsers = async () => {
    await fetch(`${baseURL}/users`, {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserList(data);
      });
  };

  const deleteUser = async (userName) => {
    await fetch(`${baseURL}/delete/${userName}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    })
      .then((response) => {
        return response;
      })
      .then((data) => {
        getUsers();
 Swal.fire(
  "so Smoothy !",
  "User Has Been Deleted Successfully ",
  "success"
);
      });
  };

  useEffect(() => {
    getUsers();
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="team background">
      <div className="container">
        <Heading title="Users List" />
        <div className="content mtop grid3">
          {userList.map((val, index) => (
            

              <div className="shadowUserList">
            <div className="box" key={index}>
              <button className="btn3">
                {val.firstName + " " + val.lastName}
              </button>
              <div className="details">
                <div className="img">
                  <img
                    src={
                      val.userImage !== null ? val.userImage : defaultImageLink
                    }
                    alt=""
                  />
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <i className="fa fa-location-dot"></i>
                <label>{val.city}</label>
                <h4>{val.username}</h4>
                <div className="button flex">
                  <button
                    className="btn4"
                    onClick={() => deleteUser(val.username)}
                  >
                    <i
                      class="fa fa-trash"
                      aria-hidden="true"
                      style={{
                        cursor: "pointer",
                        color:"red",
                          fontSize : "30px"
                      }}
                    ></i>
                    Delete
                  </button>
                  <Link
                    to={{
                      pathname: `/userDetails`,
                      userData: val,
                    }}
                  >
                    <button className="btn4">
                      <i
                        class="fa fa-info-circle"
                        aria-hidden="true"
                        style={{
                          cursor: "pointer",
                          color:"orange",
                          fontSize : "30px"
                        }}
                      ></i>
                      View
                    </button>
                  </Link>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserList;
