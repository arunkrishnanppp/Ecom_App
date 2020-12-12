import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { DetailProduct, ListProduct, UpdateProduct } from "../actions/productActions";

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ADMIN_PRODUCT_UPDATE_RESET, ADMIN_PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";
import axios from 'axios'

const ProductEditScreen = ({ match, history }) => {
  // console.log("in editscrems");

  const prodId=match.params.id


const [uploading,setuploading]=useState(false)

       
  const dispatch = useDispatch()

  const ProductUpdate=useSelector(state=>state.ProductUpdate)
  const {Loading:LoadingProductUpdate,error:errorProductUpdate,success:updateSucces}=ProductUpdate
  


    const ProductDetail=useSelector(state=>state.ProductDetail)
    const {Loading,error,product}=ProductDetail

    const [name,setname]=useState('')
    const [price, setprice] = useState(0);
    const [Image,setImage]=useState('')
    const [brand,setbrand]=useState('')
    const [category,setcategory]=useState('')
    const [description,setdescription]=useState('')
    const [countInStock,setcountInStock]=useState(0)
    const [Uploading,setUploading]=useState(false)


 
    const uploadHandler=async ( e)=>{
      const file=e.target.files[0]
    
  
      let formData=new FormData()
      formData.append('image',file)
      console.log(file)
  
      setUploading(true)
      console.log("upload")
      console.log(Array.from(formData))
  
      try{
        const config={
          headers:{
            'Content-Type':'multipart/form-data'
  
  
          }
        }
        console.log(formData)
     
        const {data}=await axios.post('/api/upload',formData,config)
        console.log('after post')
        console.log(data)
        var str=data.replace("\\","/")
        console.log("FIl name is ",str)
       
        setImage(str)
       
     console.log("image is ",Image)
    
        setUploading(false)
        console.log(Uploading)
      }
    catch(err){
      console.log('In error')
  console.log(err)
  setuploading(false)
    }
  }
  
  
  
  
  
    const submitHandler = (e) => {
      e.preventDefault();
      console.log('on submit')
      console.log(name)
  
      dispatch(UpdateProduct(prodId,{
        name,
        price,
        image:Image,
        brand,
        category,
        countInStock,
        description
  
  
      }))
      
    }



 

  useEffect(() => {

    console.log("IN EDIT,",name,price)
   
    if(updateSucces){
    
      
      confirmAlert({
        message: `updated Successfully `,
        buttons:[{
          label: 'Close',
          onClick: () => null
        }]

    })
    
    dispatch({type:"ADMIN_PRODUCT_DEATIL_RESET"})
      history.push('/admin/productlist')
    }else{
      if(!product.name||product._id!==prodId){
        dispatch(DetailProduct(prodId))
       
 
      }else{
        
 
        console.log("Product is",product)
        setname(product.name)
        setprice(product.price)
        setcountInStock(product.countInStock)
        setdescription(product.description)
        setbrand(product.brand)
        setcategory(product.category)
        setImage(product.image)
      }
    }
    
  //     
  

    
  }, [history,dispatch,updateSucces,product,prodId]);



  
  return (
 
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        GO Back
      </Link>
      

      <FormContainer>
        <h3>Update Product</h3>
        

        {Loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
              
              type='name'
              placeholder="Enter Name"
              value={name}
              onChange={(e)=>setname(e.target.value)}

              
              >
                  
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
              
              type='price'
              placeholder="Enter price Address"
              value={price}
              onChange={(e)=>setprice(e.target.value)}

              
              >
                  
              </Form.Control>




            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
              
              type='text'
              placeholder="EnterImage"
              value={Image}
            
              
              >
                  
              </Form.Control>
              <Form.File
               id='image-file'
               label='Choose File'
               custom
               onChange={uploadHandler}>
               
              </Form.File>
              </Form.Group>
             
        {console.log(Uploading)}
              {Uploading&&<Loader/>}



           
            

            

<Form.Group controlId="brand">
  <Form.Label>Brand</Form.Label>
  <Form.Control
  
  type='brand'
  placeholder="Enter Brand"
  value={brand}
  onChange={(e)=>setbrand(e.target.value)}

  
  >
      
  </Form.Control>





</Form.Group>
<Form.Group controlId="description">
  <Form.Label>Description</Form.Label>
  <Form.Control
  
  type='description'
  placeholder="Enter description"
  value={description}
  onChange={(e)=>setdescription(e.target.value)}

  
  >
      
  </Form.Control>




</Form.Group>



<Form.Group controlId="category">
  <Form.Label>Cetegory</Form.Label>
  <Form.Control
  
  type='category'
  placeholder="Enter Category"
  value={category}
  onChange={(e)=>setcategory(e.target.value)}

  
  >
      
  </Form.Control>




</Form.Group>





<Form.Group controlId="countInStock">
  <Form.Label>CountInStock</Form.Label>
  <Form.Control
  
  type='countInStock'
  placeholder="Enter countInStock"
  value={countInStock}
  onChange={(e)=>price(e.target.value)}

  
  >
      
  </Form.Control>




</Form.Group>





            
           


            <Button type='submit'>Update</Button>

          </Form>
        )}



      </FormContainer>




    </>
  );
};

export default  ProductEditScreen;
