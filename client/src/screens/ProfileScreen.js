import React, { useContext, useReducer, useState } from 'react'
import { Store } from '../store';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_REQUEST':
        return { ...state, loadingUpdate: true };
      case 'UPDATE_SUCCESS':
        return { ...state, loadingUpdate: false };
      case 'UPDATE_FAIL':
        return { ...state, loadingUpdate: false };
      default:
        return state;
    }
  };


const ProfileScreen = () => {
    const {state , dispatch : ctxDispatch} = useContext(Store)
    const {userInfo} = state ; 
    const [name , setName] = useState(userInfo.name)
    const [email , setEmail] = useState(userInfo.email)
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')

    const [{loadingUpdate}, dispatch] = useReducer(reducer , {
        loadingUpdate : false
    })

    const submiHandler =async (e)=>{
        e.preventDefault()
        try {
            //dispatch({ type: 'UPDATE_REQUEST' });
            const {data} = await axios.put('/api/users/profile', {
                name,
                email,
                password
            },
            {
                headers: {
                    authorization: `Bearer ${userInfo.token}`,
                  },
            })
            dispatch({ type: 'UPDATE_SUCCESS' });
            ctxDispatch({type : 'USER_SIGNIN', payload : data})
            localStorage.setItem('userInfo',JSON.stringify(data))
            toast.success('user updated successfuly')
            
        } catch (err) {
            dispatch({
                type :'UPDATE_FAIL',
            })
            toast.error(getError(err))
        }
    }


  return (
    <div className='container small-container'>
    <Helmet>
        User Profile
    </Helmet>
    <h1 className='my-3'>User Profile</h1>
    <form onSubmit={submiHandler}>
    <Form.Group className='mb-3' controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
        value = {name}
        onChange = {(e)=>setName(e.target.value)}
        required
         />
    </Form.Group>
    <Form.Group className='mb-3' controlId="name">
        <Form.Label>Email</Form.Label>
        <Form.Control
        value = {email}
        type = "email"
        onChange = {(e)=>setEmail(e.target.value)}
        required
         />
    </Form.Group>
    <Form.Group className='mb-3' controlId="name">
        <Form.Label>password</Form.Label>
        <Form.Control
        value = {password}
        type ="password"
        onChange = {(e)=>setPassword(e.target.value)}
        required
         />
    </Form.Group>
    <Form.Group className='mb-3' controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
        type="password"
        onChange = {(e)=>setConfirmPassword(e.target.value)}
        required
         />
    </Form.Group>
    <div className='mb-3'>
        <Button type='submit'>Update</Button>
    </div>

    </form>

    </div>
  )
}

export default ProfileScreen