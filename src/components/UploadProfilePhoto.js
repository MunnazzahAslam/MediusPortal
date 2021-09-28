import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadProfilePicture } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class UploadProfileComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
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
    const { title, photo } = props;
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">{title}</h5>
          <div className="d-xl-flex align-items-center">
            <div className="user-avatar xl-avatar">
              <Image fluid rounded src={photo} />
            </div>
            <div className="file-field">
              <div className="d-flex justify-content-xl-center ms-xl-3">
                <div className="d-flex">
                  <span className="icon icon-md">
                    <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                  </span>
                  <input type="file" />
                  <div className="d-md-block text-start">
                    <div className="fw-normal text-dark mb-1">Choose Image</div>
                    <div className="text-gray small">JPG, GIF or PNG. Max size of 800K</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };
}
  UploadProfileComponent.propTypes = {
    uploadProfilePicture: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { uploadProfilePicture }
  )(UploadProfileComponent);