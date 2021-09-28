import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faUserAlt, faAddressBook} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: true,
      role: 2,
      cnic: "",
      phoneNumber: "",
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
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
      confirmPassword: this.state.confirmPassword,
      acceptTerms: this.state.acceptTerms,
      cnic: this.state.cnic,
      role: this.state.role
    };
    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);
  };

  render() {
    const { errors } = "Please enter correct information";
    return (
      <main>
        <section className="d-flex align-items-center my-5 mb-lg-5">
          <Container>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Create a Sub Admin Account</h3>
                  </div>
                  <Form className="mt-4" noValidate onSubmit={this.onSubmit}>
                  <Form.Group id="firstName" className="mb-4">
                      <Form.Label>Sub Admin's First Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUserAlt} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="text" placeholder="Munnazzah" onChange={this.onChange}
                          value={this.state.firstName}
                          id="firstName" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="lastName" className="mb-4">
                      <Form.Label>Sub Admin's Last Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUserAlt} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="text" placeholder="Aslam" onChange={this.onChange}
                          value={this.state.lastName}
                          id="lastName" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Sub Admin's Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="email" placeholder="example@company.com" onChange={this.onChange}
                          value={this.state.email}
                          id="email" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="phoneNumber" className="mb-4">
                      <Form.Label>Sub Admin's Phone Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faAddressBook} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="integer" placeholder="03002178894" onChange={this.onChange}
                          value={this.state.phoneNumber}
                          id="phoneNumber" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="cnic" className="mb-4">
                      <Form.Label>Sub Admin's CNIC</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faAddressBook} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="text" placeholder="4210103404580" onChange={this.onChange}
                          value={this.state.cnic}
                          id="cnic" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Sub Admin's Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" onChange={this.onChange}
                          value={this.state.password}
                          id="password" />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Confirm Password" onChange={this.onChange}
                          value={this.state.confirmPassword}
                          id="confirmPassword" />
                      </InputGroup>
                    </Form.Group>
                    <FormCheck type="checkbox" className="d-flex mb-4">
                      <FormCheck.Input required id="terms" className="me-2" />
                      <FormCheck.Label htmlFor="terms">
                        I and {this.state.firstName} agree to the <Card.Link>terms and conditions</Card.Link>
                      </FormCheck.Label>
                    </FormCheck>

                    <Button variant="primary" type="submit" className="w-100">
                      Invite Now!
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));