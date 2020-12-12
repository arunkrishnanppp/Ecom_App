import React,{useEffect,useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {deleteUser} from '../actions/userActions'
import {listAllUsers} from '../actions/userActions'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const UserList=useSelector(state=>state.UserList)
    const {Loading,error,users}=UserList

    const UserLogin=useSelector(state=>state.UserLogin)
    const {userInfo}=UserLogin

    const UserDelete=useSelector(state=>state.UserDelete)
    const {success:successDelete}=UserDelete

    

    useEffect(()=>{

        if(userInfo&&userInfo.isAdmin){
        dispatch(listAllUsers())}
        else{
            history.push('/')
        }
    },[dispatch,history,successDelete,userInfo])

    const deleteHandler=(id,name)=>{
        console.log("in delte user");
console.log(userInfo._id,id);
        if(userInfo._id===id){
            confirmAlert({
                message: `Cant delete Ypurself`,
                buttons:[]
            })
        }else{


        confirmAlert({
            closeOnEscape: true,
  closeOnClickOutside: true,
            message: `Are you sure to delete "${name}"`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => dispatch(deleteUser(id))
              },
              {
                label: 'No',
                onClick: () => null
              }
            ]
          })
        }
    }
        // console.log("in delkt handlr");
        // dispatch(deleteUser(id))

        // here am calling the delete action/
    


    return (
        <>
         <h1>Users</h1>
         {Loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
         (
             <Table striped boardered hover responsive className='tabel-sm'>
             <thead>
                 <tr>
                     <th>Id</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>IsAdmin</th>
                 </tr>
             </thead>
             <tbody>

             {users.map(user=>
(
    <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.name}</td>
        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
        <td>
            {user.isAdmin?(
                <i className='fas fa-check' style={{color:'green'}}></i>
            ):
            (  <i className='fas fa-times' style={{color:'red'}}></i>)}
        </td>
<td>
    <LinkContainer to={user._id==userInfo._id?`/profile`:`/admin/user/${user._id}/edit`}>

        <Button variant='light' className='btn-sm'>


            <i className="fas fa-edit"></i>
        </Button>
    </LinkContainer>
    <Button className='btn-sm' variant='danger' onClick={()=>deleteHandler(user._id,user.name)}>
<i className='fas fa-trash'></i>

    </Button>
</td>
    </tr>
))}

             </tbody>

             </Table>
         )}   
        </>
    )
}

export default UserListScreen
