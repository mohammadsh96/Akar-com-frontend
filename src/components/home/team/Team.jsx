import React from "react"
import Heading from "../../common/Heading"
import { team } from "../../data/Data"
import "./team.css"
import "../../UserList/UserList.css"

const Team = () => {
  return (
    <>
      <section className='team background'>
        <div className='container'>
          <Heading title='GitTop Team' subtitle='Administrators of AkarCom' />

          <div className='content mtop grid3'>
            {team.map((val, index) => (
            <div className="shadowUserList">
              <div className='box' key={index}>
                <div className='details'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa-solid fa-circle-check'></i>
                  </div>
                  <i className='fa fa-location-dot'></i>
                  <label>{val.address}</label>
                  <h4>{val.name}</h4>

                  <ul>
                    {val.icon.map((icon, index) => (
                      <li key={index}>{icon}</li>
                    ))}
                  </ul>
                  <br></br>
                  <br></br>
                  <a href="/contact"><button className='btn3'>
                      <i className='fa fa-envelope'></i>
                      Message
                    </button></a>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Team
