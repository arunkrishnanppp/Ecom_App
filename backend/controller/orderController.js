import Order from '../model/orderModel.js'
import AsyncHandler from 'express-async-handler'


//@desc Add  orders
//@route POST /api/orders/
//@access private
export const addOrderItems = AsyncHandler(async (req, res) => {
    console.log("IN ADD ORDER ITEMS");
    console.log(req.headers.authorization);
    // await User.insertMany
  console.log(
      req.body
  );
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxtPrice,shippingPrice,totalPrice}=req.body
try{


    if(orderItems&&orderItems.length==0){
        res.status(400)
        throw new Error("No item to order")
    }else{

        console.log("In elase");
        const  order=new Order(
            {   user:req.current_user,
                orderItems:orderItems,
                shippingItems:shippingAddress,
                paymentMethod,
                itemsPrice,
                taxtPrice,
                shippingPrice,
                totalPrice
            }
        )
        const createdOrder=await order.save()
        console.log("after create");
        res.status(201).json(
            createdOrder
        )
    }
}catch(err){
    res.status(400)
    throw err

}
    
  });


  
//@desc Get orders by id
//@route GET /api/orders/:id
//@access private
export const getOrderById = AsyncHandler(async (req, res) => {
    console.log("IN get order By id");
    console.log(req.params.id)
    try{
        const order= await Order.findById(req.params.id).populate('user','name email')
        console.log(order)
            if(order){
                console.log("in if")
                res.status(200).json(order)
            }else{
                res.status(404)
                throw new Error("order not found")
            }
    }catch{
        res.status(404)
                throw new Error("order not found")


    }
   

  });







  
  
//@desc Update Order to paid orders by id
//@route GET /api/orders/:id/pay
//@access private
export const updateOrderToPayed = AsyncHandler(async (req, res) => {
    console.log("IN update order to payed");
    console.log(req.params.id)
    console.log(req.body);
    try{
        console.log("in first try");
        const order= await Order.findById(req.params.id)
        // console.log(order)
            if(order){
                console.log("in if")

                order.isPaid=true,
                order.piadAt=Date.now()
                order.paymentResult={
                    id:req.body.id,
                    status:req.body.status,
                    update_time:req.body.update_time,
                    email_address:req.body.payer.email_address
                }
                

               try{
                   console.log('loggin order');
                   console.log(order);
                    console.log("in second try");
                    const updatedOrder=await order.save()
                    res.json(updatedOrder)
               }catch(err){
                console.log("in second catch");
                res.status(404)
                        throw new Error(err)
               }
              
                    
                
               
            }
    }catch(err){
        console.log("in first catch");
        res.status(404)
                throw new Error("Order Not found")


    }
   

  });




    
//@desc Update Order to delivred orders
//@route Put /api/orders/:id/delivered
//@access private admin
export const updateOrderToDelivered = AsyncHandler(async (req, res) => {
    console.log("In update order to delivered");
    console.log(req.params.id)
    console.log(req.body);
    try{
        console.log("first");
        const order= await Order.findById(req.params.id)
        // console.log(order)
            if(order){
                console.log("in if")

                order.isDelivered=true,
                order.deliveredAt=Date.now()

               try{
                   console.log('loggin order');
                   console.log(order);
                    console.log("in second try");
                    const updatedOrder=await order.save()
                    res.json(updatedOrder)
               }catch(err){
                console.log("in second catch");
                res.status(404)
                        throw new Error(err)
               }
              
                    
                
               
            }
    }catch(err){
        console.log("in first catch");
        res.status(404)
                throw new Error("Order Not found")


    }
   

  });












  
//@desc GET Order by user
//@route GET /api/orders/myorders
//@access private
export const getMyOrders = AsyncHandler(async (req, res) => {
    console.log(" Get my orders");
    
    console.log(req.current_user);
    try{
        console.log("in first try");
        const orders= await Order.find({user:req.current_user._id})
        // console.log(order)
        res.send(orders)
    }catch(err){
        res.status(404)
        throw new Error("No orders u")

    }
            
  });

  


  //@desc GET All Order 
//@route GET /api/orders/
//@access private-Admin
export const getAllOrders = AsyncHandler(async (req, res) => {
    console.log(" Get all orders");
    
    console.log(req.current_user);
    try{
        console.log("in first try");
        const orders= await Order.find({}).populate('user','name email')
        // console.log(order)
        res.send(orders)
    }catch(err){
        res.status(404)
        throw new Error("No orders ")

    }
            
  });