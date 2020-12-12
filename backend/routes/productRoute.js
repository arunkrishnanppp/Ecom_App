import express from 'express'
const router=express.Router()
import AsyncHandler from 'express-async-handler'
import products from '../data/products.js'
import Product from '../model/productModel.js'
import {createProduct, createProductReview, deleteProductById, getAllProducts, getProductById, getTopProducts, updateProduct} from '../controller/productController.js'
import {adminAuthentication,protectProfile} from '../middleware/authenticationMiddleware.js'
// router.route('/').get(getAllProduct(req,res))
router.get('/',getAllProducts)
router.get('/topproducts',getTopProducts)
router.route('/').post(protectProfile,adminAuthentication,createProduct)
router.route('/:id').get(getProductById).delete(protectProfile,adminAuthentication,deleteProductById)
.put(protectProfile,adminAuthentication,updateProduct)



router.route('/:id/review').post(protectProfile,createProductReview)



 




function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  


export default router