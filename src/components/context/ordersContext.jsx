 import React,{createContext ,useState ,useEffect ,useContext} from 'react'; 
 import axios from 'axios'
import {baseURL} from '../../utilize/constants'
 import { LoginContext } from "../context/context";
 import cookie from 'react-cookies'
 import Swal from "sweetalert2";


 export const  orderProvider =createContext()

 export default function OrdersContext(props){

    const [myOrders ,setOrders]=useState([])
    const [showButtons ,setShowButtons]=useState(true)
    const [orderId , setOrderId]=useState()
 const [message ,setMessage] =useState({})

    const auth =useContext(LoginContext)
const fetchMyOrders = async()=>{

let data = await axios.get(`${baseURL}/myorders/${auth.user.id}`,
{
    headers: {
      Authorization: `Bearer ${cookie.load('token')}`,
    },
  })
console.log(data.data)
setOrders(data.data)
}

const acceptMeet = async (id)=>{
  let data = await axios.get(`${baseURL}/myorders/${auth.user.id}/${id}/date/accept`,
  {
      headers: {
        Authorization: `Bearer ${cookie.load('token')}`,
      },
    })
  console.log(data)
  setShowButtons(false)
  setOrderId(id)
  setMessage({ id: id , message: "Admin : Thank you "})
  deleteStatus(id ,"")


  Swal.fire(
    "Thank You For Your Acceptance!",
    " To Join us on Zoom , Use Meeting password : AkarCom$1",
      "success"
  );

}
const rejectMeet = async (id)=>{
  let data = await axios.get(`${baseURL}/myorders/${auth.user.id}/${id}/date/reject`,
  {
      headers: {
        Authorization: `Bearer ${cookie.load('token')}`,
      },
    })
    console.log(data)
    Swal.fire(
      "Meeting has been Rejected ",
      "We Will Schedual A New Meeting Soon ",
      "success"
    );
  setShowButtons(false)
  setMessage({ id: id , message: "Admin : Thank you , We will contact you soon "})
  setOrderId(id)
  deleteStatus(id ,"")

}
const deleteStatus= async (id ,status)=>{

  let data = await axios.delete(`${baseURL}/myorders/${auth.user.id}/${id}`,
  {
      headers: {
        Authorization: `Bearer ${cookie.load('token')}`,
      },
    })
if(status==="cancel"){

  Swal.fire(
    "Sorry Again !",
    "Your order has been deleted ",
    "danger"
  );

}

    // const items = myOrders.filter((item) => item.id !== id);
    // setOrders(items);

}

const state ={

myOrders : myOrders , 
fetchMyOrders:fetchMyOrders,
deleteStatus:deleteStatus,
acceptMeet:acceptMeet,
rejectMeet:rejectMeet,
showButtons:showButtons,
orderId : orderId ,
message:message,
}



    return(<>
    <orderProvider.Provider value={state}>
        {props.children}
    </orderProvider.Provider>
    
    
    </>)
 }


