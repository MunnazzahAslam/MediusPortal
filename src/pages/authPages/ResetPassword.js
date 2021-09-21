import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token'),
      password: "",
      confirmPassword: "",
      errors: {}
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
    const userData = {
      token: this.state.token,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.resetPassword(userData, this.props.history);// since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
      <main>
        <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <Row className="justify-content-center">
              <p className="text-center">
                <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
                </Card.Link>
              </p>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3 className="mb-4">Reset password</h3>
                  <Form noValidate onSubmit={this.onSubmit}>
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
                    <Form.Group id="confirmPassword" className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Confirm Password" onChange={this.onChange}
                          value={this.state.confirmPassword}
                          error={errors.confirmPassword}
                          id="confirmPassword" />
                      </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Reset password
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
ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { resetPassword }
)(ResetPassword);
