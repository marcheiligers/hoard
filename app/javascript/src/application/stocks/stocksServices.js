import axios from 'axios';
import baseUrl from '../axiosConfig.js';

export const loadStocks = async () => {
  return await axios.get(`${baseUrl}/stocks`);
};
export const loadStock = async id => {
  return await axios.get(`${baseUrl}/stocks/${id}`);
};
export const addStock = async symbol => {
  const result = await axios.post(`${baseUrl}/stocks`, { symbol: symbol });
  return result;
};
export const deleteStock = async id => {
  const result = await axios.delete(`${baseUrl}/stocks/${id}`);
  return result;
}