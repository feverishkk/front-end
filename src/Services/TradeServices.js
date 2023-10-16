import axios from "axios";


const Trade_REST_API_BASE_URL = 'http://localhost:8080/api/trade';

export const getUserOwnedStocksList = (userId) => axios.post(Trade_REST_API_BASE_URL + '/user-stocks' , userId);

export const buyStock = (tradeDTO) => axios.post(Trade_REST_API_BASE_URL+ '/buy', tradeDTO)

export const sellStock = (tradeDTO) => axios.post(Trade_REST_API_BASE_URL+ '/sell', tradeDTO)