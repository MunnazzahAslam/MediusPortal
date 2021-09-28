import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard,  faClosedCaptioning, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { updateUser } from "../actions/authActions";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import ProfileCover from "../assets/img/profile-cover.jpg";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      cnic: "",
      phoneNumber: "",
      picture: ""
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
    console.log(updateUser);
  };

  delete = e => {
    e.preventDefault();
    this.props.archiveUser(this.props.history);
  }

  onSubmit = e => {
    e.preventDefault();
    const updateUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      cnic: this.state.cnic,
      phoneNumber: this.state.phoneNumber,
    };
    this.props.updateUser(updateUser, this.props.history);
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
                    <Card.Img src={Profile3} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
                    <Card.Title>Munnazzah Aslam</Card.Title>
                    <Card.Subtitle className="fw-normal">Sub Admin</Card.Subtitle>
                    <Card.Text className="text-gray mb-4">Karachi, Pakistan</Card.Text>

                    <Button variant="primary" size="sm" className="me-2">
                      <FontAwesomeIcon icon={faClosedCaptioning} className="me-1" onClick={this.delete}/>Delete Account
                    </Button>
                    <Button variant="secondary" size="sm">Send Notification</Button>
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
                        <Form.Control required type="text" placeholder="Munnazzah" autoFocus required type="text" placeholder="Munnazzah" onChange={this.onChange}
                          value={this.state.firstName}
                          id="firstName" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder="Aslam" autoFocus required type="text" placeholder="Aslam" onChange={this.onChange}
                          value={this.state.lastName}
                          id="lastName" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="aslammunnazzah@gmail.com" autoFocus required type="email" placeholder="example@company.com" onChange={this.onChange}
                          value={this.state.email}
                          id="email" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control required type="number" placeholder="+923124449588" autoFocus required type="integer" placeholder="03002178894" onChange={this.onChange}
                          value={this.state.phoneNumber}
                          id="phoneNumber" />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>CNIC</Form.Label>
                        <Form.Control required type="number" placeholder="4210103404581" autoFocus required type="text" placeholder="4210103404580" onChange={this.onChange}
                          value={this.state.cnic}
                          id="cnic" />
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
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { updateUser }
)(withRouter(Settings));
