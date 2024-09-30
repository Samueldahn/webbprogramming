import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Image } from 'react-bootstrap';



function Countryfinder(props) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [countryIds, setCountryIds] = useState([]);
  const [countryProbs, setCountryProbs] = useState([]);
  const [countriesInfo, setCountriesInfo] = useState([]);





  const handleSubmit = (event) => {
    event.preventDefault();
    setCountryIds([]);
    setCountryProbs([]);
    setCountriesInfo([]);


    setSubmitted(true);

    fetchCountryIdsAndProbs();

  }

  useEffect(() => {
    if (countryIds.length > 0) {
      countryIds.forEach((id) => {
        fetchCountryInfo(id);
      });
    }
  }, [countryIds]);

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);

  }

  function printResults() {
    if(!submitted){
      return(
        <div></div>
      );
    }


    return (
      <Container className="py-5">
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Your Origin</h2>
          </Col>
        </Row>
  
        <Row>
          {countriesInfo.map((country, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Header as="h2" className="custom-card-header">{country.name}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Official Name:</strong> {country.officialName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Capital:</strong> {country.capital}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Population:</strong> {country.population}
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

  function fetchCountryIdsAndProbs() {
    fetch(`https://api.nationalize.io/?name=${name}`)
      .then((response) => response.json())
      .then((jsonOutput) => {
        // Check if the "country" key exists and is an array
        if (jsonOutput.country && Array.isArray(jsonOutput.country)) {
          // Extract country_id values
          const countryIdsArray = jsonOutput.country.map((item) => item.country_id);
          setCountryIds(countryIdsArray);
          const countryProbsArray = jsonOutput.country.map((item) => item.probability);
          setCountryProbs(countryProbsArray);
        } else {
          console.log("No country data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  }

  function fetchCountryInfo(id) {
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((response) => response.json())
      .then((jsonOutput) => {
        // Check if the "country" key exists and is an array
        if (jsonOutput && jsonOutput[0] && jsonOutput[0].name) {
          const countryData = {
            name: jsonOutput[0].name.common,
            officialName: jsonOutput[0].name.official,
            capital: jsonOutput[0].capital ? jsonOutput[0].capital[0] : 'N/A',
            population: jsonOutput[0].population,
            region: jsonOutput[0].region,
            flag: jsonOutput[0].flags.png,
          };
          setCountriesInfo((prev) => [...prev, countryData]);
        } else {
          console.log("No country data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
      });
  }
  
  
  return (
    <div className="country-finder">
      <h1 className="page-title text-center mb-3">Country Finder</h1>
      <div className="card h-100 shadow m-5">
          <div className="card-body">
            <p className="card-text">
            Enter your name to find out which countries it's most common in. After searching, you'll see details like the country's name, capital, population, region, and flag. It’s a quick way to explore the origins and popularity of your name worldwide!</p>
          </div>
      </div>
      <h2 className="text-center fs-20">Input your name</h2>

      <form noValidate onSubmit={handleSubmit}>
        <input required type="text" id="nameInput" placeholder="Name" onChange={handleChange}></input>

        <input className="m-4 btn btn-primary" id="submit-name" type="submit" value="Search"></input>
      </form>

      <div>{printResults()}</div>

    </div>
  );
}
export default Countryfinder;