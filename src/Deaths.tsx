import React,{useEffect,useState} from 'react'
import {getResponseDeaths,CovidDeathsData} from './DeathsService'
import { Link,Route,Routes } from 'react-router-dom';
function Deaths() {
    const countries = [
       'India','SriLanka','Bangladesh','China','Nepal'
      ];
      
      const [covidData, setCovidData] = useState<CovidDeathsData | null>(null);
      const [selectedCountry, setSelectedCountry] = useState<string>('China');
    
      useEffect(() => {
        const Data = async () => {
          const response = await getResponseDeaths(selectedCountry);
          setCovidData(response);
        };
        Data();
      }, [selectedCountry]);
  return (
    <div>
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
      <table>
        <thead>
        <th>Country</th>
        <th>Total Cases</th>
        <th>Recoveries</th>
        <th>Deaths</th>
        </thead>
        <tbody>
            {covidData&&(
             
            <tr>
                <td>{covidData.country}</td>
                <td>{covidData.cases}</td>
                <td>{covidData.deaths}</td>
                <td>{covidData.recovered}</td>
                </tr>

            )}
           

        </tbody>
      </table>
     
    </div>
    
  </div>
    </div>
  )
}

export default Deaths
