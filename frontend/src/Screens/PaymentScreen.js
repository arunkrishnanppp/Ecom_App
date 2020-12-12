import React,{useEffect, useState} from 'react'
import FormContainer from '../Components/FormContainer'
import {Form,Button,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {savePaymentMethod} from '../actions/cartActions'
import CheckOutSteps from '../Components/checkOutSteps'
const PaymentScreen = ({history}) => {

    const cart = useSelector(state =>state.Cart)
    const {shippingAddress}=cart
    const UserLogin=useSelector(state=>state.UserLogin)
    const {userInfo}=UserLogin

    if (!shippingAddress){
        history.push('/shipping')
    }
    useEffect(() => {
        if(!userInfo){
        history.push('/login?redirect=payment')
    }
      },[history]);
    const dispatch = useDispatch()
   
   const [paymentMethod,setpaymentMethod]=useState("PayPal")
    const submitHandler=(e)=>{
        e.preventDefault()

        console.log("SUBMIT");
        dispatch(savePaymentMethod(paymentMethod))
            history.push('/placeorder')
    }
    return (

        
       <FormContainer>

       <CheckOutSteps step1 step2 step3/>


           <Form onSubmit={submitHandler}>
           
           <Form.Group>
               <Form.Label>Select Payemnt Method</Form.Label>
           </Form.Group>
           <Col>
               <Form.Check type="radio"
               label='Paypal or Credit Card'
               id='Paypal'
               name='paymentMethod'
               value='Paypal'
               checked
               onChange={(e)=>setpaymentMethod(e.target.value)}></Form.Check>
           </Col>
           <Col>
               <Form.Check type="radio"
               label='Phon Pe'
               id='phonpe'
               name='paymentMethod'
               value='PhonePe'
               
               onChange={(e)=>setpaymentMethod(e.target.value)}></Form.Check>
           </Col>

        <Button type='submit' variant='danger'>Continue</Button>

</Form>
          
       </FormContainer>
    )
}

export default PaymentScreen
