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
    baseURL: 'http://18.116.70.71'
})


function AllFAQs() {

    var columns = [
        {
            title: "FAQ #", field: "id", hidden: false, filterPlaceholder: '1', width: "10%",
            render: rowData =>
                  <p style={{ color: '#05a677', fontWeight: 'bold', width: '2%' }}>{rowData.id}</p>
        },
        {
            title: "QUESTION", field: "question", hidden: false, filterPlaceholder: 'What is Medius?', cellStyle: {
                textAlign: 'left'
            }, width: "30%",
            render: rowData =>
                <p>{rowData.question}</p>

        },
        {
            title: "ANSWER", field: "answer", width: "30%", filterPlaceholder: 'Medius is Intellectual P....',
            cellStyle: {
                textAlign: 'answer',

            },
            render: rowData =>
                <p style={{ color: '#4a5073' }}>{rowData.answer}</p>
        },
        {
            title: "CREATION DATE", field: "createdAt", width: '20%', filterPlaceholder: '14-08-2021', cellStyle: {
                whiteSpace: 'nowrap', textAlign: 'left'
            },
            render: rowData =>
                <p style={{ color: '#4a5073', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{dateFormat(rowData.createdAt, "dd-mm-yyyy")}</p>

        },
        {
            title: "CREATED BY", field: "createdBy", width: '20%', filterPlaceholder: 'Sub Admin', cellStyle: {
                whiteSpace: 'nowrap', textAlign: 'left'
            },
            render: rowData =>
                <p style={{ color: '#4a5073', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sub Admin</p>

        },
        {
            title: "MODIFIED BY", field: "modifiedBy", width: '20%', filterPlaceholder: 'Sub Admin', cellStyle: {
                whiteSpace: 'nowrap', textAlign: 'left'
            },
            render: rowData =>
                <p style={{ color: '#4a5073', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sub Admin</p>

        },
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        api.get("api/FAQ/GetAll")
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (errorList.length < 1) { //no error
            api.post("/api/FAQ/Add", newData)
                .then(res => {
                    let dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    resolve()
                    setErrorMessages([])
                    setIserror(false)
                })
                .catch(error => {
                    setErrorMessages(["Cannot add data. Server error!"])
                })
        } 
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        api.put("/api/FAQ/Update" ,newData)
            .then(res => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve()
                setIserror(false)
                setErrorMessages([])
            })
            .catch(error => {
                setErrorMessages(["Update failed! Server error"])
            }
            )
    }

    const handleRowDelete = (oldData, resolve) => {
        const id= oldData.id
        api.delete("/api/FAQ/Delete",
        {
            params: {
                id
            }
        })
            .then(res => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve()
            })
            .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
                resolve()
            })
    }


    return (
        <div>
            <div><h3 className="mt-lg-4" style={{ color: '#262B40' }}>FAQs Details</h3>
                <p style={{ color: '#4a5073' }}>All the FAQs are listed below and you can add, edit, or delete FAQs.</p></div>
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
                        title="FAQ Details"
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
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);
                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve)
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve)
                                }),
                        }}
                    />
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}

export default AllFAQs;