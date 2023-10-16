import axios from "axios";

const STOCK_REST_API_BASE_URL = 'http://localhost:8080/api/stock';

export const getStockList = () => axios.get(STOCK_REST_API_BASE_URL + '/list');

export const getAllUserOwnedStocks = (stockDTO) => axios.post(STOCK_REST_API_BASE_URL + '/get-user-owned-stocks', stockDTO);