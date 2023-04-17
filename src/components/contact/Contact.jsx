import React from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";
import axios from "axios";
import { baseURL, NotificationType, Placment } from "../../utilize/constants";
import { pushNotification } from "../../utilize/pushNotifications";

const Contact = () => {
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const body = `Name : ${e.target.name.value} <br> Email : ${e.target.email.value} <br> Message : ${e.target.emailBody.value}`;
    const data = {
      name: e.target.name.value,
      email: "gittopltuc@gmail.com",
      message: body,
      subject: e.target.subject.value,
    };
    let res = await axios.post(`${baseURL}/sendEmail`, data);
    if (res.status === 200) {
      pushNotification(
        "Email Sent Successfully",
        NotificationType["success"],
        "Success",
        Placment["bottomLeft"]
      );
      console.log("done send email");
    } else {
      pushNotification(
        "Error when sending email",
        NotificationType["danger"],
        "Error",
        Placment["bottomLeft"]
      );
      console.log("error while sending email");
    }
  };

  return (
    <>
      <section className="contact mb">
        <Back
          name="Contact Us"
          title="Get Helps & Friendly Support"
          cover={img}
        />
        <div className="container">
          <form className="shadow" onSubmit={handleSubmitForm}>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type="text" placeholder="Name" name="name" />
              <input type="text" placeholder="Email" name="email" />
            </div>
            <input type="text" placeholder="Subject" name="subject" />
            <textarea cols="30" rows="10" name="emailBody"></textarea>
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
