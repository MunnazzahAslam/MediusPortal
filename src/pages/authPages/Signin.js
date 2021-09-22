import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sendUserOTP, loginUser } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      let id = localStorage.getItem('id');
      this.props.sendUserOTP(id);
      this.props.history.push("/otp"); // push user to dashboard when they login
    }

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
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
};

  render() {
    const { errors } = this.state;
    return (
      <main>
        <section className="d-flex align-items-center my-5 mb-lg-5">
          <Container>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">Sign in to our platform</h3>
                  </div>
                  <Form className="mt-4" noValidate onSubmit={this.onSubmit}>
                    <Form.Group id="email" className="mb-4">
                      <Form.Label>Your Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control autoFocus required type="email" placeholder="example@company.com" onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email}
                          id="email"
                        />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <Form.Group id="password" className="mb-4">
                        <Form.Label>Your Password</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control required type="password" placeholder="Password" onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password" />
                        </InputGroup>
                      </Form.Group>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check type="checkbox">
                          <FormCheck.Input id="defaultCheck5" className="me-2" />
                          <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                        </Form.Check>
                        <Card.Link className="small text-end" as={Link} to={Routes.ForgotPassword.path}>Forgot password?</Card.Link>
                      </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Sign in
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
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  sendUserOTP: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser, sendUserOTP }
)(Login);