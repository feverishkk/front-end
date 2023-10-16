import axios from "axios";

const DashBoard_REST_API_BASE_URL = 'http://localhost:8080/api/dashboard';

export const getAllUserStocks = (dashboardDTO) => axios.post(DashBoard_REST_API_BASE_URL + '/user-owned-stocks', dashboardDTO);

export const reChargeUserBalance = (reChargeDTO) => axios.post(DashBoard_REST_API_BASE_URL+'/recharge-user-balance', reChargeDTO);

export const getUserBalance = (balanceDTO) => axios.post(DashBoard_REST_API_BASE_URL+'/get-user-balance', balanceDTO);