import mongoose from 'mongoose' 
const cartSchema=mongoose.Schema({
    // we need user field here because we want to know which user admin create the product/
    userId:{
        type:String,
        required:true,
        
    },
    product:{
        type:String,
        required:true

    },name:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:true,
        

    },price:{
        type:Number,
        required:true,
        default:0
        

    },
    countInStock:{
        type:Number,
        required:true,
        default:0
        

    },
    qty:{
        type:Number,
        required:true,
        default:0
    }
    
},{timestamps:true})


// use the scehem to create model/

const Cart=mongoose.model('Cart',cartSchema)

export default Cart