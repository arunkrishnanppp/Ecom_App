import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'
const Product = ({product}) => {
    return (
        // my- for margin on y axis p-3 for padding alll around
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image}></Card.Img>

            </Link>
        <Card.Body>
        <Link to={`/product/${product._id}`}>
        <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
       

        </Link>

        <Card.Text as ='div'><div>
            {/* {product.rating} from  {product.numReviews} */}
            <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>

        </div></Card.Text>

        <Card.Text as='h3'> ${product.price}</Card.Text>

        </Card.Body>
           
        </Card>    
        )
}

export default Product
