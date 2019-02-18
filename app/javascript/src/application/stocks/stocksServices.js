import axios from 'axios';
import baseUrl from '../axiosConfig.js';

export const loadStocks = async () => {
  return await axios.get(`${baseUrl}/stocks`);
};
export const loadStock = async id => {
  return await axios.get(`${baseUrl}/stocks/${id}`);
};
export const addStock = async symbol => {
  return await axios.post(`${baseUrl}/stocks`, { symbol: symbol });
};
export const deleteStock = async id => {
  const result = await axios.delete(`${baseUrl}/stocks/${id}`);
  return result;
}
export const updateStock = async stock => {
  const payload = { ...stock }
  delete payload.createdAt;
  const result = await axios.put(`${baseUrl}/stocks/${stock.id}`, payload);
  return result;
}