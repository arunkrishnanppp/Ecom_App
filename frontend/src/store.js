import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productCreateReducer, productDeleteReducer, productListReducers, productReviewCreatreReducer, productUpdateReducer, TopproductListReducers} from './Reducers/productReducers'
import {productDetailsReducers} from './Reducers/productReducers'
import {cartReducer} from './Reducers/cartReducer'
import {userLoginReducer,userRegisterReducer,userDeatailsReducer,userUpdateProfileReducer, getUserListReducer,userDeleteReducer, userUpdateReducer} from './Reducers/userReducer'
import {orderCreateReducer,getOrderReducer, orderPayReducer, myorderListReducer, orderListReducer, orderDeliveryReducer} from './Reducers/orderReducer'
const reducer=combineReducers({ProductList:productListReducers,ProductDetail:productDetailsReducers,
    Cart:cartReducer,UserLogin:userLoginReducer,UserRegister:userRegisterReducer,
UserDetails:userDeatailsReducer,UserUpdateProfile:userUpdateProfileReducer,
Order:orderCreateReducer,
GetOrder:getOrderReducer,
OrderPay:orderPayReducer,
MyOrderList:myorderListReducer,
UserList:getUserListReducer
,UserDelete:userDeleteReducer,
UserUpdate:userUpdateReducer,
ProductDelete:productDeleteReducer,
ProductCreate:productCreateReducer,
ProductUpdate:productUpdateReducer,
OrderList:orderListReducer,
OrderDelivery:orderDeliveryReducer,
PrductRevirewCreate:productReviewCreatreReducer
,
TopProducts:TopproductListReducers})

// taking data from local storage of cart action/
const cartItemsFromLocalStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
console.log(cartItemsFromLocalStorage);

console.log("BEFOR READING FROM LOCAL");
const shippingAddressFromLocalStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):[]
console.log(shippingAddressFromLocalStorage);
console.log("BEFOR READING FROM LOCAL");
const userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const initialState={
    Cart:{cartItems:cartItemsFromLocalStorage,shippingAddress:shippingAddressFromLocalStorage,},
    UserLogin:{userInfo:userInfoFromLocalStorage},
   
}
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store