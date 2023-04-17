import React, { useState ,useEffect } from "react";
import "./posts.css";
import PopoverPositionedExample from '../model/model'
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Back from "../common/Back";
import Heading from "../common/Heading";
import {baseURL} from "../../utilize/constants";

import img from "../images/real-estate-hero.jpg";
import axios from "axios";
import cookie from "react-cookies";
import { Switch, Redirect } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
export default function CreatePost() {
  const [model, setModel] = useState("houses");
  const [process, setProcess] = useState("Sell");
  const [user] = useState({
    token: cookie.load("token") || null,
    id: cookie.load("id"),
  });
  
  const placement ="top" ;
  const [available, setAvailable] = useState(true);
  // eslint-disable-next-line
  const [furnished, setFurnished] = useState(true);
  // eslint-disable-next-line
  const [elevator, setElevator] = useState(true);
  console.log(cookie.load("actions")[0]);

  const [body, setBody] = useState({});
  const [goToPost, setGoToPost] = useState(false);




  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (model === "lands" && process === "Sell") {
      setBody({
        process: process,
        type: e.target.Type.value,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "lands" && process === "Rent") {
      setBody({
        process: process,
        type: e.target.Type.value,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        rentDuration: e.target.RentDuration.value,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "houses" && process === "Sell") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,

        floors: e.target.floors.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        city: e.target.City.value,
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "houses" && process === "Rent") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,

        floors: e.target.floors.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        rentDuration: e.target.RentDuration.value,
        city: e.target.City.value,
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "villas" && process === "Sell") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,
        floors: e.target.floors.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "villas" && process === "Rent") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,
        floors: e.target.floors.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        rentDuration: e.target.RentDuration.value,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "apartments" && process === "Sell") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        area: e.target.Area.value,
        floorNum: e.target.FloorNumber.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        elevator: elevator,
        furnished: furnished,
        city: e.target.City.value,
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "apartments" && process === "Rent") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        area: e.target.Area.value,
        floorNum: e.target.FloorNumber.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        elevator: elevator,
        furnished: furnished,
        rentDuration: e.target.RentDuration.value,
        city: e.target.City.value,
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "chalets" && process === "Sell") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "chalets" && process === "Rent") {
      setBody({
        process: process,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        rentDuration: e.target.RentDuration.value,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "warehouses" && process === "Sell") {
      setBody({
        process: process,
        type: e.target.Type.value,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "warehouses" && process === "Rent") {
      setBody({
        process: process,
        type: e.target.Type.value,
        owner: e.target.Owner.value,
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        rentDuration: e.target.RentDuration.value,
        city: e.target.City.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    }



  };

  useEffect(()=>{

    post()
  
  },[body])
  const post = async () => {
    const data = await axios.post(
      `${baseURL}/newpost/${user.id}/${model}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (data.data.id) {
      cookie.save("postId", data.data.id);
      setGoToPost(true);
    }
    console.log(data);
  };

  return (
    <>
      <Back name="" title="Fill Your Real Estate Info" cover={img} />
      <div className="head"> 
      <Heading title='Create and publish your wonderful property details ' subtitle='Remember Providing Clear and Honest Details will help to Attract more Clients ' />
      </div>
      <div className="Post">
          <h3>What do you Like to Post ?  </h3>
        <div className="beforeForm">
          <FloatingLabel controlId="floatingSelect" label="Model">
            <Form.Select
              aria-label="Floating label select example" size="" 
              name="Process"
              onClick={(e) => {
                setModel(e.target.value);
              }}
            >
              <option value="villas">villas</option>
              <option value="lands">lands</option>
              <option value="houses">houses</option>
              <option value="chalets">chalets</option>
              <option value="apartments">apartments</option>
              <option value="warehouses">warehouses</option>
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel controlId="floatingSelect" label="Process">
            <Form.Select
              aria-label="Floating label select example" size=""
              name="Process"
              onClick={(e) => {
                setProcess(e.target.value);
              }}
            >
              <option value="Sell">Sell</option>
              <option value="Rent">Rent</option>
            </Form.Select>
          </FloatingLabel>
        </div>

        <div className="Forms">
          {/* lands form ----------------------------------------------------  */}

          {model === "lands" ? (
            <>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingSelect" label="City">
                  <Form.Select
                    aria-label="Floating label select example" 
                    name="City" 
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

                <FloatingLabel
                  controlId="floatingSelect"
                  label="Type of Estate"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Type"
                  >
                    <option value="Industrial">Industrial</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Agricultural">Agricultural</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Availability">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Availability"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setAvailable(false)
                        : setAvailable(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Owner">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>
                </FloatingLabel>

                {process === "Rent" ? (
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Rent Duration"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="RentDuration"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </Form.Select>
                  </FloatingLabel>
                ) : (
                  <></>
                )}

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Area of Estate"
                    name="Area"
                  />
                </FloatingLabel>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Price</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    name="Price"
                    type="number"
                    placeholder="Enter price in JD."
                  />
                  <InputGroup.Text>JD</InputGroup.Text>
                </InputGroup>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="address"
                    name="address"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="More Information"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Something special about your estate."
                    name="moreInfo"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url1"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url2"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>
                <Button type="submit" variant="success">Submit</Button>

              </Form>
            </>
          ) : (
            <></>
          )}

          {/* villas form ------------------------------------------------- */}

          {model === "villas" ? (
            <>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingSelect" label="City">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="City"
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

                <FloatingLabel
                  controlId="floatingSelect"
                  label="Number of Floors"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    name="floors"
                  >
                    <option value="1">one</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">More</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Furnished">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Furnished"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setFurnished(false)
                        : setFurnished(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Rooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Rooms"
                  >
                    <option value="Studio">Studio</option>
                    <option value="1-Bedroom">1-Bedroom</option>
                    <option value="2-Bedrooms">2-Bedrooms</option>
                    <option value="3-Bedrooms">3-Bedrooms</option>
                    <option value="4-Bedrooms">4-Bedrooms</option>
                    <option value="5-Bedrooms">5-Bedrooms</option>
                    <option value="+6-Bedrooms">+6-Bedrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Bathrooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Bathrooms"
                  >
                    <option value="1-Bathroom">1-Bathroom</option>
                    <option value="2-Bathrooms">2-Bathrooms</option>
                    <option value="3-Bathrooms">3-Bathrooms</option>
                    <option value="4-Bathrooms">4-Bathrooms</option>
                    <option value="+5-Bathrooms">+5-Bathrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Owner">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Building Age">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="BuildingAge"
                  >
                    <option value="Under-Construction">
                      Under-Construction
                    </option>
                    <option value="0-11 months">0-11 months</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="6-9 years">6-9 years</option>
                    <option value="10-19 years">+10-19 years</option>
                    <option value="+20 years">+20 years</option>
                  </Form.Select>
                </FloatingLabel>

                {process === "Rent" ? (
                  <>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Rent Duration"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        name="RentDuration"
                      >
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </Form.Select>
                    </FloatingLabel>
                  </>
                ) : (
                  <></>
                )}

                <FloatingLabel controlId="floatingSelect" label="Availability">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Availability"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setAvailable(false)
                        : setAvailable(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Land Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    type="number"
                    placeholder="Enter land area in m2."
                    name="LandArea"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Surface Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    type="number"
                    placeholder="Enter surface area in m2."
                    name="SurfaceArea"
                  />
                </FloatingLabel>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Price</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    name="Price"
                    type="number"
                    placeholder="Enter price in JD."
                  />
                  <InputGroup.Text>JD</InputGroup.Text>
                </InputGroup>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="address"
                    name="address"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="More Information"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Something special about your estate."
                    name="moreInfo"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url1"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url2"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>
                <Button type="submit" variant="success">Submit</Button>

              </Form>
            </>
          ) : (
            <></>
          )}

          {/* houses form ------------------------------------------------------ */}

          {model === "houses" ? (
            <>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingSelect" label="City">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="City"
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

                <FloatingLabel
                  controlId="floatingSelect"
                  label="Number of Floors"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    name="floors"
                  >
                    <option value="1">one</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">More</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Furnished">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Furnished"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setFurnished(false)
                        : setFurnished(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Rooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Rooms"
                  >
                    <option value="Studio">Studio</option>
                    <option value="1-Bedroom">1-Bedroom</option>
                    <option value="2-Bedrooms">2-Bedrooms</option>
                    <option value="3-Bedrooms">3-Bedrooms</option>
                    <option value="4-Bedrooms">4-Bedrooms</option>
                    <option value="5-Bedrooms">5-Bedrooms</option>
                    <option value="+6-Bedrooms">+6-Bedrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Bathrooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Bathrooms"
                  >
                    <option value="1-Bathroom">1-Bathroom</option>
                    <option value="2-Bathrooms">2-Bathrooms</option>
                    <option value="3-Bathrooms">3-Bathrooms</option>
                    <option value="4-Bathrooms">4-Bathrooms</option>
                    <option value="+5-Bathrooms">+5-Bathrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Owner">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Building Age">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="BuildingAge"
                  >
                    <option value="Under-Construction">
                      Under-Construction
                    </option>
                    <option value="0-11 months">0-11 months</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="6-9 years">6-9 years</option>
                    <option value="10-19 years">+10-19 years</option>
                    <option value="+20 years">+20 years</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="Finishing">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Finishing"
                  >
                    <option value="Unfinished">Unfinished</option>
                    <option value="Semi-Finished">Semi-Finished</option>
                    <option value="Fully-Finished">Fully-Finished</option>
                    <option value="Lux">Lux</option>
                    <option value="Super-Lux">Super-Lux</option>
                    <option value="Ultra-Lux">Ultra-Lux</option>
                    <option value="Deluxe">Deluxe</option>
                  </Form.Select>
                </FloatingLabel>

                {process === "Rent" ? (
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Rent Duration"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="RentDuration"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </Form.Select>
                  </FloatingLabel>
                ) : (
                  <></>
                )}

                <FloatingLabel controlId="floatingSelect" label="Availability">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Availability"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setAvailable(false)
                        : setAvailable(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Land Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    type="number"
                    placeholder="Enter land area in m2."
                    name="LandArea"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Surface Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    type="number"
                    placeholder="Enter surface area in m2."
                    name="SurfaceArea"
                  />
                </FloatingLabel>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Price</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    name="Price"
                    type="number"
                    placeholder="Enter price in JD."
                  />
                  <InputGroup.Text>JD</InputGroup.Text>
                </InputGroup>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="address"
                    name="address"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="More Information"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Something special about your estate."
                    name="moreInfo"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url1"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url2"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>
                <Button type="submit" variant="success">Submit</Button>

              </Form>
            </>
          ) : (
            <></>
          )}

          {/*apartments form ------------------------------------------------------ */}

          {model === "apartments" ? (
            <>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingSelect" label="City">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="City"
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

                <FloatingLabel controlId="floatingSelect" label="Availability">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Availability"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setAvailable(false)
                        : setAvailable(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Furnished">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Furnished"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setFurnished(false)
                        : setFurnished(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Floor Numb">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="FloorNumber"
                  >
                    <option value="Basement">Basement</option>
                    <option value="Ground-Floor">Ground-Floor</option>
                    <option value="First-Floor">First-Floor</option>
                    <option value="Second-Floor">Second-Floor</option>
                    <option value="Third-Floor">Third-Floor</option>
                    <option value="Fourth-Floor">Fourth-Floor</option>
                    <option value="Fifth-Floor">Fifth-Floor</option>
                    <option value="Higher than 5">Higher than 5</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Finishing">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Finishing"
                  >
                    <option value="Unfinished">Unfinished</option>
                    <option value="Semi-Finished">Semi-Finished</option>
                    <option value="Fully-Finished">Fully-Finished</option>
                    <option value="Lux">Lux</option>
                    <option value="Super-Lux">Super-Lux</option>
                    <option value="Ultra-Lux">Ultra-Lux</option>
                    <option value="Deluxe">Deluxe</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Rooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Rooms"
                  >
                    <option value="Studio">Studio</option>
                    <option value="1-Bedroom">1-Bedroom</option>
                    <option value="2-Bedrooms">2-Bedrooms</option>
                    <option value="3-Bedrooms">3-Bedrooms</option>
                    <option value="4-Bedrooms">4-Bedrooms</option>
                    <option value="5-Bedrooms">5-Bedrooms</option>
                    <option value="+6-Bedrooms">+6-Bedrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Bathrooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Bathrooms"
                  >
                    <option value="1-Bathroom">1-Bathroom</option>
                    <option value="2-Bathrooms">2-Bathrooms</option>
                    <option value="3-Bathrooms">3-Bathrooms</option>
                    <option value="4-Bathrooms">4-Bathrooms</option>
                    <option value="+5-Bathrooms">+5-Bathrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Building Age">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="BuildingAge"
                  >
                    <option value="Under-Construction">
                      Under-Construction
                    </option>
                    <option value="0-11 months">0-11 months</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="6-9 years">6-9 years</option>
                    <option value="10-19 years">+10-19 years</option>
                    <option value="+20 years">+20 years</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Elevator">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Elevator"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setElevator(false)
                        : setElevator(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Owner">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>
                </FloatingLabel>

                {process === "Rent" ? (
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Rent Duration"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="RentDuration"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </Form.Select>
                  </FloatingLabel>
                ) : (
                  <></>
                )}

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    type="number"
                    placeholder="Enter land area in m2."
                    name="Area"
                  />
                </FloatingLabel>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Price</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    name="Price"
                    type="number"
                    placeholder="Enter price in JD."
                  />
                  <InputGroup.Text>JD</InputGroup.Text>
                </InputGroup>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="address"
                    name="address"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="More Information"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Something special about your estate."
                    name="moreInfo"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url1"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url2"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>
                <Button type="submit" variant="success">Submit</Button>

              </Form>
            </>
          ) : (
            <> </>
          )}

          {/*warehouses form</div> -----------------------------------------------------------*/}
          {model === "warehouses" ? (
            <>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingSelect" label="City">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="City"
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

                <FloatingLabel
                  controlId="floatingSelect"
                  label="Type of Estate"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Type"
                  >
                    <option value="Industrial">Industrial</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Agricultural">Agricultural</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Availability">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Availability"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setAvailable(false)
                        : setAvailable(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Owner">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>
                </FloatingLabel>

                {process === "Rent" ? (
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Rent Duration"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="RentDuration"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </Form.Select>
                  </FloatingLabel>
                ) : (
                  <></>
                )}

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Area of Estate"
                    name="Area"
                  />
                </FloatingLabel>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Price</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    name="Price"
                    type="number"
                    placeholder="Enter price in JD."
                  />
                  <InputGroup.Text>JD</InputGroup.Text>
                </InputGroup>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="address"
                    name="address"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="More Information"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Something special about your estate."
                    name="moreInfo"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url1"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url2"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>
                <Button type="submit" variant="success">Submit</Button>

              </Form>
            </>
          ) : (
            <></>
          )}

          {/* chalets form -----------------------------------------------------------------*/}
          {model === "chalets" ? (
            <>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingSelect" label="City">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="City"
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

                <FloatingLabel controlId="floatingSelect" label="Availability">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Availability"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setAvailable(false)
                        : setAvailable(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Furnished">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Furnished"
                    onClick={(e) => {
                      e.target.value === "false"
                        ? setFurnished(false)
                        : setFurnished(true);
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Rooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Rooms"
                  >
                    <option value="Studio">Studio</option>
                    <option value="1-Bedroom">1-Bedroom</option>
                    <option value="2-Bedrooms">2-Bedrooms</option>
                    <option value="3-Bedrooms">3-Bedrooms</option>
                    <option value="4-Bedrooms">4-Bedrooms</option>
                    <option value="5-Bedrooms">5-Bedrooms</option>
                    <option value="+6-Bedrooms">+6-Bedrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Bathrooms">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Bathrooms"
                  >
                    <option value="1-Bathroom">1-Bathroom</option>
                    <option value="2-Bathrooms">2-Bathrooms</option>
                    <option value="3-Bathrooms">3-Bathrooms</option>
                    <option value="4-Bathrooms">4-Bathrooms</option>
                    <option value="+5-Bathrooms">+5-Bathrooms</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Owner">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Building Age">
                  <Form.Select
                    aria-label="Floating label select example"
                    name="BuildingAge"
                  >
                    <option value="Under-Construction">
                      Under-Construction
                    </option>
                    <option value="0-11 months">0-11 months</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="6-9 years">6-9 years</option>
                    <option value="10-19 years">+10-19 years</option>
                    <option value="+20 years">+20 years</option>
                  </Form.Select>
                </FloatingLabel>
                {process === "Rent" ? (
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Rent Duration"
                  >
                    <Form.Select
                      aria-label="Floating label select example"
                      name="RentDuration"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </Form.Select>
                  </FloatingLabel>
                ) : (
                  <></>
                )}
<FloatingLabel
                  controlId="floatingTextarea"
                  label="Land Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    type="number"
                    placeholder="Enter land area in m2."
                    name="LandArea"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Surface Area"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    type="number"
                    placeholder="Enter surface area in m2."
                    name="SurfaceArea"
                  />
                </FloatingLabel>


                <InputGroup className="mb-3">
                  <InputGroup.Text>Price</InputGroup.Text>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    name="Price"
                    type="number"
                    placeholder="Enter price in JD."
                  />
                  <InputGroup.Text>JD</InputGroup.Text>
                </InputGroup>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="address"
                    name="address"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="More Information"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Something special about your estate."
                    name="moreInfo"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url1"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url2"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Add image URL"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>
                <Button type="submit" variant="success">Submit</Button>

              </Form>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      
      {goToPost ? (
        <>
          <Switch>
            <Redirect
              from="*"
              to={`/postdetails/${model}/${cookie.load("postId")}`}
              value={cookie.load("postId")}
            ></Redirect>
          </Switch>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
