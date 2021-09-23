import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt, faUserAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, FormGroup } from '@themesberg/react-bootstrap';

const api = axios.create({
    baseURL: `http://18.116.70.71`
})


const User = (props) => {

    const [data, setData] = useState([]); //table data
    const role = localStorage.getItem('role');
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
            <Container>
                <Row className="justify-content-center form-bg-image">
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                        <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1300">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                                <h3 className="mb-0">{data.title}</h3>
                            </div>
                            <Form className="mt-4" noValidate>
                                <Form.Group className="mb-4">
                                    <Form.Label>Case Description</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUserAlt} />
                                        </InputGroup.Text>
                                        <Form.Control autoFocus required type="text"
                                            value={data.description}
                                            id="desc"
                                            disabled />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Mode of Registration</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </InputGroup.Text>
                                        <Form.Control autoFocus required type="text" placeholder="Related to User Account"
                                            value={data.modeofRegistration === 1 ? "Normal" : "Fast"}
                                            id="mode" disabled />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Attached Documents</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUserAlt} />
                                        </InputGroup.Text>
                                        <Form.Control autoFocus required type="text" placeholder="User Account is on hold"
                                            value={data.documentPath} disabled />
                                    </InputGroup>
                                </Form.Group>
                                <FormGroup className="mb-4">
                                    <Form.Label>Attached Images</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faUserAlt} />
                                        </InputGroup.Text>
                                        <Form.Control autoFocus required type="text" placeholder="User Account is on hold"
                                            value={data.imagePath} disabled />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Form.Label>Account status</Form.Label>
                                    <Form.Control autoFocus required type="text"
                                        value={data.isActive === true ? "Active" : "Not Active"}
                                        id="status" disabled />
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Form.Label>Status</Form.Label>
                                    {role == '2' ?
                                        <Form.Select aria-label="Send to">
                                            <option value="0">Sent</option>
                                            <option value="1">Seen</option>
                                            <option value="2">Processed</option>
                                            <option value="3">Pending</option>
                                        </Form.Select> :
                                        <Form.Select aria-label="Send to">
                                            <option value="4">Rejected</option>
                                            <option value="5">Published</option>
                                        </Form.Select>
                                    }
                            </FormGroup>
                            <br />
                            <Button variant="primary" type="submit" class="mt-3 ml-10">Change Status</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        </div >
    );
}

export default User;