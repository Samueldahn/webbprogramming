import { useState, useEffect } from 'react';
import Countryoutput from './Countryoutput';

function Countryfinder() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [countryIds, setCountryIds] = useState([]);
  const [countryProbs, setCountryProbs] = useState([]);
  const [countriesInfo, setCountriesInfo] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = (event) => {
    event.preventDefault();

    setCountryIds([]);
    setCountryProbs([]);
    setCountriesInfo([]);
    setSubmitted(true);
    setLoading(true);

    fetchCountryIdsAndProbs();
  };

  useEffect(() => {
    if (countryIds.length > 0) {
      Promise.all(countryIds.map((id) => fetchCountryInfo(id)))
        .then(() => setLoading(false)) 
        .catch(() => setLoading(false));
    }
  }, [countryIds]);

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  function fetchCountryIdsAndProbs() {
    fetch(`https://api.nationalize.io/?name=${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`error code ` + response.status);
          }
        return response.json();
    })
      .then((jsonOutput) => {
        if (jsonOutput.country && Array.isArray(jsonOutput.country)) {
          const countryIdsArray = jsonOutput.country.map((item) => item.country_id);
          setCountryIds(countryIdsArray);
          const countryProbsArray = jsonOutput.country.map((item) => item.probability);
          setCountryProbs(countryProbsArray);
        } else {
          console.log("No country data found");
          setLoading(false); 
        }
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
        setLoading(false);
      });
  }

  function fetchCountryInfo(id) {
    return fetch(`https://restcountries.com/v3.1/alpha/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`error code ` + response.status);
        }
      return response.json();
    })
      .then((jsonOutput) => {
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
            Enter your last name to find out which countries it's most common in. After searching, you'll see details like the country's name, capital, population, region, and flag. It’s a quick way to explore the origins and popularity of your last name worldwide!
          </p>
        </div>
      </div>
      <h2 className="text-center fs-20">Input your last name</h2>

      <form noValidate onSubmit={handleSubmit} className="mb-2">
        <input required type="text" id="nameInput" placeholder="Name" onChange={handleChange} />
        <input className="m-4 btn btn-primary" id="submit-name" type="submit" value="Search" />
      </form>

      <Countryoutput 
        submitted={submitted} 
        loading={loading} 
        countryIds={countryIds} 
        countryProbs={countryProbs} 
        countriesInfo={countriesInfo} 
      />
    </div>
  );
}

export default Countryfinder;
