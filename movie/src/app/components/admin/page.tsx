'use client'
import React from 'react'
import AuthForm from '../auth/auth-form'
import { sendAdminAuthRequest } from '@/app/api-helpers/api-helpers.js';
import { useDispatch } from 'react-redux';
import { adminActions } from '@/app/store';


const Admin = () => {
  const dispatch =  useDispatch();
  // const onResponseRecieved = (data: any) =>{
  //     console.log(data);
  //     dispatch(adminActions.login());
  //     localStorage.setItem("adminId",data.id)
  //     localStorage.setItem("token", data.token)
  // }
  const onResponseRecieved = (data: any) => {
    console.log("admin data is");
    console.log(data);
  
    if (data && data.id) {
      dispatch(adminActions.login());
      localStorage.setItem("adminId", data.id);
      localStorage.setItem("token", data.token)
    } else {
      console.error("User ID not found in response data");
    }
  };
  

  const getData = (data: any) =>{
    console.log("Auth from admin", data)
    sendAdminAuthRequest(data)
    // .then((res)=> console.log(res))
    // .then(()=>dispatch(adminActions.login()))
    .then(onResponseRecieved)
    .catch((err) => console.log(err));
  };

  
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin