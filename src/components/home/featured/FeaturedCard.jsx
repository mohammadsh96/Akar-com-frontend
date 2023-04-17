import React, { useContext } from "react"
import { featured } from "../../data/Data"
import "./FeaturedCard.css"
// import { postContext } from "../../context/postContext";

const FeaturedCard = (props) => {
  // const model = useContext(postContext);

  // const handleName = (name) => {
  //   model.setModel(name)
  // }

  return (
    <>
      <div className='modelIcon' >
        {featured.map((items, index) => (
          <div className='box' key={index} >
            <img src={items.cover} alt='' />
            <h4 >{items.name}</h4>
            <label>{items.total}</label>
          </div>

        ))}
      </div>
    </>
  )
}

export default FeaturedCard
