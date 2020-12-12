// const express=require('express')
// normal js  we aew chnagning ti ejs
import morgan from 'morgan'
import path from 'path'
import express from 'express'
// const products=require('./data/products')
// import products from './data/products.js'


const app=express()
app.use(morgan('dev'))
// if(process.env.NODE_ENV==='development'){
    
//     console.log('morgan')
//     app.use(morgan('tiny'))
// }
//allow us to use json data in body pof a request
app.use(express.json()) 


// const dotenv=require('dotenv')
import dotenv from 'dotenv'
//adding the dotenv
dotenv.config()

import ConnectDB from './config/db.js'

ConnectDB()
import colors from 'colors'

//middleware importing
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoutes.js'
import orderRoute from './routes/orderRoute.js'
import cartRoute from './routes/cartRoute.js'
import uplpadRoute from './routes/uploadRoute.js'
// // common middle ware/
// app.use((req,res,next)=>{
//     console.log(req.originalUrl);
//     next()
// })


app.use('/api/products',productRoute)

app.use('/api/users',userRoute)
app.use('/api/cart',cartRoute)

app.use('/api/orders',orderRoute)
app.get('/api/config/paypal',(req,res)=>{
    console.log("in paypal");
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/api/upload',uplpadRoute)
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
// app.get('/api/products',(req,res)=>{
//     console.log("IN APi");
//     res.json(products)
// })
// app.get('/api/products/:id',(req,res)=>{
//     console.log(req.params)
//     const prod=products.find(p=>p._id===req.params.id)
//     res.json(prod)
// })






if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'frontend/build/index.html')))
}else{

    app.get('/',(req,res)=>{
        console.log('test API')
        res.send('API IS RUNNING..')
    })
}

//error middle ware
app.use(notFound)
app.use(errorHandler)


const PORT=process.env.PORT ||5000
app.listen(PORT,console.log(`Server running  on ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold))
