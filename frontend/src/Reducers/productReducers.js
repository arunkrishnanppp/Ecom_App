import {PRODUCT_LIST_REQ,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL, ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_REQ, ADMIN_PRODUCT_DELETE_SUCCESS, ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_CREATE_REQ, ADMIN_PRODUCT_CREATE_SUCCESS, ADMIN_PRODUCT_CREATE_FAIL, ADMIN_PRODUCT_CREATE_RESET, ADMIN_PRODUCT_UPDATE_REQ, ADMIN_PRODUCT_UPDATE_SUCCESS, ADMIN_PRODUCT_UPDATE_FAIL, ADMIN_PRODUCT_UPDATE_RESET, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQ, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_TOP_REQ, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL} from '../constants/productConstants'
import {PRODUCT_SUCCESS,PRODUCT_REQ,PRODUCT_FAIL} from '../constants/productConstants'
export const productListReducers= (state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQ:
            return {Loading:true,products:[]}
        
        case PRODUCT_LIST_FAIL:
            return {Loading:false,error:action.payload}
            break;
        case PRODUCT_LIST_SUCCESS:
            return {Loading:false,products:action.payload.products,pages:action.payload.pages,page:action.payload.page}
        default:
            return state


    }

}

export const TopproductListReducers= (state={products:[]},action)=>{
    switch(action.type){
        case PRODUCT_TOP_REQ:
            return {Loading:true,products:[]}
        
        case PRODUCT_TOP_FAIL:
            return {Loading:false,error:action.payload}
            break;
        case PRODUCT_TOP_SUCCESS:
            return {Loading:false,products:action.payload,pages:action.payload.pages,page:action.payload.page}
        default:
            return state


    }

}

// in order to use this reducer add this reducer to store/


export const productDetailsReducers=(state={product:{reiews:[]}},action)=>{

    switch(action.type){
        case PRODUCT_REQ:
            console.log("IN REQ");
            return {Loading:true,...state}
        case PRODUCT_SUCCESS:
            return {Loading:false,product:action.payload}
        case PRODUCT_FAIL:
            return {Loading:false,product:action.payload}
        case "CLEAR":
            return {product:[]}
        case "ADMIN_PRODUCT_DEATIL_RESET":
                return {product:[]}
        default:
            return state
    }

}


export const productDeleteReducer=(state={},action)=>{
    switch(action.type){
        case ADMIN_PRODUCT_DELETE_REQ:
            console.log("IN REQ");
            return {Loading:true}
        case ADMIN_PRODUCT_DELETE_SUCCESS:
            return {Loading:false,success:true}
        case ADMIN_PRODUCT_DELETE_FAIL:
            return {Loading:false,error:action.payload}
        case ADMIN_PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }

}

export const productCreateReducer=(state={},action)=>{

    switch(action.type){
        case ADMIN_PRODUCT_CREATE_REQ:
            console.log("IN REQ");
            return {Loading:true}
        case ADMIN_PRODUCT_CREATE_SUCCESS:
            return {Loading:false,success:true,product:action.payload}
        case ADMIN_PRODUCT_CREATE_FAIL:
            return {Loading:false,error:action.payload}
        case ADMIN_PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }

}



export const productUpdateReducer=(state={},action)=>{
    switch(action.type){
        case ADMIN_PRODUCT_UPDATE_REQ:
            console.log("IN REQ");
            return {Loading:true}
        case ADMIN_PRODUCT_UPDATE_SUCCESS:
            return {Loading:false,success:true,product:action.payload}
        case ADMIN_PRODUCT_UPDATE_FAIL:
            return {Loading:false,error:action.payload}
        case ADMIN_PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }

}
























export const productReviewCreatreReducer=(state={},action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQ:
            console.log("IN REQ");
            return {Loading:true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {Loading:false,success:true}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {Loading:false,error:action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }

}



