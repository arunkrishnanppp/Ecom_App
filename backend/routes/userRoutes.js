import express from 'express'
const router=express.Router()
import AsyncHandler from 'express-async-handler'
import products from '../data/products.js'
import Product from '../model/productModel.js'
import {authUser,getUserProfile,addNewUser,updateUserProfile,getUserByid, getAllUsers,updateUser, deleteUser} from '../controller/userController.js'
import {adminAuthentication, protectProfile} from '../middleware/authenticationMiddleware.js'

// we will be hacing only one post req to authenticate user so/

// this will be hooked with /api/users
router.post('/login',authUser)
router.route('/profile').get(protectProfile,getUserProfile)
router.route("/").get(protectProfile,adminAuthentication,getAllUsers)
router.route("/").post(addNewUser)
router.route('/:id').delete(protectProfile,adminAuthentication,deleteUser)
router.route('/profile').put(protectProfile,updateUserProfile)
router.route('/:id').get(protectProfile,adminAuthentication,getUserByid).put(protectProfile,adminAuthentication,updateUser)




 




function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  


export default router