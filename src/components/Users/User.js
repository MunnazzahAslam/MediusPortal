import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api = axios.create({
  baseURL: `http://18.116.70.71/api`
})


const User= (props)=> {

  const [data, setData] = useState([]); //table data
  const id = props.match.params.id;
  useEffect(() => {
    api.get("/Account/GetById",{
        params: {
          id
        }
      })
      .then(res => {
        setData(res.data)
        console.log(res)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  return (
    <div className="mt-5">
        <h3>{data.title}</h3>
        <h6>Case Description: {data.description}</h6>
        <h6>Mode of Registration: {data.modeofRegistration==1? "Normal" : "Fast"}</h6>
        <h6>Attached Documents: <a href={data.documentPath}>Document</a></h6>
        <h6>Attached Images: <a href={data.imagePath}>Image</a></h6>
        <h6>Account status: {data.isActive == true ? "Active" : "Not Active"}</h6>
    </div>
  );
}

export default User;