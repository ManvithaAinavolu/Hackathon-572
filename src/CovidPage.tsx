import React, { useEffect, useState } from 'react';
import { getResponse, CovidData } from './CovidPages';
import { BrowserRouter as Routes, Route, Link } from 'react-router-dom';
import Deaths from './Deaths';

const countries = [
  'China', 'USA', 'Italy', 'Spain', 'Germany', 'France', 'Iran', 'UK', 
  
  'Colombia', 'Chile', 'Japan', 'South Korea', 'Indonesia'
];

function CovidPage() {
  const [covidData, setCovidData] = useState<CovidData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('China');

  useEffect(() => {
    const Data = async () => {
      const response = await getResponse(selectedCountry);
      setCovidData(response);
    };
    Data();
  }, [selectedCountry]);

 

  return (
    <div className="covid-page">
    <h1 className="title">Covid Data for {covidData?.country}</h1>
    <div className="dropdown-container">
      <label htmlFor="country-select">Select a Country:</label>
      <select id="country-select" value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
        {countries.map((country) => (
          <option>
            {country}
          </option>
        ))}
      </select>
    </div>
    <div className="data-container">
      <p>Total Cases: {covidData?.cases}</p>
      {/* <p>Today's Deaths: {covidData?.todayDeaths}</p>
      <p>Today's Recovered: {covidData?.todayRecovered}</p> */}


    </div>

  </div>
  );
}

export default CovidPage;
