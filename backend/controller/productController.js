import Product from '../model/productModel.js'
import AsyncHandler from 'express-async-handler'

//@desc Fatch All products
//@route GET /api/products?keyword=keyword
//@access public
export const getAllProducts=AsyncHandler(async (req,res)=>{
    // res.json(products)

    const pageSize=8
    const page=Number(req.query.pageNumber)||1

const keyword=req.query.keyword?

{
  name:{
    $regex: req.query.keyword,
    $options :'i'
    
  
  }
}:{}

    console.log('IN products',keyword)

  const count=await Product.countDocuments({...keyword})
const products= await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
// await sleep(1000);
console.log(products)
res.json({products,page,pages:Math.ceil(count/pageSize)})
// res.status(401)
// throw new Error("No Authoriesd")
})
 

export const getProductById=AsyncHandler(async (req,res)=>{
    console.log('In Ind Project');
    // console.log(req.params)
    // const prod=products.find(p=>p._id===req.params.id)
    // console.log(req.params.id);
    // res.json(prod)
    // await sleep(1000);
    const product =await Product.findById(req.params.id)
    // console.log(product)
    console.log(product)
    if(product){
    res.json(product)
  
    }else{
        console.log('In else');
        // res.status(404).json({Message:'Product Not found'})
        res.status(404)
        throw new Error('Product Not Found')
    }
})


// @desc Delete a product
// @route /api/products/;id
//@access Private/admin
export const deleteProductById=AsyncHandler(async(req,res)=>{
    console.log('in delete rpduct handler')

    console.log(req.params.id);
try{
const product=await Product.findById(req.params.id)

if(product){
await product.remove()
console.log('deleted')
res.json({message:"Product Removed"})

}else{
  res.status(404)
  throw new Error("Product not found")
}

}catch(err){
  res.status(404)
  throw new Error("Product not found")
}

})






// @desc create update product
// @route /api/products
//@access Private/admin
export const createProduct=AsyncHandler(async(req,res)=>{
  console.log('in create product handler')

  console.log(req.body);
  const prod=req.body
try{
const newProduct=new Product({
  name:prod.name,
  price:0,
  user:req.current_user._id,
  image:prod.image&&prod.image,
  brand:prod.brand,
  category:prod.category,
  countInStock:prod.countInStock,
  numReviews:0,
  description:prod.description,
  rating:0
})
const createdProduct =await newProduct.save()
res.status(201).json(createdProduct)
}catch(err){
  console.log(err)
res.json(err)

}

})




// @desc update update product
// @route /api/products/:id
//@access Private/admin
export const updateProduct=AsyncHandler(async(req,res)=>{
  console.log('in update product handler')
const id=req.params.id
console.log(id)
  const p=req.body
  // console.log(req.body)
try{


  const product=await Product.findById(id)
  console.log(product)
  if(product){
    console.log('in if')
// console.log(product)
  product.name=p.name,
  product.price=p.price,
  product.user=req.current_user._id,
  product.image=p.image|| product.image
  product.brand=p.brand,
  product.category=p.category,
  product.countInStock=p.countInStock,
  product.numReviews=p.numReviews||product.numReviews
  product.description=p.description,
  product.rating=p.rating|| product.rating
  // console.log(product)
const updatedProduct=await product.save()
console.log(updatedProduct)
res.status(201).json(updatedProduct)
  }
}catch(error){

throw  error
}

})



// @desc create new review
// @route POST /api/products/:id/review
//@access Private
export const createProductReview=AsyncHandler(async(req,res)=>{
  console.log('in add review handler')
const id=req.params.id
console.log(id)
console.log(req.body)
  const {rating,comment}=req.body

  // console.log(req.body)



  const product=await Product.findById(id)
  console.log(product)
  if(product){

    const alreadyReviewed=product.reviews.find(r=>r.user.toString()===req.current_user._id.toString())
    if(alreadyReviewed){
      res.status(404)
      throw new Error('Already Reviews')
    }else{
      const review={
        name:req.current_user.name,
        rating:Number(rating),
        comment:comment,
        user:req.current_user._id
      }
      product.reviews.push(review)
      product.numReviews=product.reviews.length
      product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
      await product.save()
      res.status(201).json({message:"Review Added"})
    }
   

  }
  else{
res.status(404).json({message:"NOT FOOUBf"})
  }

})





// @desc Get top products
// @route GET /api/products/topproducts
//@access public
export const getTopProducts=AsyncHandler(async(req,res)=>{
  console.log('in get toppdroductshandler')


  const products=await Product.find({}).sort({rating:-1}).limit(4)
console.log(products)
  res.json(products)
})