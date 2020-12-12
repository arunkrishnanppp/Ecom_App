import express from 'express'

const router=express.Router()
import {adminAuthentication, protectProfile} from '../middleware/authenticationMiddleware.js'
import {addOrderItems, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPayed}from '../controller/orderController.js'


router.route('/').post(protectProfile,addOrderItems).get(protectProfile,adminAuthentication,getAllOrders)
router.route('/myorders').get(protectProfile,getMyOrders)
router.route('/:id').get(protectProfile,getOrderById)
router.route('/:id/pay').put(protectProfile,updateOrderToPayed)
router.route('/:id/delivered').put(updateOrderToDelivered)




export default router