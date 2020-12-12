import {USER_LOGIN_REQ,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,USER_REGISTER_REQ,USER_REGISTER_FAIL,USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_REQ, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_LIST_FAIL, USER_LIST_REQ, USER_LIST_SUCCESS, USER_LIST_RESET, USER_DELETE_FAIL, USER_DELETE_SUCCESS, ADMIN_USER_UPDATE_PROFILE_FAIL, ADMIN_USER_UPDATE_PROFILE_REQ, ADMIN_USER_UPDATE_PROFILE_SUCCESS, ADMIN_USER_UPDATE_PROFILE_RESET}from '../constants/userConstants'

import {USER_DETAILS_SUCCESS,USER_DETAILS_FAIL,USER_DETAILS_REQ} from '../constants/userConstants'
export const userLoginReducer=(state={},action)=>{


    console.log("login reduvcer");

    switch(action.type){
        case USER_LOGIN_REQ:
            return {Loading:true}
        case USER_LOGIN_SUCCESS:
            return {Loading:false,userInfo:action.payload}
        case USER_LOGIN_FAIL:
            return {Loading:false,error:action.payload}
        case "UPDATE_USER_NAME":
            const newState={ ...state} 
            console.log('this is new state',newState)
            var userInfo=newState.userInfo
            userInfo.name=action.payload
            return {Loading:false,userInfo}
            
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer=(state={},action)=>{


    console.log("register reduvcer");

    switch(action.type){
        case USER_REGISTER_REQ:
            return {Loading:true}
        case USER_REGISTER_SUCCESS:
            return {Loading:false,userInfo:action.payload}
        case USER_REGISTER_FAIL:
            return {Loading:false,error:action.payload}
            case USER_LOGOUT:
                return {}
        default:
            return state
    }
}


export const userDeatailsReducer=(state={user:{}},action)=>{


    console.log("register reduvcer");

    switch(action.type){
        case USER_DETAILS_REQ:
            return {...state,Loading:true}
        case USER_DETAILS_SUCCESS:
            return {Loading:false,user:action.payload}
        case USER_DETAILS_FAIL:
            return {Loading:false,error:action.payload}
            case "USER_DETAILS_CLEAR":
                return {user:{}}
        default:
            return state
    }
}




export const userUpdateProfileReducer=(state={},action)=>{


    console.log("register reduvcer");

    switch(action.type){
        case USER_UPDATE_PROFILE_REQ:
            return {Loading:true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return {Loading:false,success:true,userInfo:action.payload}
        case USER_UPDATE_PROFILE_FAIL: 
            return {Loading:false,error:action.payload}
        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}





export const getUserListReducer=(state={users:[]},action)=>{


    console.log("user list reduvcer");

    switch(action.type){
        case USER_LIST_REQ:
            return {Loading:true}
        case USER_LIST_SUCCESS:
            return {Loading:false,success:true,users:action.payload}
        case USER_LIST_FAIL: 
            return {Loading:false,error:action.payload}
        case USER_LIST_RESET:
            return {users:[]}
       

        default:
            return state
    }
}



export const userDeleteReducer=(state={},action)=>{


    console.log("user delete reduvcer");

    switch(action.type){
        case USER_DETAILS_REQ:
            return {Loading:true}
        case USER_DELETE_SUCCESS:
            return {Loading:false,success:true}
        case USER_DELETE_FAIL: 
            return {Loading:false,error:action.payload}
       

        default:
            return state
    }
}





export const userUpdateReducer=(state={user:{}},action)=>{


    console.log("user update by admin reduvcer");

    switch(action.type){
        case ADMIN_USER_UPDATE_PROFILE_REQ:
            return {Loading:true}
        case ADMIN_USER_UPDATE_PROFILE_SUCCESS:
            return {Loading:false,success:true}
        case ADMIN_USER_UPDATE_PROFILE_FAIL: 
            return {Loading:false,error:action.payload}
       
        case ADMIN_USER_UPDATE_PROFILE_RESET:
            return {user:{}}
        default:
            return state
    }
}