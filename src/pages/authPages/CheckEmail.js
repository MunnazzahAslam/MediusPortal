
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Image, Button, Container } from '@themesberg/react-bootstrap';

import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import NotFoundImage from "../../assets/img/illustrations/invite.svg";


export default () => {
  return (
    <main>
      <section className="vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <Row>
            <Col xs={12} className="mt-lg-7 text-center d-flex align-items-center justify-content-center">
              <div>
                <div>
                  <h1 className="text-primary mt-5">
                    A sub admin invite has been sent<span className="fw-bolder"></span>
                  </h1>
                  <Button as={Link} variant="primary" className="animate-hover" to={Routes.DashboardOverview.path}>
                    <FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" />
                    Invite another sub-admin
                  </Button>
                </div>
                <Card.Link as={Link} to={Routes.DashboardOverview.path}>
                  <Image src={NotFoundImage} className="img-fluid w-40 h-40" />
                </Card.Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
