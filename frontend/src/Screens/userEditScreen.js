import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import FormContainer from "../Components/FormContainer";
import { getUserDetails,updateUserProfileAdmin } from "../actions/userActions";
import { ADMIN_USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
const UserEditScreen = ({ match, history }) => {
  console.log("in editscrems");

  const [popupstate,setpopupstate]=useState(false)


  const UserId = match.params.id;
  const userDetails=useSelector(state=>state.UserDetails)
  const {Loading,error,user}=userDetails

  const UserUpdate=useSelector(state=>state.UserUpdate)
  const {Loading:Loadinguserupdate,error:erroruserupdate,success:updateSucces}=UserUpdate
  
  const [name, setname] = useState('');



  const [email, setemail] = useState('');
  const [isAdmin, setisAdmin] = useState(false);


    
  const dispatch = useDispatch()

  useEffect(() => {
    if(updateSucces){
      dispatch({type:ADMIN_USER_UPDATE_PROFILE_RESET})
      
      confirmAlert({
        message: `updated Successfully Ypurself`,
        buttons:[{
          label: 'Close',
          onClick: () => null
        }]

    })
      history.push('/admin/userlist')
    }else{
      console.log("in use effect");
      if(!user.name||user._id!==UserId){
        dispatch(getUserDetails(UserId))
      }
     else{
       setname(user.name)
       setemail(user.email)
       setisAdmin(user.isAdmin)
     }
    }
   
  }, [getUserDetails,user.name,UserId,updateSucces]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('on submit')

    console.log(name,email,isAdmin)
    dispatch(updateUserProfileAdmin(UserId,name,email,isAdmin))
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        GO Back
      </Link>
      <FormContainer>
        <h3>Update User</h3>
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

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
              
              type='email'
              placeholder="Enter Email Address"
              value={email}
              onChange={(e)=>setemail(e.target.value)}

              
              >
                  
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              
              <Form.Check
              
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              
              onChange={(e)=>setisAdmin(e.target.checked)}

              
              >
                  
              </Form.Check>
            </Form.Group>
            <Button type='submit'>Update</Button>

          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
