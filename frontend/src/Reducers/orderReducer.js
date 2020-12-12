import {ORDER_CREATE_REQ,ORDER_CREATE_FAIL,ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQ, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQ, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, MY_ORDER_LIST_REQ, MY_ORDER_LIST_FAIL,MY_ORDER_LIST_SUCCESS, ADMIN_ORDER_LIST_REQ, ADMIN_ORDER_LIST_FAIL, ADMIN_ORDER_LIST_SUCCESS, ADMIN_ORDER_DEL_REQ, ADMIN_ORDER_DEL_SUCCESS, ADMIN_ORDER_DEL_FAIL, ADMIN_ORDER_DEL_RESET} from '../constants/orderConstants'


export const orderCreateReducer=(state={},action)=>{
    switch(action.type){
        case ORDER_CREATE_REQ:
            return {Loading:true}
        case ORDER_CREATE_FAIL:
            return {Loading:false,error:action.payload}
        case ORDER_CREATE_SUCCESS:
            return {Loading:false,order:action.payload,success:true}
            case "ORDER_CREATE_RESET":
                return {}
        default:
            return state
    }
    console.log("Order Reducer");
}



export const getOrderReducer=(state={Loading:true,orderItems:[],shippingAddress:[]},action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQ:
            return {...state,Loading:true}
        case ORDER_DETAILS_FAIL:
            return {Loading:false,error:action.payload}
        case ORDER_DETAILS_SUCCESS:
            return {Loading:false,order:action.payload}
            case "ORDER_DETAILS_RESET":
                return {Loading:true,orderItems:[],shippingAddress:[]}
        default:
            return state
    }
    console.log("Order detail");
}


export const orderPayReducer=(state={},action)=>{
    switch(action.type){
        case ORDER_PAY_REQ:
            return {Loading:true}
        case ORDER_PAY_FAIL:
            return {Loading:false,error:action.payload}
        case ORDER_PAY_SUCCESS:
            return {Loading:false,success:true}
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
    console.log("Order detail");
}


export const orderDeliveryReducer=(state={},action)=>{
    switch(action.type){
        case ADMIN_ORDER_DEL_REQ:
            return {Loading:true}
        case ADMIN_ORDER_DEL_FAIL:
            return {Loading:false,error:action.payload}
        case ADMIN_ORDER_DEL_SUCCESS:
            return {Loading:false,success:true}
        case ADMIN_ORDER_DEL_RESET:
            return {}
        default:
            return state
    }
    console.log("Order detail");
}




export const myorderListReducer=(state={orders:[]},action)=>{
    switch(action.type){
        case MY_ORDER_LIST_REQ:
            return {Loading:true}
        case MY_ORDER_LIST_FAIL:
            return {Loading:false,error:action.payload}
        case MY_ORDER_LIST_SUCCESS:

            return {Loading:false,orders:action.payload}
        
        default:
            return state
    }
    console.log("Order detail");
}



export const orderListReducer=(state={orders:[]},action)=>{
    switch(action.type){
        case ADMIN_ORDER_LIST_REQ:
            return {Loading:true}
        case ADMIN_ORDER_LIST_FAIL:
            return {Loading:false,error:action.payload}
        case ADMIN_ORDER_LIST_SUCCESS:

            return {Loading:false,orders:action.payload}
        
        default:
            return state
    }
    console.log("Order detail");
}