import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Form, Card } from '@themesberg/react-bootstrap';
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import ProfileCover from "../assets/img/profile-cover.jpg";
import { UpdateUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import {Routes} from '../routes';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      cnic: localStorage.getItem('cninc'),
      phoneNumber: localStorage.getItem('phoneNumber'),
      imagePath: localStorage.getItem('imagePath'),
      role: localStorage.getItem('role')
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      cnic: this.state.cnic,
      imagePath: this.state.imagePath
    };
    this.props.UpdateUser(newUser, this.props.history);
  };

  render() {
    return (
      <>
        <Row className="mt-lg-4">
          <Col xs={12} xl={4}>
            <Row>
              <Col xs={12}>
                <Card border="light" className="text-center p-0 mb-4">
                  <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
                  <Card.Body className="pb-5">
                    <Card.Img src={this.state.imagePath} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
                    <Card.Title>{this.state.firstName} {this.state.lastName}</Card.Title>
                    <Card.Subtitle className="fw-normal">{this.state.role==0 ?"Admin":"Sub Admin"}</Card.Subtitle>
                    <Card.Text className="text-gray mb-4">Karachi, Pakistan</Card.Text>

                    <Button variant="primary" size="sm" className="me-2">
                      <FontAwesomeIcon icon={faClosedCaptioning} className="me-1" />Delete Account
                    </Button>
                    <Card.Link className="small text-end" as={Link} to={Routes.Notifications.path}>
                    <Button variant="secondary" size="sm">Send Notification</Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={12} xl={8}>
            <Card border="light" className="bg-white shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-4">My Profile</h5>
                <Form noValidate onSubmit={this.onSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" autoFocus required type="text" placeholder="Munnazzah" onChange={this.onChange}
                          value={this.state.firstName}
                          id="firstName" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" autoFocus required type="text" placeholder="Aslam" onChange={this.onChange}
                          value={this.state.lastName}
                          id="lastName" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="emal">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" autoFocus required type="email" placeholder="example@company.com" onChange={this.onChange}
                          value={this.state.email}
                          id="email" disabled/>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control required type="number" autoFocus required type="integer" placeholder="+923124449588" onChange={this.onChange}
                          value={this.state.phoneNumber}
                          id="phoneNumber" disabled/>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group >
                        <Form.Label>CNIC</Form.Label>
                        <Form.Control required type="number" autoFocus required type="text" placeholder="4210103404580" onChange={this.onChange}
                          value={this.state.cnic}
                          id="cnic" disabled />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="my-4">Address</h5>
                  <Row>
                    <Col sm={9} className="mb-3">
                      <Form.Group >
                        <Form.Label>Address</Form.Label>
                        <Form.Control required type="text" placeholder="Enter your home address" autoFocus required type="text" onChange={this.onChange}
                          value="A-76 Block:16 Ferderal B' Area"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={3} className="mb-3">
                      <Form.Group id="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control required type="text" placeholder="City" value="Karachi" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  </Row>
                  <div className="mt-3">
                    <Button variant="primary" type="submit">Update Now!</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };
}
Settings.propTypes = {
  UpdateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { UpdateUser }
)(withRouter(Settings));