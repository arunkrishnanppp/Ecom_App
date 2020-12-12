import User from '../model/userModel.js'
import jwt from 'jsonwebtoken'
import AsyncHandler from 'express-async-handler'

const protectProfile=AsyncHandler(async(req,res,next)=>{
    console.log("I n authentication route");
let token
    // console.log(req.headers);c
    // const token=
    console.log(req.headers.authorization);
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        console.log("Token found");
        // console.log(req.headers.authorization);

        try {
         token=req.headers.authorization.split(' ')[1]
        //  console.log(token);
         const decode=jwt.verify(token,process.env.JWT_SECRET)

         console.log(decode.id);
         req.current_user=await User.findById(decode.id).select('-password')
        //  res.send(user)
        console.log(req.current_user)
        
        next()
        } catch (error) {
            console.log("TOKEN NOT INVALID");
            res.status(401)
            throw new Error('No Authorized -INVALID TOKEN')
           
        }
    }
    else{
        console.log("TOKRN NOT FOUND");
        res.status(401)
        throw new Error('Not Authoried- TOKEN NOT FOUND')
    }
    
    

}
)


const adminAuthentication=(req,res,next)=>{
    console.log('in admin auth')
    console.log(req.current_user)
    if(req.current_user&&req.current_user.isAdmin){
        console.log("passed")
        next()
    }
    else{
        res.status(401)
        throw new Error("Not autherized  as admin")
    }
}
export {protectProfile,adminAuthentication}
