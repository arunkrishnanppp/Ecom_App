import {PRODUCT_LIST_REQ,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_DELETE_REQ, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_CREATE_REQ, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_UPDATE_REQ, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_REQ, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_TOP_REQ, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL} from '../constants/productConstants'
import {PRODUCT_SUCCESS,PRODUCT_REQ,PRODUCT_FAIL} from '../constants/productConstants'
import axios from 'axios'

export const ListProduct=(keyword='',pageNumber='')=>async(dispatch)=>{


    try {
        dispatch({type:PRODUCT_LIST_REQ})

        const {data}=await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
       
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    }
    

}


export const TopProducts=()=>async(dispatch)=>{


    try {
        dispatch({type:PRODUCT_TOP_REQ})

        const {data}=await axios.get(`/api/products/topproducts`)
       console.log(data)
        dispatch({type:PRODUCT_TOP_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:PRODUCT_TOP_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    }
    

}


export const DeleteProductById=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_DELETE_REQ})
        const {UserLogin:{userInfo}}=getState()
        const {data}=axios.request({
            method: 'DELETE',
            url: `/api/products/${id}`,
            headers: {
              'Authorization': `Bearer ${userInfo.token}`,
            }
          
          })
          dispatch({type:ADMIN_PRODUCT_DELETE_SUCCESS})
          

    }catch(error){
        dispatch({type:ADMIN_PRODUCT_DELETE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    }
}


// we ca user the action creater in the componet itead of the api cll from componet/


export const DetailProduct=(id)=>async(dispatch)=>{ 

    
    try {
    
        const x=dispatch({type:PRODUCT_REQ})
    
    
        const {data}=await axios.get(`/api/products/${id}`)
        dispatch({type:PRODUCT_SUCCESS,payload:data})
        
    } catch (error) {
        dispatch({type:PRODUCT_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    }
    

}

export const clearData = () => async(dispatch)=>{
    dispatch({type:"CLEAR"})
  }





  
export const CreateProduct=(product)=>async(dispatch,getState)=>{
    dispatch({type:ADMIN_PRODUCT_CREATE_REQ})
    const {UserLogin:{userInfo}}=getState()
    try{
       
       
        const {data}=await axios.request({
            method: 'POST',
            url: `/api/products`,
            headers: {
                "content-type":"application/json",
              'Authorization': `Bearer ${userInfo.token}`,
            },
            data:product
          
          })
         
          console.log(data)
         if(data._id){
            dispatch({type:ADMIN_PRODUCT_CREATE_SUCCESS})
         }else{
             throw data
         }
         

    }catch(error){
        console.log('in catch')
        dispatch({type:ADMIN_PRODUCT_CREATE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    }
}



export const UpdateProduct=(id,product)=>async(dispatch,getState)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_UPDATE_REQ})
        const {UserLogin:{userInfo}}=getState()
        const data=axios.request({
            method: 'PUT',
            url: `/api/products/${id}`,
            headers: {
                "content-type":"application/json",
              'Authorization': `Bearer ${userInfo.token}`,
            },
            data:product
            
          })
          console.log("PUT SUCCESS")
          console.log(data)
        if(data){
          dispatch({type:ADMIN_PRODUCT_UPDATE_SUCCESS})}

    }catch(error){
        dispatch({type:ADMIN_PRODUCT_UPDATE_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    }
}









export const CreateProductReview=(id,review)=>async(dispatch,getState)=>{
    try{
        dispatch({type:PRODUCT_CREATE_REVIEW_REQ})
        const {UserLogin:{userInfo}}=getState()
        const {data}=await axios.request({
            method: 'POST',
            url: `/api/products/${id}/review`,
            headers: {
                "content-type":"application/json",
              'Authorization': `Bearer ${userInfo.token}`,
            },
            data:review
            
          })
          console.log("PUT SUCCESS")
          console.log(data)
        if(data){
          dispatch({type:PRODUCT_CREATE_REVIEW_SUCCESS})}

    }catch(error){
        dispatch({type:PRODUCT_CREATE_REVIEW_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})        
    }
}
