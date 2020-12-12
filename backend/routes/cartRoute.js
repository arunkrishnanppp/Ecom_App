import express from 'express'
import { addtocart, getItemsFromCart } from '../controller/cartController.js'
import {protectProfile} from '../middleware/authenticationMiddleware.js'
const router=express.Router()


router.route('/').put(protectProfile,addtocart)
router.route('/').get(protectProfile,getItemsFromCart)


export  default router