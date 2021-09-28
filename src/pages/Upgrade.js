import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@themesberg/react-bootstrap';
import { Routes } from "../routes";

export default () => {
    return (
        <>
            <h1 className="text-center fw-bolder mt-lg-8">Welcome to Medius<FontAwesomeIcon icon={faRocket} className="ms-1" /></h1>
            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <p className="text-center lead mb-lg-5 mb-4">Login to your account to get access to the admin dashboard.</p>
            </Card.Link>
        </>
    );
};
