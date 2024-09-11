'use client'
import React from 'react'
import AuthForm from '../auth/auth-form'
import { sendAdminAuthRequest } from '@/app/api-helpers/api-helpers.js';
import { useDispatch } from 'react-redux';
import { adminActions } from '@/app/store';


const Admin = () => {
  const dispatch =  useDispatch();
  const getData = (data: any) =>{
    console.log("Auth from admin", data)
    sendAdminAuthRequest(data)
    .then((res)=> console.log(res))
    .then(()=>dispatch(adminActions.login()))
    .catch((err) => console.log(err));
  };

  
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin