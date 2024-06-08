import axios from 'axios';

export interface CovidData {
  cases: number;
  todayDeaths: number;
  todayRecovered: number;
  country: string;
}

export const getResponse = async (country: string): Promise<CovidData> => {
  const res = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`);
  const data = res.data;
  return {
    cases: data.cases,
    todayDeaths: data.todayDeaths,
    todayRecovered: data.todayRecovered,
    country: data.country,
  };
}
