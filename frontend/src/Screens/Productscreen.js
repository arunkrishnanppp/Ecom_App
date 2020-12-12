import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Image,ListGroup,Card,Button, Form} from 'react-bootstrap'
import Rating from '../Components/Rating'
// import Products from '../products'
import axios from 'axios'
import Meta from '../Components/Meta'
import cartScreen from './CartScreen'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


import {useDispatch,useSelector} from'react-redux'
import {clearData, CreateProductReview, DetailProduct} from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// const Productscreen = ({match}) => {
//     const product=Products.find(p=>p._id === match.params.id)
    const Productscreen = ({history,match,location}) => {
        const [qty,setQty]=useState(1)

        const [rating,setrating]=useState(1)
        const [comment,setcomment]=useState("")
        
        
        console.log("ID IS",match.params.id);
        const dispatch=useDispatch()
        const {Loading,product,error}=useSelector(state=>state.ProductDetail)
      
        const {userInfo}=useSelector(state=>state.UserLogin)
        console.log(userInfo)
        const PrductRevirewCreate=useSelector(state=>state.PrductRevirewCreate)
        const {Loading:ReviewCreateLoading,success:ReviewCreateSuccess,error:ReviewCreateError}=PrductRevirewCreate
console.log(product.reviews)

  const {Loading:ProductReviewCreateLoading,success:ProductReviewCreateSuccess,error:ProductReviewCreateError}=useSelector(state=>state.PrductRevirewCreate)

        console.log(Loading);
        // const product=Products.find(p=>p._id === match.params.id)
        // const[product,setProduct]=useState([])

        
        useEffect(()=>{
            if(ProductReviewCreateSuccess){
                setrating(0)
                setcomment('')
                dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
                confirmAlert({
                    message: `updated Successfully `,
                    buttons:[{
                      label: 'Close',
                      onClick: () => {
                       
                      }
                    }]
            
                })
              
            }
            dispatch(DetailProduct(match.params.id))

           
         
            // commentin to use redux/
            console.log('Hello')
            // // axios.get('/api/products')
            // const fetchProduct=async()=>{
            //     const {data}=await axios.get(`/api/products/${match.params.id}`)
            //     setProduct(data)
            // }
            // fetchProduct()

            
           

            return () => {
                console.log("IN RETURN");
                dispatch(clearData());
              };

        },[dispatch,match,ReviewCreateSuccess])

        const AddToCart=()=>{
            console.log("Add");
            console.log(qty);
            
            history.push(`/cart/${match.params.id}?qty=${qty}`)
        }
        
       
    const AddReviewSubmit=(e)=>{
            e.preventDefault()

        console.log("add review",rating)
        dispatch(CreateProductReview(match.params.id,{rating,comment}))
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
    return (
        <>
        <Meta title={product.name}/>
       
        <Link to='/' className='btn btn-dark'>GO Back</Link>
        {Loading?(
           
           <Loader/>
              ):error?<Message variant='danger'>{error}</Message>:



              
        (

            
            <>
            <Row>
            <Col md={6}>
            
                <Image  src={product.image} alt={product.name} fluid></Image>


           
            </Col>
            <Col md={3}>
            
            <ListGroup varience='flush'>
                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`}/></ListGroup.Item>
            </ListGroup>
            <ListGroup className='px-5'>
                <h2>{product.price}</h2>
            </ListGroup>
            <ListGroup>
                Descrption:{product.description}
            </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup varient="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>{product.price}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    <strong>{product.countInStock>0?'In Stoke':'Out od stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock>0 &&(<ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                {console.log(qty)}
                                <Form.Group>

                                <Form.Control 
                                    
                                    as='select' 
                                    value={qty}
                                    onChange={(e)=>{
                                        console.log('ONCHANE')
                                        setQty(e.target.value)}}
                                    >
                                        
    
                                        
                                        {  [...Array(product.countInStock).keys()].map((x) =>{
                                 
                                return(<option key={x+1} value={x+1}>{x+1}</option>)
                                
                                
                               })}

                              

                              
                            
                                    </Form.Control>




                                </Form.Group>
                                                                   </Col>
                            </Row>
                        </ListGroup.Item>)}
                        
                        <ListGroup.Item>
                            
                                <Button onClick={AddToCart} className='btn btn-block' type='button' disabled={product.countInStock===0}>Add to cart</Button>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
       
<Row>
<Col md={6}>
    <h3>Reviews</h3>

        {product.reviews&& product.reviews.length==0?<Message>No Reviews</Message>:
        (
            <ListGroup  varient="flush">

            {product.reviews&&product.reviews.map(item=>(
               <ListGroup.Item
               key={item._id}>
            <strong>{item.name}</strong>
            <Rating value={item.rating}></Rating>
            <p>{item.createdAt.substring(1,10)}</p>
            <p>{item.comment}</p>

               </ListGroup.Item>
            ))}

            </ListGroup>
        )}
</Col>
<Col>
<h3>Add your Reviews</h3>
{ReviewCreateError&&(<Message>{ReviewCreateError}</Message>)}
{userInfo?(<Form

onSubmit={AddReviewSubmit}
>
    <Form.Group>
        <Form.Control 
        as='textarea'
        placeholder='Enter Yout Comment'

        onChange={(e)=>setcomment(e.target.value)}
        ></Form.Control>
    </Form.Group>
    <Form.Group>
    <Form.Control 
                                    
                                    as='select' 
                                    value={rating}
                                    onChange={(e)=>{
                                        console.log('ONCHANE')
                                        setrating(e.target.value)}}
                                    >
                                        
    
                                        
                                        {  [1,2,3,4,5].map((x) =>{
                                 
                                return(<option key={x} value={x}>{x}</option>)
                                
                                
                               })}

                              

                              
                            
                                    </Form.Control>
    </Form.Group>
    <Button
    type='submit' 
    className='btn btn-block'>Add Your Review</Button>
</Form>):
<Message >Please <Link 
to={{
    pathname: "/login",
    
    state: { next:location.pathname }
  }}
>Sign In</Link> to Add Review</Message>}

   
</Col>
</Row>
</>
        )}
        </>
  

    
        
    )
    
}


export default Productscreen
