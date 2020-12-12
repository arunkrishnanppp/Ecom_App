import mongoose from 'mongoose'




const reviewScheme=mongoose.Schema({
    name:{type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true})

// first create the scehema for collection/
const productSchema=mongoose.Schema({
    // we need user field here because we want to know which user admin create the product/
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:true,
        

    },
    brand:{
        type:String,
        required:true

    },
    category:{
        type:String,
        required:true,
        

    },
    description:{
        type:String,
        required:true,
        

    },
    rating:{
        type:Number,
        required:true,
        

    },
    reviews:[reviewScheme]
    ,
    numReviews:{
        type:Number,
        required:true,
        default:0
        

    },
    price:{
        type:Number,
        required:true,
        default:0
        

    },
    countInStock:{
        type:Number,
        required:true,
        default:0
        

    }

},{timestamps:true})


// use the scehem to create model/

const Product=mongoose.model('Product',productSchema)

export default Product