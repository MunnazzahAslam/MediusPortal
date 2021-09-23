import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt, faUserAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, FormGroup } from '@themesberg/react-bootstrap';

const api = axios.create({
  baseURL: `http://18.116.70.71/api`
})


const User = (props) => {

  const [data, setData] = useState([]); //table data
  const id = props.match.params.id;
  useEffect(() => {
    api.get("/Account/GetById", {
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
      <Container>
        <Row className="justify-content-center form-bg-image">
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-1300">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">{data.userName}</h3>
              </div>
              <Form className="mt-4" noValidate>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <Form.Control autoFocus required type="text"
                      value={data.email}
                      id="mode" disabled />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Phone Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUserAlt} />
                    </InputGroup.Text>
                    <Form.Control autoFocus required type="number"
                      value={data.phoneNumber} disabled />
                  </InputGroup>
                </Form.Group>
                <FormGroup className="mb-4">
                  <Form.Label>Attached Images</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUserAlt} />
                    </InputGroup.Text>
                    <Form.Control autoFocus required type="number"
                      value={data.cnic} disabled />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select>
                    <option value="4">Active</option>
                    <option value="5">Not Active</option>
                  </Form.Select>
                </FormGroup>
                <br />
                <Button variant="primary" type="submit" class="mt-3 ml-10">Change Account Status</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default User;