import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'

import User from './model/userModel.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
import ConnectDB from './config/db.js'

dotenv.config()
ConnectDB()

const importDate=async()=>{
    console.log("IN Import")
    try {
    //    await Order.deleteMany()
    //    await Product.deleteMany()
       await User.deleteMany()
    //    console.log(users)

       const savedUsers=await User.insertMany(users)

       const adminUser=savedUsers[0]._id

       const sampledProducts=products.map(p=>{
           return {...p,user:adminUser}
       })

       await Product.insertMany(sampledProducts)
       console.log("data Imported".green)
       

       

    } catch (error) {
        console.log(`${error}`.red )
        
    }
}



const destroyData=async()=>{
    try {
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()

       console.log("data Destroyed".red )
       

    } catch (error) {
        console.log(`${error}`.red )
        
    }
}


if(process.argv[2] =='-d'){
    destroyData()
}else{
    importDate()
}
    