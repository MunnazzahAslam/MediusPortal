import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AuthenticateUserpasswordResetCode } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

class passwordResetCode extends Component {
  constructor() {
    super();
    this.state = {
      passwordResetCode: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      code: this.state.passwordResetCode
    };
    localStorage.setItem('token',userData.code);
    this.props.AuthenticateUserpasswordResetCode(userData.code, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {

    return (
      <main>
        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
          <Container>
            <p className="text-center">
              <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
              </Card.Link>
            </p>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
              <Col xs={12} className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h3 className="mb-0">One last step!</h3>
                  </div>
                  <Form className="mt-4" noValidate onSubmit={this.onSubmit}>
                    <Form.Group>
                      <Form.Group id="passwordResetCode" className="mb-4">
                        <Form.Label>Please enter the password reset code sent to your entered email.</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control required type="passwordResetCode" placeholder="809812" onChange={this.onChange}
                            value={this.state.code}
                            id="passwordResetCode" />
                        </InputGroup>
                      </Form.Group>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Card.Link className="small text-end">Resend password reset code?</Card.Link>
                      </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Verify password reset code
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
passwordResetCode.propTypes = {
  AuthenticateUserpasswordResetCode: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { AuthenticateUserpasswordResetCode }
)(withRouter(passwordResetCode));
