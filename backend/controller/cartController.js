import AsyncHandler from "express-async-handler";
import Cart from '../model/cartModel.js'



//@desc add to cart 
//@route PUT /api/cart
//@access priavte
export const addtocart = AsyncHandler(async (req, res) => {
    console.log("In Add to Cart");
  
    console.log(req.body);
    
    const uid=req.current_user._id
    console.log(req.current_user._id)
    const {product,image,name,price,countInStock,qty}=req.body
    
    console.log(req.body)
    var item=await Cart.find({product:product,userId:uid})
    console.log(item)
    if (item.length!=0) {
        console.log('in if')
     
        
      if(req.body.qty!=item[0].qty){
          console.log('in second if')
        item[0].qty=req.body.qty
      }
  
  
    //   console.log('In update')
  
     
       const updateditem= await item[0].save()
     console.log(updateditem)
     res.json(updateditem)
    } 
    else {
      const   newitem =await Cart.create({
          userId:req.current_user._id,
          product:product,
          image,
          price,
          countInStock,
          qty,
          name
      })
      console.log(newitem)
      res.json(newitem)
      
    }
  });
  


  
//@desc add to cart 
//@route PUT /api/cart
//@access priavte
export const getItemsFromCart = AsyncHandler(async (req, res) => {
  console.log("In get items  Cart");


  
  const uid=req.current_user._id
  console.log(uid)

  
  
  console.log(req.body)
  var items=await Cart.find({userId:uid})
  console.log(items)
  
      console.log('in if')
   
      
   
    


  //   console.log('In update')

   
   res.json(items)



 
});

  