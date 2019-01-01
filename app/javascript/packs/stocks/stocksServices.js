import axios from "axios";
import baseUrl from "../axiosConfig.js";

export const loadStocks = async () => {
  return await axios.get(`${baseUrl}/stocks`);
};
