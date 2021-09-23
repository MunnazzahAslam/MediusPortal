
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import axios from 'axios'

export default (props) => {
  const [notifications, setNotifications] = "";
  const id = localStorage.getItem('id');
  const api = axios.create({
    baseURL: `http://18.116.70.71`
  })
  useEffect(() => {
    api.get("api​/Notification​/GetById​", {
      params: {
        id
      }
    })
      .then(res => {
        setNotifications(res.notifications)
        console.log(notifications)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const role = localStorage.getItem('role');

  const Notification = (props) => {

    return (
      <>
        {notifications ?
          <ListGroup.Item action className="border-bottom border-light">
            <Row className="align-items-center">
              <Col className="col-auto">
                <Image src={Profile3} className="user-avatar lg-avatar rounded-circle" />
              </Col>
              <Col className="ps-0 ms--2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="h6 mb-0 text-small">{notifications.title}</h4>
                  </div>
                  <div className="text-end">
                    <small>{notifications.createdAt}</small>
                  </div>
                </div>
                <p className="font-small mt-1 mb-0">{notifications.description}</p>
              </Col>
            </Row>
          </ListGroup.Item> : ""
        }
      </>
    );
  };

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-1 pb-0">
      <Container className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">
            <Dropdown as={Nav.Item} >
              <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faBell} className="bell-shake" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-xl dropdown-menu-center mt-2 py-0">
                <ListGroup className="list-group-flush">
                  <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                    Notifications
                  </Nav.Link>

                  {notifications ? notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />) : ''}

                  <Dropdown.Item className="text-center text-primary fw-bold py-3">
                    View all
                  </Dropdown.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile3} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{role == '0' ? "Admin" : "Sub Admin"}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
