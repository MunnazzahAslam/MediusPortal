import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NotificationsUser } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt, faUserAlt, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, FormGroup } from '@themesberg/react-bootstrap';
import BgImage from "../../assets/img/illustrations/signin.svg";
import { Link } from "react-router-dom";
import {Routes} from '../../routes';

class Notifications extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            subject: "",
            description: "",
            role: 1
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
            title: this.state.title,
            subject: this.state.subject,
            description: this.state.description,
            role: this.state.role == 'User' ? 1 : 2
        };
        this.props.NotificationsUser(newUser, this.props.history);
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
                                        <h3 className="mb-0">Send Notifications</h3>
                                    </div>
                                    <Form className="mt-4" noValidate onSubmit={this.onSubmit}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Title</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUserAlt} />
                                                </InputGroup.Text>
                                                <Form.Control autoFocus required type="text" placeholder="User Account" onChange={this.onChange}
                                                    value={this.state.title}
                                                    id="title" />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Subject</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </InputGroup.Text>
                                                <Form.Control autoFocus required type="text" placeholder="Related to User Account" onChange={this.onChange}
                                                    value={this.state.subject}
                                                    id="subject" />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Description</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUserAlt} />
                                                </InputGroup.Text>
                                                <Form.Control autoFocus required type="text" placeholder="User Account is on hold" onChange={this.onChange}
                                                    value={this.state.description}
                                                    id="description" />
                                            </InputGroup>
                                        </Form.Group>
                                        <FormGroup>
                                        <Form.Label>Send to</Form.Label>
                                            <Form.Select aria-label="Send to">
                                                <option value="1">User</option>
                                                <option value="2">Sub Admin</option>
                                            </Form.Select>
                                        </FormGroup>
                                        <br/>
                                        <Button variant="primary" type="submit" class="mt-3 ml-10">Send</Button>
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
Notifications.propTypes = {
    NotificationsUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
    { NotificationsUser }
)(withRouter(Notifications));