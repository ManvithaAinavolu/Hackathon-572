import axios from 'axios';

export interface CovidDeathsData {
  cases: number;
  deaths: number;
  recovered: number;
  country: string;
}

export const getResponseDeaths = async (country: string): Promise<CovidDeathsData> => {
  const res = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
  const data = res.data;
  return {
    cases: data.cases,
    deaths: data.deaths,
    recovered: data.recovered,
    country: data.country,
  };
}
