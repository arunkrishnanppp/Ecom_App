import React,{useEffect, useState} from 'react'
import FormContainer from '../Components/FormContainer'
import {Form,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions'
import CheckOutSteps from '../Components/checkOutSteps'
const ShippingScreen = ({history}) => {

    const cart = useSelector(state =>state.Cart)
    const {shippingAddress}=cart
    const UserLogin=useSelector(state=>state.UserLogin)
    const {userInfo}=UserLogin
    
    const dispatch = useDispatch()
   
    const [name,setname]=useState(shippingAddress.name)
    const [address,setaddress]=useState(shippingAddress.address)
    const [city,setcity]=useState(shippingAddress.city)
    const [postalCode,setpostalCode]=useState(shippingAddress.postalCode)
    const [state,setstate]=useState(shippingAddress.state)
    const [country,setcountry]=useState(shippingAddress.country)

    useEffect(() => {
        if(!userInfo){
        history.push('/login?redirect=shipping')
    }
      },[history]);
    const submitHandler=(e)=>{
        e.preventDefault()
      

        console.log("SUBMIT");
        dispatch(saveShippingAddress({name,address,city,postalCode,state,country}))
            history.push('/payment')

    }
    return (

        
       <FormContainer>
       <CheckOutSteps step1 step2/>

           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type='text'
           placeholder="Enter Name" 
           value={name} 
           onChange={(e)=>setname(e.target.value)}>

           </Form.Control>
      </Form.Group>
           <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control 
          type='address'
           placeholder="Enter Home Address" 
           value={address} 
           onChange={(e)=>setaddress(e.target.value)}>

           </Form.Control>
      </Form.Group>


      <Form.Group controlId='city'>
          <Form.Label>city</Form.Label>
          <Form.Control 
          type='city'
           placeholder="Enter Home city" 
           value={city} 
           onChange={(e)=>setcity(e.target.value)}>

           </Form.Control>

           
      </Form.Group>

      <Form.Group controlId='state'>
          <Form.Label>state</Form.Label>
          <Form.Control 
          type='state'
           placeholder="Enter Home state" 
           value={state} 
           onChange={(e)=>setstate(e.target.value)}>
            </Form.Control>
</Form.Group>
      

<Form.Group controlId='postalcode'>
    <Form.Label>PostalCode</Form.Label>
    <Form.Control 
    type='Number'
     placeholder="Enter Home state" 
     value={postalCode} 
     onChange={(e)=>setpostalCode(e.target.value)}>
      </Form.Control>
</Form.Group>
<Form.Group controlId='country'>
    <Form.Label>Country</Form.Label>
    <Form.Control 
    type='text'
     placeholder="Enter Country" 
     value={country} 
     onChange={(e)=>setcountry(e.target.value)}>
      </Form.Control>
</Form.Group>

<Button type='submit' className='btn-block'>Continue</Button>


           </Form>
       </FormContainer>
    )
}

export default ShippingScreen
