
import React from "react";
import { faCashRegister, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { CounterWidget, CircleChartWidget, BarChartWidget, SalesValueWidget, SalesValueWidgetPhone } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

export default () => {
  return (
    <>
      <Row className="justify-content-md-center mt-lg-4">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Total Profit"
            value="2576"
            percentage={25.76}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Total Profit"
            value="2567"
            percentage={25.67}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Users"
            title="4"
            period="Jul 1  - Aug 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Average Case Price"
            title="PKR 567"
            period="Jul 1  - Aug 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total Cases"
                    value={35}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
