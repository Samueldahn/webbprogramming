import { Container, Row, Col, Card, ListGroup, Image } from 'react-bootstrap';


function Countryoutput(props) {
    if(!props.submitted){
      return(
        <div></div>
      );
    }else if(props.countryIds.length < 5){
      return(
      <Container className="py-5">
        <div className="card h-100 shadow mb-5 bg-danger bg-gradient">
            <div className="card-body ">
              <p className="card-text"> <strong>Oops! We couldn't retrieve the information you requested. </strong> This may be due to a limit on the number of requests allowed from the Nationalize API, which is capped at 100 fetches a day. Please try again later or check your input. Thank you for your understanding!</p>
            </div>
        </div>
      </Container>
      )
    }


    return (
      <Container className="py-5">
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Your Origin</h2>
          </Col>
        </Row>
  
        <Row>
          {props.countriesInfo.map((country, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Header as="h2" className="custom-card-header">{country.name}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Official Name:</strong> {country.officialName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <strong>Probability of origin:</strong> {(props.countryProbs[index] * 100).toFixed(2)}%
                  </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Capital:</strong> {country.capital}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Population:</strong> {formatPopulation(country.population)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Region:</strong> {country.region}
                    </ListGroup.Item>
                  </ListGroup>
                  <Image src={country.flag} alt={`Flag of ${country.name}`} fluid className="mt-3" />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );

  }

  export default Countryoutput;