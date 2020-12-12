import axios from 'axios'
import {ORDER_CREATE_REQ,ORDER_CREATE_FAIL,ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQ, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQ, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, MY_ORDER_LIST_FAIL, MY_ORDER_LIST_REQ, MY_ORDER_LIST_SUCCESS, ADMIN_ORDER_LIST_REQ, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_LIST_FAIL, ADMIN_ORDER_DEL_REQ, ADMIN_ORDER_DEL_SUCCESS, ADMIN_ORDER_DEL_FAIL} from '../constants/orderConstants'
export const PlaceOrder=(order)=>async(dispatch,getState)=>{
    console.log("In place oprder action");
console.log(order);



const {UserLogin:{userInfo}}=getState()
// console.log(userInfo.token);
const Auth=`Bearer ${userInfo.token}`
console.log(Auth);
    const config={
        headers:{

            
            Authorization:`Bearer ${userInfo.token}`,
            'Content-Type':'appliction/json',
        }
    }
    // console.log(name,email,password);
try {
    
   
    

    console.log("BEFOR CALLING API/ORDERS");
    // const {data}=axios({
    //     method:'post',
    //     url:`/api/orders/`,
    //     config,
    //     data:{
    //         firstname:'arun'
    //     },
        



    // })

    const {data}=await axios.post('/api/orders/',order,{
        headers: {
            'Authorization':`Bearer ${userInfo.token}`,
            'content-type': 'application/json',
        }
      })
    console.log('after post');

  dispatch({type:ORDER_CREATE_SUCCESS,payload:data})
}
catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:ORDER_CREATE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}


export const getOrderDetails=(id)=>async(dispatch,getState)=>{

console.log(id);

    console.log("IN order detal action")
    const {UserLogin:{userInfo}}=getState()
    if(!userInfo){
       return null
    }
    // console.log(userInfo.token);
    
   
        const config={
            headers:{
    
                
                'Authorization':`Bearer ${userInfo.token}`,


               
            }
        }

    dispatch({
        type:ORDER_DETAILS_REQ,Loading:true

    })

    try{

    const res=await axios.get(`/api/orders/${id}`,config)
const order=res.data
    console.log(order)

    dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:order,
        Loading:false
    })

    }
    catch(error){
        dispatch({type:ORDER_DETAILS_FAIL
            ,payload:error.response&&error.response.data.message?error.response.data.message:error.message})

    
    

    }

}





export const PayOrder=(id,paymentResult)=>async(dispatch,getState)=>{
    console.log("In Pay oprder action");
console.log(paymentResult);



const {UserLogin:{userInfo}}=getState()
// console.log(userInfo.token);
const Auth=`Bearer ${userInfo.token}`
console.log(Auth);
    const config={
        headers:{

            
            Authorization:`Bearer ${userInfo.token}`,
            'Content-Type':'appliction/json',
        }
    }
    // console.log(name,email,password);
try {
    
   
    
    dispatch({type:ORDER_PAY_REQ})
    console.log("BEFOR CALLING API/ORDERS");
    // const {data}=axios({
    //     method:'post',
    //     url:`/api/orders/`,
    //     config,
    //     data:{
    //         firstname:'arun'
    //     },
        



    // })

    const {data}=await axios.put(`/api/orders/${id}/pay`,paymentResult,{
        headers: {
            'Authorization':`Bearer ${userInfo.token}`,
            'content-type': 'application/json',
        }
      })
    console.log('after put');

  dispatch({type:ORDER_PAY_SUCCESS,payload:data})
}
catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:ORDER_PAY_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}










export const DeliverOrder=(id)=>async(dispatch,getState)=>{
    console.log("In deliver action");




const {UserLogin:{userInfo}}=getState()
// console.log(userInfo.token);
const Auth=`Bearer ${userInfo.token}`
console.log(Auth);
    const config={
        headers:{

            
            Authorization:`Bearer ${userInfo.token}`,
            'Content-Type':'appliction/json',
        }
    }
    // console.log(name,email,password);
try {
    
   
    
    dispatch({type:ADMIN_ORDER_DEL_REQ})
    console.log("BEFOR CALLING API/ORDERS");
    // const {data}=axios({
    //     method:'post',
    //     url:`/api/orders/`,
    //     config,
    //     data:{
    //         firstname:'arun'
    //     },
        



    // })

    const {data}=await axios.put(`/api/orders/${id}/delivered`,{
        headers: {
            'Authorization':`Bearer ${userInfo.token}`,
            'content-type': 'application/json',
        }
      })
    console.log('after put');

  dispatch({type:ADMIN_ORDER_DEL_SUCCESS,payload:data})
}
catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:ADMIN_ORDER_DEL_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}


export const GetMyOrders=()=>async(dispatch,getState)=>{
    console.log("In gety orders action");




const {UserLogin:{userInfo}}=getState()


  
try {

    console.log('In trrrrryy')
    
   
    
    dispatch({type:MY_ORDER_LIST_REQ})
    console.log("BEFOR CALLING API/ORDERS/myorders");

    const {data}=await axios.get(`/api/orders/myorders`,{
        headers: {
            'Authorization':`Bearer ${userInfo.token}`,
            'content-type': 'application/json',
        }
      })
    console.log('after get');
    console.log(data);

  dispatch({type:MY_ORDER_LIST_SUCCESS,payload:data})
}
catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:MY_ORDER_LIST_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}










export const GetOrders=()=>async(dispatch,getState)=>{
    console.log("In  orders action");




const {UserLogin:{userInfo}}=getState()


  
try {

    console.log('In trrrrryy')
    
   
    
    dispatch({type:ADMIN_ORDER_LIST_REQ})
    console.log("BEFOR CALLING API/ORDERS");

    const {data}=await axios.get(`/api/orders`,{
        headers: {
            'Authorization':`Bearer ${userInfo.token}`,
            'content-type': 'application/json',
        }
      })
    console.log('after get');
    console.log(data);

  dispatch({type:ADMIN_ORDER_LIST_SUCCESS,payload:data})
}
catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:ADMIN_ORDER_LIST_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}
