import { CART_ADD_ITEM,CART_ITEMS_CLEAR,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, GET_CART_ITEMS_DB_REQ, GET_CART_ITEMS_DB_SUCCESS, ORDER_CREATE_REQ, SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants'


export const cartReducer=(state={cartItems:[],shippingAddress:{}},action)=>{
    console.log("In cart reducee");
    switch(action.type){

        case GET_CART_ITEMS_DB_REQ:
            return {...state,Loading:true}

        case GET_CART_ITEMS_DB_SUCCESS:
            console.log(action.payload)
            return {  ...state,cartItems:action.payload,Loading:false}

       
        case CART_ADD_ITEM:
            console.log("IN ADD TO CART CASE");
            console.log(action.payload);
            const item=action.payload
            console.log(state.cartItems);
            const existItem=state.cartItems.find(x=>x.product===item.product)
            if (existItem){
return {
    ...state,
    cartItems:state.cartItems.map((x)=>
    x.product===existItem.product?item:x),
}
            }else{
                // push to array/

                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }

            }
            case CART_REMOVE_ITEM:
                console.log("cart remove reducer");
                console.log(action.id)
                return {
                    ...state,
                    cartItems:state.cartItems.filter(x=>x.product!==action.id)
                }
            case SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress:action.payload
                }
            case CART_SAVE_PAYMENT_METHOD:
                return{
                    ...state,paymentMethod:action.payload
                }
            case CART_ITEMS_CLEAR:
                return {cartItems:[]}

           
        default:
                return state
    }
} 

