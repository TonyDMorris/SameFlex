import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
const ErrorView = ({ location }) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h1>
                {location && location.state && location.state.msg
                  ? location.state.msg
                  : "404 page not found"}
              </h1>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorView;
