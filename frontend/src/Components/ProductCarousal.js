import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Carousel,Image} from 'react-bootstrap'
import { useSelector,useDispatch} from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import {ListProduct, TopProducts} from '../actions/productActions'


const ProductCarousal = () => {
    const dispatch = useDispatch()

const Products = useSelector(state => state.TopProducts)
const {products,Loading,error}=Products
useEffect(()=>{

    dispatch(TopProducts())

},[dispatch])
    return Loading?<Loader/>:
    error?<Message variant='danger'>{error}</Message>:(
        <Carousel
        pause='hover'
        className='bg-dark'

        >
{products&&products.map(prod=>(
    <Carousel.Item
    interval={800}
    key={prod._id}

    >
<Link to={`/product/${prod._id}`}>


<Image  src={prod.image} alt={prod.name} fluid></Image>
<Carousel.Caption className='carousal-caption'>
    {prod.name} ({prod.price})
</Carousel.Caption>


</Link>

    </Carousel.Item>
))}


        </Carousel>
    )
}

export default ProductCarousal
