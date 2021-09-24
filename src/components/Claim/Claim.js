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
    baseURL: `http://localhost:43108/Api`
})


function AllClaim() {

    var columns = [
        {
            title: "CLAIM #", field: "id", hidden: false, filterPlaceholder: '1', editable: 'never',
            render: rowData =>
                <Link to={`/Claim/${rowData.id}`}>
                    <p style={{ color: '#05a677', fontWeight: 'bold' }}>{rowData.id}</p>
                </Link>
        },
        {
            title: "DESCRIPTION", field: "description", hidden: false, filterPlaceholder: 'Claim related to...', editable: 'never', cellStyle: {
                textAlign: 'left'
            },
            render: rowData =>
                <p>{rowData.description}</p>

        },
        {
            title: "ACTIVE", field: "isActive", editable: 'never', filterPlaceholder: 'Active',
            lookup: { true: 'Yes', false: 'No' },
            cellStyle: {
                fontSize: '1rem'
            }
        },
        {
            title: "CREATION DATE", field: "createdAt", editable: 'never', filterPlaceholder: '14-08-2021', cellStyle: {
                whiteSpace: 'nowrap', textAlign: 'left'
            },
            render: rowData =>
                <p style={{ color: '#4a5073', display: 'flex' }}>{dateFormat(rowData.createdAt, "dd-mm-yyyy")}</p>

        },
        {
            title: "LAST MODIFIED DATE", field: "modifiedAt", editable: 'never', filterPlaceholder: '14-08-2021', cellStyle: {
                whiteSpace: 'nowrap', textAlign: 'left'
            },
            render: rowData =>
                <p style={{ color: '#4a5073', display: 'flex' }}>{dateFormat(rowData.modifiedAt, "dd-mm-yyyy")}</p>

        },
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        api.get("/Claim/GetAll")
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    return (
        <div>
            <div><h3 className="mt-lg-4" style={{ color: '#262B40' }}>Intellectual Property Claim's Details</h3>
                <p style={{ color: '#4a5073' }}>All the Intellectual Property Claims are listed below and you can add, edit, or delete Intellectual Property Claim.</p></div>
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
                        title="Claim Details"
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

export default AllClaim;