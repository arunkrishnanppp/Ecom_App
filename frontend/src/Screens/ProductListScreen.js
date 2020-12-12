import React,{useEffect,useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button,Row,Col, Pagination} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {deleteUser} from '../actions/userActions'
import {listAllUsers} from '../actions/userActions'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { DeleteProductById, ListProduct } from '../actions/productActions'
import { productDeleteReducer } from '../Reducers/productReducers'
import { ADMIN_PRODUCT_DELETE_FAIL, ADMIN_PRODUCT_DELETE_REQ, ADMIN_PRODUCT_DELETE_RESET, ADMIN_PRODUCT_UPDATE_RESET } from '../constants/productConstants'


import Paginate from '../Components/Paginate'


import {ADMIN_PRODUCT_CREATE_RESET} from '../constants/productConstants'








const ProductListScreen = ({history,match}) => {


    const pageNumber=match.params.pageNumber||1

    const dispatch = useDispatch()

    const ProductList=useSelector(state=>state.ProductList)
    const {Loading,error,products,pages,page}=ProductList

    const UserLogin=useSelector(state=>state.UserLogin)
    const {userInfo}=UserLogin

    
    const DeleteProduct=useSelector(state=>state.ProductDelete)
    const {Loading:productDeleteLoading,success:ProductDeleteSuccess,error:deleteError}=DeleteProduct

    
    const ProductCreate=useSelector(state=>state.ProductCreate)
    const {product:createdProduct,Loading:productCreateLoading,success:ProductCreateSuccess,error:createError}=ProductCreate

    
    const ProductUpdate=useSelector(state=>state.ProductUpdate)
    const {Loading:LoadingProductUpdate,error:errorProductUpdate,success:updateSucces}=ProductUpdate
    
  

    

    useEffect(()=>{
        if(!userInfo){
            history.push('/login?redirect=productlist')
        }
        dispatch({type:ADMIN_PRODUCT_CREATE_RESET})
        if(updateSucces){
            dispatch(ListProduct())
            dispatch({type:ADMIN_PRODUCT_UPDATE_RESET})
            
        }


if(ProductDeleteSuccess){




    dispatch(ListProduct('',pageNumber))
    confirmAlert({

        closeOnEscape: true,
closeOnClickOutside: true,
        message: ` Sucesfully deleted`,
        buttons: [
          {
            
            label: 'Yes',
            onClick: null
            }]})
            
    dispatch({type:ADMIN_PRODUCT_DELETE_RESET})
}
        if(userInfo&&!userInfo.isAdmin){
            history.push('/')
        }

        if(ProductCreateSuccess){
            history.push(`/admin/products/${createdProduct._id}/edit`)
        }else{
            dispatch(ListProduct('',pageNumber))
        }

     
    },[dispatch,history,userInfo,ProductDeleteSuccess,updateSucces,pageNumber])

    const createProductHandler=()=>{

        history.push('/admin/product/create')

        

    }
    const deleteHandler=(id,name)=>{
//         console.log("in delte user");
// console.log(userInfo._id,id);
//       


        confirmAlert({
            closeOnEscape: true,
  closeOnClickOutside: true,
            message: `Are you sure to delete "${name}"`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    dispatch(DeleteProductById(id))
                
                    confirmAlert({
                        closeOnEscape: true,
              closeOnClickOutside: true,
                        message: ` "${name} deleted"`})
                }
              },
              {
                label: 'No',
                onClick: () => null
              }
            ]
          })
          
        }
// DELETE PRODUCT/
    
        // console.log("in delkt handlr");
        // dispatch(deleteUser(id))

        // here am calling the delete action/
    


    return (
        <>
        <Row className='align-items-center'>

            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='texxt-right'>
                <Button className='my-3'  onClick={createProductHandler}>
                <i className='fas fa-plus'></i>
                Create Product

                </Button>

            </Col>

        </Row>
        <Row>
        <Col>
        {productDeleteLoading&&<Loader/>}
        {deleteError&&<Message variant='danger'>{deleteError}</Message>}
        {productCreateLoading&&<Loader/>}
        {createError&&<Message variant='danger'>{deleteError}</Message>}
        {Loading?<Loader/>:error?<Message variant='danger'>{"Hello"}</Message>:
         (
             <Table striped boardered hover responsive className='tabel-sm'>
             <thead>
                 <tr>
                     <th>Id</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Category</th>
                     <th>Brand</th>
                   
                     
                     
                 </tr>
             </thead>
             <tbody>

             {products.map(product=>
(
    <tr key={product._id}>
        <td>{product._id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.category}</td>
        <td>{product.brand}</td>
       
       
<td>
<LinkContainer to={`/admin/product/${product._id}/edit`}>

        <Button variant='light' className='btn-sm'>


            <i className="fas fa-edit"></i>
        </Button>
    </LinkContainer>
   
    <Button className='btn-sm' variant='danger' onClick={()=>deleteHandler(product._id,product.name)}>
<i className='fas fa-trash'></i>

    </Button>
</td>
    </tr>
))}

             </tbody>


             </Table>
         )}   
         </Col>




         
        </Row>

        <Paginate
         

         pages={pages}
         page={page}
         isAdmin={true}
        
         ></Paginate>







         
        
        </>
    )
}

export default ProductListScreen
