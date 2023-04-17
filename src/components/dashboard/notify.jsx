// import React from 'react';
// import { axios } from 'axios';
// import { baseURL } from '../../utilize/constants';


// export default function Notify(){


// //to make an order step-1 from client
//     const MakeOrder= async()=>{

// let order =await axios.post(`${baseURL}/${model}/${postId}/neworder` , {
//     headers: {
//       Authorization: `Bearer ${user.token}`,
//     },
//   } )
//  console.log(order);
//     }



// // get all orders  step-1 from admin 
// const fetchOrders =async ()=>{
//  let orders = await axios.get(`${baseURL}/allorders` , {
//     headers: {
//       Authorization: `Bearer ${user.token}`,
//     },
//   })

//   console.log(orders);
// }


// // accept order step 2-a from admin  >> or step2-b to reject order
// const acceptOrder =async ()=>{
//     let accept = await axios.post(`${baseURL}/allorders/${postId}/${orderId}/accept` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
   
//      console.log(accept);
    
//    }
   


//    // reject order step 2-b from admin 
//    const rejectOrder =async ()=>{
//     let reject = await axios.post(`${baseURL}/allorders/${postId}/${orderId}/reject` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
   
    
//      console.log(reject);
//    }
   
// // from client to check his already made  orders
//    const CheckMyOrder =async ()=>{
//     let myOrders = await axios.get(`${baseURL}/myorders/${userID}` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(myOrders);
   
// }

// // client click on  an orders and check the status if accepted or rejected 
// const OrderStatus =async ()=>{
//     let orderStatus = await axios.get(`${baseURL}/myorders/${userID}/${orderId}/status` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(orderStatus);
   
// }

// // if admin accept in step 2-a Owner will recive a message 
// //Owner will accept or reject the message content  step 1-a from OWner accept

// const ownerAction  =async ()=>{
//     let Message = await axios.get(`${baseURL}/check/${userId}/action` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(Message);
   
// }
// const ownerAccept  =async ()=>{
//     let acceptMessage = await axios.get(`${baseURL}/check/${userId}/accept` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(acceptMessage);
   
// }
// //Owner will reject  the message content  step 1-b 
// const ownerReject =async ()=>{
//     let rejectMessage = await axios.get(`${baseURL}/check/${userId}/reject` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(rejectMessage);
   
// }

// //if Owner reject the message  >> admin will check the status from owner (accepted or rejected )
// const adminAcceptOwner =async ()=>{
//     let meetAccepted = await axios.get(`${baseURL}/checkmeet/owner/accepted` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(meetAccepted);
   
// }

// // when owner reject admin will check on this  
// const adminRejectOwner =async ()=>{
//     let meetRejected = await axios.get(`${baseURL}/checkmeet/owner/rejected` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(meetRejected);
   
// }


// // client to check the status for meeting if accepted from owner and admin 
// //client accepted 
// const clientMeetAction =async ()=>{
//     let meetAction = await axios.get(`${baseURL}/myorders/${userId}/${orderId}/status/date/action` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(meetAction);
   
// }

// const clientMeetAccept =async ()=>{
//     let meetAccept = await axios.get(`${baseURL}/myorders/${userId}/${orderId}/status/date/accept` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(meetAccept);
   
// }

// //client rejected 
// const clientMeetReject =async ()=>{
//     let meetReject = await axios.get(`${baseURL}/myorders/${userId}/${orderId}/status/date/reject` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(meetReject);
   
// }

// //if client reject the meet  >> admin will check the status from client (accepted or rejected )
// const adminAcceptClient =async ()=>{
//     let meetAccepted = await axios.get(`${baseURL}/checkmeet/client/accepted` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(meetAccepted);
   
// }

// // when client reject admin will check on this  
// const adminRejectClient =async ()=>{
//     let meetRejected = await axios.get(`${baseURL}/checkmeet/client/rejected` , {
//        headers: {
//          Authorization: `Bearer ${user.token}`,
//        },
//      })
//      console.log(meetRejected);
   
// }


// // if client rejected  >> schedule new meeting (loop ) do the checks 

// //if client accepted >>  message=`Meeting has been scheduled with client and owner





// }