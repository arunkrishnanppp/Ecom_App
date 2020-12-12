import React,{useState,useEffect}  from 'react'
// useEffect is used tomake req to backend server/
import {Row,Col, Pagination} from 'react-bootstrap'
// import products from '../products'
// Product is actually global  fr redux level but we wiull mke it compoenet level right now
import Product from '../Components/Product'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from'react-redux'
import {ListProduct} from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'



import Paginate from '../Components/Paginate'
import ProductCarousal from '../Components/ProductCarousal'

import Meta from '../Components/Meta'



const Homescreen = ({match}) => {

const keyword=match.params.keyword&&match.params.keyword

const pageNumber=match.params.pageNumber||1

    // const[products,setproducts]=useState([])

            //NOO NEED TO USE STAE IN COMPONET IF WE ARE USING REDUX

            const dispatch=useDispatch()
            const productList=useSelector(state=>state.ProductList)
            
           
            
            console.log(productList);
            const {Loading,error,products,pages,page}=productList

            console.log("In Homescreen",products,pages,page)
            // const loading=true
            // console.log(error);


    // product is the sate and set product is the function to chnage it/
    useEffect(()=>{
        
        console.log('Hello')
        // axios.get('/api/products')



        //befor using redux and reducer and actions

        // const fetchProduct=async()=>{
        //     const {data}=await axios.get('/api/products')
        //     setproducts(data)
        // }
        // fetchProduct()




        //after using redux

        // no need to set products as local state for this componet/

        dispatch(ListProduct(keyword,pageNumber))
        

    },[dispatch,keyword,pageNumber])
    // const products=[]
    return (
        <>
         
<Meta/>
        {!keyword?<ProductCarousal/>:<Link to='/' className='btn btn-light'>Go Back</Link>}
        
          <h1>Products</h1>
          {Loading?(
           
          <Loader/>
             ):error?<Message variant='danger'>{error}</Message>:
           ( 
               
               <>
               
               <Row>


           {products.length==0?
           (
           <Message>`No Result for your keyword "{keyword   }"`   <Link to ='/'>Go Back</Link></Message>
         
           
           ):null
           
           }
          {products.map(prod => (
              

              <Col key={prod.id} sm={12} md ={6} lg={4} xl={3}>
                  <Product product={prod}/>
                  {/* <h3>{prod.name}</h3> */}
              </Col>
          ))}
          </Row>

          <Row>
         
          <Paginate
         

pages={pages}
page={page}
keyword={keyword?keyword:''}
></Paginate>


        
          </Row>



          </>
           )
          }
            
        </>
    )
}

export default Homescreen
