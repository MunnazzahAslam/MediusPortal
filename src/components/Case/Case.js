import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api = axios.create({
  baseURL: `http://18.116.70.71`
})


const User= (props)=> {

  const [data, setData] = useState([]); //table data
  const CaseId = props.match.params.CaseId;
  useEffect(() => {
    api.get("/api/Case/GetUserCase",{
        params: {
          CaseId
        }
      })
      .then(res => {
        setData(res.data)
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="mt-5">
        <h3>{data.id}</h3>
        <h6>User Email: {data.email}</h6>
        <h6>Phone Number: {data.phoneNumber}</h6>
        <h6>CNIC: {data.cnic}</h6>
        <h6>Account status: {data.isActive == true ? "Active" : "Not Active"}</h6>
    </div>
  );
}

export default User;