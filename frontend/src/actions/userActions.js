import {USER_LOGIN_REQ,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,USER_REGISTER_REQ,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_REQ, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_LIST_FAIL, USER_LIST_REQ, USER_LIST_SUCCESS, USER_LIST_RESET, USER_DELETE_REQ, USER_DELETE_SUCCESS, USER_DELETE_FAIL, ADMIN_USER_UPDATE_PROFILE_SUCCESS, ADMIN_USER_UPDATE_PROFILE_REQ, ADMIN_USER_UPDATE_PROFILE_FAIL}from '../constants/userConstants'
import axios from 'axios'

import {USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_DETAILS_REQ,USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'

import {CART_ITEMS_CLEAR} from '../constants/cartConstants'

export const userLogin=(email,password)=>async(dispatch)=>{
    console.log('IN USER LOGIN ACTIOn');
    dispatch({type:USER_LOGIN_REQ})


    const config={
        headers:{
            'Content-Type':'appliction/json'
        }
    }
    console.log(email,password);
try {
    
   
    // const {data}=await axios.post('/api/users/login',{email,password},config)

    const {data}=await axios.request({
        method: 'POST',
        url: '/api/users/login',
        config,
        data: {
          email,password
        },
      
      })
    console.log('after post');

    dispatch({type:USER_LOGIN_SUCCESS,payload:data})
    localStorage.setItem('userInfo',JSON.stringify(data))




    

} catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:USER_LOGIN_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}



//register

export const userRegister=(name,email,password)=>async(dispatch)=>{
    console.log('IN USER REGISTER ACTIOn');
    dispatch({type:USER_REGISTER_REQ})


    const config={
        headers:{
            'Content-Type':'appliction/json'
        }
    }
    console.log(name,email,password);
try {
    
   
    // const {data}=await axios.post('/api/users/login',{email,password},config)

    const {data}=await axios.request({
        method: 'POST',
        url: '/api/users/',
        config,
        data: {
          name,email,password
        },
      
      })
    console.log('after post');

    dispatch({type:USER_REGISTER_SUCCESS,payload:data})
    dispatch({type:USER_LOGIN_SUCCESS,payload:data})
    localStorage.setItem('userInfo',JSON.stringify(data))

} catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:USER_REGISTER_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}


export const clearData = () => async(dispatch)=>{
    dispatch({type:"CLEAR"})
  }









  export const getUserDetails=(id)=>async(dispatch,getState)=>{
    console.log('IN USER REGISTER ACTIOn');
    dispatch({type:USER_DETAILS_REQ})

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
    
   
    // const {data}=await axios.post('/api/users/login',{email,password},config)

    const {data}=await axios.get(`/api/users/${id}`,config)
    console.log('after post');

    dispatch({type:USER_DETAILS_SUCCESS,payload:data})
   

} catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:USER_DETAILS_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}



export const updateUserProfile=(user)=>async(dispatch,getState)=>{
    
    console.log('IN USER UPDATE ACTIOn');
    console.log(user);
    dispatch({type:USER_UPDATE_PROFILE_REQ})

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
    
   
    // const {data}=await axios.post('/api/users/login',{email,password},config)
    console.log(user);
    // const {data}=await axios.put('/api/users/profile',{ hello: 'world' },config)
    console.log(config);

    // const {data}=await axios.put('/api/users/profile',{"HELLO":"HII"},config)
    const {data}=await  axios.request({
  method: 'PUT',
  url: `/api/users/profile`,
  headers: {
    'Authorization': `Bearer ${userInfo.token}`,
  },
  params: user

})
    
    dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data})
   

} catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:USER_UPDATE_PROFILE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}



export const updateUserName=(username)=>async(dispatch,getState)=>{

    dispatch({type:"UPDATE_USER_NAME",payload:username})
    var userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
    userInfoFromLocalStorage.name=username
    localStorage.setItem('userInfo',JSON.stringify(userInfoFromLocalStorage))
    
    


}









export const logoutUser=()=>(dispatch)=>{
    console.log('IN ACTION LOG OUT');
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:"USER_DETAILS_CLEAR"})
    dispatch({type:USER_UPDATE_PROFILE_RESET})
    dispatch({type:USER_LIST_RESET})
    dispatch({type:CART_ITEMS_CLEAR})
    window.localStorage.clear(); 
   
}



export const listAllUsers=()=>async(dispatch,getState)=>{
    console.log("i get all users");

dispatch({type:USER_LIST_REQ})
try{
    const {UserLogin:{userInfo}}=getState()
    console.log(userInfo);
    const {data}=await axios.get('/api/users',{headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      }})
      dispatch({type:USER_LIST_SUCCESS,payload:data})
}
catch(error){
    dispatch({type:USER_LIST_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
}  

    
}




export const deleteUser=(id)=>async(dispatch,getState)=>{
    console.log("i delte user");

dispatch({type:USER_DELETE_REQ})
try{
    const {UserLogin:{userInfo}}=getState()
    console.log(userInfo);
    const {data}=await axios.delete(`/api/users/${id}`,{headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      }})
      dispatch({type:USER_DELETE_SUCCESS})
}
catch(error){
    dispatch({type:USER_DELETE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
}  

    
}





export const updateUserProfileAdmin=(userId,name,email,isAdmin)=>async(dispatch,getState)=>{
    
    console.log('IN USER UPDATE ACTIOn ADMIN');
    
    dispatch({type:ADMIN_USER_UPDATE_PROFILE_REQ})

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
    
   
   

    // const {data}=await axios.put('/api/users/profile',{"HELLO":"HII"},config)
    const {data}=await  axios.request({
  method: 'PUT',
  url: `/api/users/${userId}`,
  headers: {
    'Authorization': `Bearer ${userInfo.token}`,
  },
  data: {name,email,isAdmin}

})
    
    dispatch({type:ADMIN_USER_UPDATE_PROFILE_SUCCESS,payload:data})
   

} catch (error) {
    console.log("in errrr");
    console.log(error);
    dispatch({type:ADMIN_USER_UPDATE_PROFILE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    
    
}
}
