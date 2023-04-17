import React, { useEffect, useState, useContext } from "react"
import { LoginContext } from "../context/context"
import { featured } from "../data/Data"
import Logo from "../home/recent/noImage.png"
import cookie from "react-cookies";
import "./U.css"
import { baseURL} from "../../utilize/constants";

import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Switch, Redirect } from "react-router-dom";



const PostsCards = (props) => {

  const [user] = useState({
    token: cookie.load("token") || null,
    id: cookie.load("id"),
  });
  const auth = useContext(LoginContext)
  
  const [available, setAvailable] = useState(true);
  
  const [furnished, setFurnished] = useState(true);
  // eslint-disable-next-line
  const [elevator, setElevator] = useState(true);
  console.log(cookie.load("actions")[0]);

  const [editBody, setEditBody] = useState({});
  // const [goToPost, setGoToPost] = useState(false);
  const [process, setProcess] = useState("Sell")
  const [Posts, setPosts] = useState([])

  const [model, setModel] = useState("lands")
  const [PostModel, setPostModel] = useState("")
  const [PostId, setPostId] = useState()
const [res ,setRes] =useState([])

  
const [update,setUpdate]=useState(false)
  const fetchPost = async () => {
    const data = await axios.get(`${baseURL}/dashboard/${user.id}/${model}`,

      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    
    setPosts(data.data)
if(data.data.length <=0 ){
}
  };

  const deletePost = async (id) => {
    await axios.delete(`${baseURL}/dashboard/${user.id}/${model}/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })

      .then(response => {
        return (response)
      }).catch(err => {
        return err
      })

  }



  useEffect(() => {
    fetchPost()
  }, [model])
  const handleEdit = (e) => {
    e.preventDefault();
 
    if (model === "lands" && process === "Sell") {
      setEditBody({
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "lands" && process === "Rent") {
      setEditBody({
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        rentDuration: e.target.RentDuration.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "houses" && process === "Sell") {
      setEditBody({
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,

        floors: e.target.floors.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "houses" && process === "Rent") {
      setEditBody({
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
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "villas" && process === "Sell") {
      setEditBody({
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,
        floors: e.target.floors.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "villas" && process === "Rent") {
      setEditBody({
      
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
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "apartments" && process === "Sell") {
      setEditBody ({
        price: e.target.Price.value,
        area: e.target.Area.value,
        floorNum: e.target.FloorNumber.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        elevator: elevator,
        furnished: furnished,
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "apartments" && process === "Rent") {
      setEditBody ({
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
        address: e.target.address.value,
        finishing: e.target.Finishing.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "chalets" && process === "Sell") {
      setEditBody ({
        
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "chalets" && process === "Rent") {
      setEditBody ({
        price: e.target.Price.value,
        surfaceArea: e.target.SurfaceArea.value,
        landArea: e.target.LandArea.value,
        buildingAge: e.target.BuildingAge.value,
        rooms: e.target.Rooms.value,
        bathrooms: e.target.Bathrooms.value,
        availability: available,
        furnished: furnished,
        rentDuration: e.target.RentDuration.value,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "warehouses" && process === "Sell") {
      setEditBody ({
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        address: e.target.address.value,
        moreInfo: e.target.moreInfo.value,
        url1: e.target.url1.value,
        url2: e.target.url2.value,
        url3: e.target.url3.value,
      });
    } else if (model === "warehouses" && process === "Rent") {
      setEditBody 
      ({
        
        price: e.target.Price.value,
        area: e.target.Area.value,
        availability: available,
        rentDuration: e.target.RentDuration.value,
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

},[editBody])
 const updatePost=(id,model)=>{

   setUpdate(true)
   setPostId(id)
   setPostModel(model)
  //  sendPost()
 }

//  const sendPost=()=>{

//   post()
//   console.log(PostId,PostModel)


// }


const post = async () => {
  const data = await axios.put(
    `${baseURL}/dashboard/${user.id}/${PostModel}/${PostId}`,
    editBody,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  console.log(data)
setRes(data.data)
}; 


  return (

    <>


        

      <div className='modelIcon' >
        {featured.map((items, index) => (
          <div className='model-box' key={index} >
            <img src={items.cover} alt='' />
            <h4 >{items.name}</h4>
            <br></br>
            <br></br>
            <button onClick={() => setModel(items.name)}>
              Filter
            </button>
          </div>

        ))}
      </div>

      <br />
      <br />
      <div className='content grid3 mtop'>
        {Posts.map((val, index) => {
          console.log("val", val);
          const { process, model, owner, price, city, id, url1 } = val

          return (
            <div className='box shadow' key={index}>
                <a href={`/postdetails/${model}/${id}`}>
              <div className='postImg'>
                <img src={url1 || Logo} alt='' />
              </div>
              <div className='text'>
              
                <div className='category_flex'>
                  <span style={{ background: process === "Sell" ? "#25b5791a" : "#ff98001a", color: process === "Sell" ? "#25b579" : "#ff9800" }}>{process}</span>
                  <p className="heart">
                    <i className='fa fa-heart'></i>
                  </p>
                </div>
                <h4>{owner}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {city}
                </p>
              </div>
                </a>

              <div className='buttonflex2'>
               <a href="/"> <button onClick={() => deletePost(id)} >delete </button>
                </a>
                 <button onClick={() => updatePost(id ,model)} >Update </button>
              </div>
            </div>

          )
        })}
      </div>
{update ?   
      <div className="Post">
        <div className="beforeForm">
          
        </div>

        <div className="Forms">
          {/* lands form ----------------------------------------------------  */}

          {model === "lands" ? (
            <>
              <Form onSubmit={handleEdit}>
              

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
                  label="Add image"
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
                  label="Add image"
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
                  label="Add image"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>

                <Button variant="success" type="submit">
                  Submit
                </Button>
            
              </Form>
            </>
          ) : (
            <></>
          )}

          {/* villas form ------------------------------------------------- */}

          {model === "villas" ? (
            <>
              <Form onSubmit={handleEdit}>
                
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
                  label="Add image"
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
                  label="Add image"
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
                  label="Add image"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          ) : (
            <></>
          )}

          {/* houses form ------------------------------------------------------ */}

          {model === "houses" ? (
            <>
              <Form onSubmit={handleEdit}>
               

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
                  label="Add image"
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
                  label="Add image"
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
                  label="Add image"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          ) : (
            <></>
          )}

          {/*apartments form ------------------------------------------------------ */}

          {model === "apartments" ? (
            <>
              <Form onSubmit={handleEdit}>
                {/*  */}

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
                  label="Add image"
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
                  label="Add image"
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
                  label="Add image"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          ) : (
            <> </>
          )}

          {/*warehouses form</div> -----------------------------------------------------------*/}
          {model === "warehouses" ? (
            <>
              <Form onSubmit={handleEdit}>
               

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

                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>

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
                  label="Add image"
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
                  label="Add image"
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
                  label="Add image"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          ) : (
            <></>
          )}

          {/* chalets form -----------------------------------------------------------------*/}
          {model === "chalets" ? (
            <>
              <Form onSubmit={handleEdit}>
                 

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

                  <Form.Select
                    aria-label="Floating label select example"
                    name="Owner"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Broker">Broker</option>
                  </Form.Select>
                {/* </FloatingLabel> */}

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
                  label="Add image"
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
                  label="Add image"
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
                  label="Add image"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="https://...... "
                    name="url3"
                  />
                </FloatingLabel>

                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
: <></>}

{res.length > 0 ?
<Switch>
  <Redirect from="/dashboard" to={`/postdetails/${PostModel}/${PostId}`} ></Redirect>
  </Switch>

 : <></>}
    </>

  )
}

export default PostsCards

