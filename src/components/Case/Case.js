import React, { useState, useEffect } from 'react';
import axios from 'axios'

const api = axios.create({
    baseURL: `http://18.116.70.71`
})


const User = (props) => {

    const [data, setData] = useState([]); //table data
    const CaseId = props.match.params.CaseId;
    useEffect(() => {
        api.get("/api/Case/GetUserCase", {
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
            <h3 className="mb-5">{data.title}</h3>
            <h6 className="mb-3">Case Description: {data.description}</h6>
            <h6 className="mb-3">Mode of Registration: {data.modeofRegistration === 1 ? "Normal" : "Fast"}</h6>
            <h6 className="mb-3">Attached Documents: <a href={data.documentPath}><u>Document</u></a></h6>
            <h6 className="mb-3">Attached Images: <a href={data.imagePath}><u>Image</u></a></h6>
            <h6 className="mb-3">Account status: {data.isActive === true ? "Active" : "Not Active"}</h6>
        </div>
    );
}

export default User;