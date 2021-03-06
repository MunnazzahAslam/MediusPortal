import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt, faUserAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, FormGroup, Image, Popover } from '@themesberg/react-bootstrap';
import { Link } from "react-router-dom";
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

    const rejected = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Rejection Details</Popover.Header>
            <Popover.Body>
                <Form.Control autoFocus required type="text"
                    value=""
                    placeholder="Please right case rejection details"
                    id="desc"
                    disabled as="textarea" rows={3} />
                    <Button variant="primary" type="submit" class="mt-3 ml-10">Send Update</Button>
            </Popover.Body>
        </Popover>
    );


    const published = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Approval Details</Popover.Header>
            <Popover.Body>
                <Form.Control autoFocus required type="text"
                    value=""
                    placeholder="Please right case approval details"
                    id="desc"
                    disabled as="textarea" rows={3} />
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload approval documents</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" type="submit" class="mt-3 ml-10">Send Update</Button>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="mt-5">
            <Container>
                <Row className="justify-content-center form-bg-image">
                    <Col xs={12} className="d-flex align-items-center justify-content-center">
                        <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1300">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                                <Image src={data.imagePath} style={{ width: '200px', height: '150px' }} />

                                <h3 className="mb-0">{data.title}</h3>
                            </div>
                            <Form className="mt-4" noValidate>
                                <Form.Group className="mb-4">
                                    <Form.Label>Case Description</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faAddressBook} />
                                        </InputGroup.Text>
                                        <Form.Control autoFocus required type="text"
                                            value={data.description}
                                            id="desc"
                                            disabled as="textarea" rows={3} />
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
                                <Form.Group className="mb-2">
                                    <Form.Label>Attached Documents</Form.Label>
                                    <InputGroup>
                                        <a href={data.documentPath}><u>{data.title} Document</u></a>
                                    </InputGroup>
                                </Form.Group>
                                <Row>
                                    <Col sm={6} className="mb-3">
                                        <FormGroup className="mb-4">
                                            <Form.Label>Account status</Form.Label>
                                            <Form.Control autoFocus required type="text"
                                                value={data.isActive === true ? "Active" : "Not Active"}
                                                id="status" disabled />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={6} className="mb-3">
                                        <FormGroup className="mb-4">
                                            <Form.Label>Status</Form.Label>
                                            {role == '2' ?
                                                data.status == '0' ?
                                                    <Form.Select aria-label="Send to" value="Sent">
                                                        <option value="0">Sent</option>
                                                        <option value="1">Seen</option>
                                                        <option value="2" disabled>Processed</option>
                                                        <option value="3" disabled>Pending</option>
                                                    </Form.Select>
                                                    :
                                                    data.status == '1' ?
                                                        <Form.Select aria-label="Send to" value="Seen">
                                                            <option value="0" disabled>Sent</option>
                                                            <option value="1">Seen</option>
                                                            <option value="2" >Processed</option>
                                                            <option value="3" disabled>Pending</option>
                                                        </Form.Select>
                                                        :
                                                        data.status == '2' ?
                                                            <Form.Select aria-label="Send to" value="Processed">
                                                                <option value="0" disabled>Sent</option>
                                                                <option value="1" disabled>Seen</option>
                                                                <option value="2" >Processed</option>
                                                                <option value="3" disabled>Pending</option>
                                                            </Form.Select>
                                                            :
                                                            <Form.Select aria-label="Send to" value="Pending">
                                                                <option value="0" disabled>Sent</option>
                                                                <option value="1" disabled>Seen</option>
                                                                <option value="2" disabled>Processed</option>
                                                                <option value="3">Pending</option>
                                                            </Form.Select>
                                                :
                                                <Form.Select aria-label="Send to">
                                                    <option value="4" onClick={rejected}>Rejected</option>
                                                    <option value="5" onClick={published}>Published</option>
                                                </Form.Select>
                                            }
                                        </FormGroup>
                                    </Col>
                                </Row>
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