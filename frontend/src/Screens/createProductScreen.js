
import FormContainer from '../Components/FormContainer'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import axios from 'axios'

import { DetailProduct, ListProduct, UpdateProduct ,CreateProduct} from "../actions/productActions";

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
const CreateProductScreen = ({history}) => {


    
    const dispatch=useDispatch()
    const ProductCreate=useSelector(state=>state.ProductCreate)
    const {Loading:LoadingProductCreate,error:createProductError,success:createSucces}=ProductCreate
    
  
    
    const [name,setname]=useState('')
    const [price, setprice] = useState(0);
    const [image,setImage]=useState('')
    const [brand,setbrand]=useState('')
    const [category,setcategory]=useState('')
    const [description,setdescription]=useState('')
    const [countInStock,setcountInStock]=useState(0)
    const [uploading,setUploading]=useState(false)



 
    const uploadHandler=async ( e)=>{
      console.log('in upload')
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
       
     console.log("image is ",image)
    
        setUploading(false)
        console.log(uploading)
      }
    catch(err){
      console.log('In error')
  console.log(err)
  setUploading(false)
    }
  }



useEffect(()=>{


    if(createSucces){
    
      
        confirmAlert({
          message: `Created Successfully `,
          buttons:[{
            label: 'Close',
            onClick: () => null
          }]
  
      })
      
     
        history.push('/admin/productlist')
        dispatch({type:"ADMIN_PRODUCT_CREATE_RESET"})
      }
},[createSucces,dispatch,history])

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(CreateProduct({
            name,price,image,brand,category,description,countInStock
        }))


        

    }
    return (
        <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
          GO Back To Product List
        </Link>
        
  
        <FormContainer>
          <h3>Update Product</h3>
          
  
          {LoadingProductCreate ? (
            <Loader />
          ) : createProductError ? (
            <Message variant="danger">{createProductError}</Message>
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
                
                type='number'
                placeholder="Enter price "
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
              value={image}
            
              
              >
                  
              </Form.Control>
              <Form.File
               id='image-file'
               label='Choose File'
               custom
               onChange={uploadHandler}>
               
              </Form.File>
              </Form.Group>
             
        {console.log(uploading)}
              {uploading&&<Loader/>}
              
  
              
  
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
    
    type='number'
    placeholder="Enter countInStock"
    value={countInStock}
    onChange={(e)=>setcountInStock(e.target.value)}
  
    
    >
        
    </Form.Control>
  
  
  
  
  </Form.Group>
  
  
  
  
  
              
             
  
  
              <Button type='submit'>Create</Button>
  
            </Form>
          )}
  
  
  
        </FormContainer>
  
  
  
  
      </>
    )
}

export default CreateProductScreen
