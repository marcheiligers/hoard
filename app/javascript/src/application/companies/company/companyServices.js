import axios from 'axios';
import baseUrl from '../../axiosConfig.js';

export const loadCompany = async symbol => {
  return await axios.get(`${baseUrl}/companies/${symbol}`);
};
