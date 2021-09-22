import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'
import MaterialTable, { MTableToolbar } from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
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
        console.log("Error")
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