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
import Alert from '@material-ui/lab/Alert';
var dateFormat = require("dateformat");
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `http://18.116.70.71/api`
})


function AllPayments() {

  var columns = [
    {
      title: "CASE NAME", field: "case.title", hidden: false, filterPlaceholder: 'Pizza Logo', editable: 'never', cellStyle: {
         textAlign: 'left'
      }, width: "5%",
      render: rowData =>
        <Link to={`/payment/${rowData.case.id}`}>
          <p style={{ color: '#fa5252', fontWeight: 'bold' }}>{rowData.case.title}</p>
        </Link>
    },
    {
      title: "EMAIL", field: "email", editable: 'never', filterPlaceholder: 'john@gmail.com', cellStyle: {
        textAlign: 'left'
      }, width: "40%",
      render: rowData =>
        <Link to={`/user/${rowData.userId}`}>
          <p style={{ color: '#4a5073' }}>{rowData.email}</p>
        </Link>
    },
    {
      title: "AMOUNT", field: "amount", editable: 'never', filterPlaceholder: '200', cellStyle: {
        
      }, width: "5%",
      render: rowData =>
        <p style={{ color: '#0948B3', fontWeight: 'bold' }}>{rowData.amount}</p>

    },
    {
      title: "PAYMENT DATE", field: "createdAt", editable: 'never', filterPlaceholder: '03-04-2021',  cellStyle: {
        whiteSpace: 'nowrap', textAlign: 'left'
      }, width: "30%",
      render: rowData =>
        <p style={{ color: '#4a5073', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>{dateFormat(rowData.createdAt, "dd-mm-yyyy")}</p>

    },
    {
      title: "MODE", field: "case.modeofRegistration", editable: 'never', filterPlaceholder: 'Fast', lookup: { 1: 'Fast', 2: 'Normal' },
      cellStyle: {
        textAlign: 'left',

      }, width: "20%",
    },
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    api.get("/Stripe/GetAllPaymentDetails")
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  return (
    <div>
      <div><h3 className="mt-lg-4" style={{ color: '#262B40' }}>User Payments</h3>
        <p style={{ color: '#4a5073' }}>All the payment related information is in the below table and you can click on each payment to view details</p></div>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={12}>
          <div>
            {iserror &&
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            }
          </div>
          <MaterialTable
            title="User Payments"
            style={{ font: 'Nunito Sans', fontSize: 'clamp(0.6rem, 1vw, 1rem)', color: '#212529 !important' }}
            columns={columns}
            data={data}
            icons={tableIcons}
            options={{
              filtering: true,
              headerStyle: {
                backgroundColor: '#F5F8FB',
                color: '#262B40',
                padding: '5px',
                paddingLeft: '1rem',
                fontWeight: 'bold',
                fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)'
              },
              filterCellStyle: {
                fontSize: 'clamp(0.6rem, 1vw, 1rem)',
              }, exportButton: {
                csv: true,
                pdf: true
              },
              searchFieldStyle: {
                fontSize: 'clamp(0.6rem, 1vw, 1rem)'
              },
              showTitle: false,
            }}
            components={{
              Toolbar: props => (
                <div style={{ height: '60px' }}>
                  <MTableToolbar {...props} />
                </div>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}

export default AllPayments;