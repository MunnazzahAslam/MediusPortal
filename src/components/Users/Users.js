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

function AllUsers() {

    var columns = [
        {
            title: "USER", field: "username", hidden: false, filterPlaceholder: 'John Doe', editable: 'never', cellStyle: {
                textAlign: 'left'
            }, width: 10,
            render: rowData =>
                <Link to={`/users/${rowData.id}`}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <img src={rowData.imagePath} style={{ color: '#2dce89', marginRight: '0.5rem', width: '2rem', height: '2rem', borderRadius: '50%' }} />
                        <p style={{ color: '#172B4D', fontWeight: 'bold' }}>{rowData.userName}</p>
                    </div>
                </Link>
        },
        {
            title: "EMAIL", field: "caseId", hidden: false, filterPlaceholder: 'john@gmail.com', editable: 'never', cellStyle: {
                textAlign: 'left'
            }, width: 30,
            render: rowData =>
                <p>{rowData.email}</p>
        },
        {
            title: "REGISTRATION DATE", field: "created", editable: 'never', filterPlaceholder: '20-04-2021', cellStyle: {
                whiteSpace: 'nowrap', textAlign: 'left'
            },
            render: rowData =>
                <p style={{ color: '#4a5073' }}>{dateFormat(rowData.createdAt, "dd-mm-yyyy")}</p>

        },
        {
            title: "ROLE", field: "role", editable: 'never', filterPlaceholder: 'Admin',
            cellStyle: {
                fontSize: '1rem'
            },
            lookup: { User: 'User', Admin: 'Admin', SubAdmin: 'Sub Admin' },
            render: rowData =>
                <p style={{ color: rowData.role === 'Admin' ? '#2DCE89' : rowData.role == 'User' ? '#FB6340' : '#007bff', fontWeight: 'bold' }}>{rowData.role}</p>
        },
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        let token = localStorage.getItem('jwtToken');
        axios.get('http://18.116.70.71/api/Account/GetAll', { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    return (
        <div>
            <div><h3 className="mt-lg-4" style={{ color: '#262B40' }}>Users Details</h3>
                <p style={{ color: '#4a5073' }}>All the user related information is in the below table and you can click on each user to view details</p></div>
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
                        title="User Details"
                        style={{ font: 'Nunito Sans', fontSize: 'clamp(0.6rem, 1vw, 1rem)', color: '#212529 !important' }}
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        options={{
                            filtering: true,
                            sorting: true,
                            headerStyle: {
                                backgroundColor: '#F5F8FB',
                                color: '#262B40',
                                padding: '5px',
                                paddingLeft: '1rem',
                                fontWeight: 'bold',
                                fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)'
                            },
                            exportButton: {
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

export default AllUsers;