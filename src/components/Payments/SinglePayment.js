import React, { useState, useEffect } from 'react';

import axios from 'axios'

const api = axios.create({
  baseURL: `http://18.116.70.71/api`
})


const SinglePayment= (props)=> {

  const [data, setData] = useState([]); //table data
  const caseId = props.match.params.caseId;
  //for error handling

  useEffect(() => {
    api.get("/Stripe/GetPaymentByCaseId",{
        params: {
          caseId
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
        <h3>Payment Id: {data.id}</h3>
        <h6>User Email: {data.email}</h6>
        <h6>Amount: {data.amount}</h6>
        <h6>Case Status: Active</h6>
    </div>
  );
}

export default SinglePayment;