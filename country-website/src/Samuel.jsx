import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import { FaSailboat } from 'react-icons/fa6';
import { GiBread, GiCookingPot } from 'react-icons/gi';
import { FaTruck } from 'react-icons/fa';
import samuelPhoto from "./assets/samuel.png";

function Samuel() {
  return (
    <Container className="personal-page py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4">Samuel Dahn</h1>
          <div className="text-center mb-4">
            <img src={samuelPhoto} alt="Arvid Malm" className="rounded-circle img-fluid personal-image" />
          </div>
          <p className="lead text-center">
            Salior, cooking genius, and aspiring supply chain expert pursuing a master's in Industrial Engineering and Management.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Header as="h2" className="custom-card-header">Background</Card.Header>
            <Card.Body>
              <p>Samuel is currently pursuing his master's degree in Industrial Engineering and Management, specializing in Supply Chain Management. His exceptional analytical abilities, coupled with a meticulous approach, enable him to optimize processes and enhance efficiency in complex logistical systems.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header as="h2" className="custom-card-header">Interests</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item><FaSailboat className="me-2" /> Sailing</ListGroup.Item>
                <ListGroup.Item><GiCookingPot className="me-2" /> Cooking</ListGroup.Item>
                <ListGroup.Item><GiBread className="me-2" /> Baking</ListGroup.Item>
                <ListGroup.Item><FaTruck className="me-2" /> Logistics</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm">
            <Card.Header as="h2" className="custom-card-header">Courses</Card.Header>
            <Card.Body>
              <Row xs={1} md={2} lg={3}>
                {['Innovation Management', 'Business Strategy', 'Data Analytics', 'Project Management', 'Entrepreneurship', 'Supply Chain Optimization'].map((course, index) => (
                  <Col key={index} className="mb-3">
                    <Badge className="course-item">{course}</Badge>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header as="h2" className="custom-card-header">Reference Work</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>Innovative Business Model Canvas</h5>
                  <p>Developed a novel approach to business model design, integrating sustainability and digital transformation aspects.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>AI in Supply Chain Management</h5>
                  <p>Researched and presented on the applications of artificial intelligence in optimizing supply chain operations.</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>Music Industry Disruption Analysis</h5>
                  <p>Conducted a comprehensive analysis of how technology is reshaping the music industry, drawing from personal songwriting experience.</p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Samuel;
