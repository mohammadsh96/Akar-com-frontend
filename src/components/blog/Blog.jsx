import React,{useEffect} from "react"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import Heading from "../common/Heading"
import "../home/recent/recent.css"
import img from "../images/about.jpg"

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Services' title='Services - All Services' cover={img} />
        <div className='container recent' >
          <br/>
          <br/>
          <br/>
        <Heading title='Properties that might interest you.' subtitle='Categories' />
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Blog
