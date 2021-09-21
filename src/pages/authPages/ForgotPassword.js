import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/authActions";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      mode: "email",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard/overview"); // push user to dashboard when they login
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
      mode: this.state.mode
    };
    this.props.forgotPassword(userData, this.props.history);// since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
      <main>
        <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
          <Container>
            <Row className="justify-content-center">
              <p className="text-center">
                <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
                </Card.Link>
              </p>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3>Forgot your password?</h3>
                  <p className="mb-4">Don't fret! Just type in your email and we will send you a code to reset your password!</p>
                  <Form noValidate onSubmit={this.onSubmit}>
                    <div className="mb-4">
                      <Form.Label htmlFor="email">Your Email</Form.Label>
                      <InputGroup id="email">
                        <Form.Control required autoFocus type="email" placeholder="john@company.com" 
                         onChange={this.onChange}
                         value={this.state.email}
                         error={errors.email}
                         id="email"/>
                      </InputGroup>
                    </div>
                    <Button variant="primary" type="submit" className="w-100">
                      Recover password
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
ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPassword);
