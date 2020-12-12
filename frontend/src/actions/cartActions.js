import axios from 'axios'
import { CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, GET_CART_ITEMS_DB_REQ, GET_CART_ITEMS_DB_SUCCESS, ORDER_CREATE_REQ, SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants'



export const  getAllfromCartDB=()=>async(dispatch,getState)=>{

    
    const {UserLogin:{userInfo}}=getState()
    if(userInfo){
        dispatch({type:GET_CART_ITEMS_DB_REQ})
    
    
        
        const {data:cartItems} =await axios.get('/api/cart',{
            headers: {
                'Authorization':`Bearer ${userInfo.token}`,
                'content-type': 'application/json',
            }
          })
    
          dispatch({type:GET_CART_ITEMS_DB_SUCCESS,payload:cartItems})
        localStorage.setItem('cartItems',JSON.stringify(getState().Cart.cartItems))
    }

   

   




   
}

export const addToCart=(id,qty)=>async(dispatch,getState)=>{
    
    
    const {data}=await axios.get(`/api/products/${id}`)
    
    
    const {UserLogin:{userInfo}}=getState()
    if(userInfo){
        
    }

    dispatch(
        {
            type:CART_ADD_ITEM,
            payload:{
                product:data._id,
                image:data.image,
                name:data.name,
                price:data.price,
                countInStock:data.countInStock,
                qty:qty
            }
        }
    )
    const cartItem={
        product:data._id,
                image:data.image,
                name:data.name,
                price:data.price,
                countInStock:data.countInStock,
                qty:qty
    }
    //here we need to call api to add cart items to cart Data
if(userInfo){
    const {output} =await axios.put('/api/cart',cartItem,{
        headers: {
            'Authorization':`Bearer ${userInfo.token}`,
            'content-type': 'application/json',
        }
      })
    }
    localStorage.setItem('cartItems',JSON.stringify(getState().Cart.cartItems))
}

export const revomeFromCart=(id)=>async(dispatch,getState)=>{
    
    dispatch(
        {
            type:CART_REMOVE_ITEM,
            id:id
        }
    )
    localStorage.setItem('cartItems',JSON.stringify(getState().Cart.cartItems))
}

export const saveShippingAddress=(data)=>async(dispatch,getState)=>{
    
    
    dispatch(
        {
            type:SAVE_SHIPPING_ADDRESS,
            payload:data
        }
    )
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}


export const savePaymentMethod=(data)=>async(dispatch,)=>{
    
    dispatch(
        {
            type:CART_SAVE_PAYMENT_METHOD,
            payload:data
        }
    )
    localStorage.setItem('paymentMethod',JSON.stringify(data))
}




