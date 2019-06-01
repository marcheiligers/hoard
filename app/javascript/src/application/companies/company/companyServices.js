import axios from 'axios';
import baseUrl from '../../axiosConfig.js';

export const loadCompany = async symbol => {
  return await axios.get(`${baseUrl}/companies/${symbol}`);
};

export const loadCompanyChartData = async (symbol, timeRange) => {
  return await axios.get(`${baseUrl}/companies/${symbol}/chart?range=${timeRange}`);
}