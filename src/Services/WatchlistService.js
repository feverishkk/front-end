import axios from "axios";

const WATCHLIST_BASE_URL = 'http://localhost:8080/api/watchlist';

export const getWatchlist = (wishlistDTO) => axios.post(WATCHLIST_BASE_URL + '/list', wishlistDTO);

export const createWatchlist = (wistlist) => axios.post(WATCHLIST_BASE_URL + '/create-watchlist', wistlist);

export const addWatchlistAndStocks = (wistlist) => axios.post(WATCHLIST_BASE_URL + '/add-stock', wistlist);

export const getWatchlistName = (userId) => axios.post(WATCHLIST_BASE_URL + '/lists', userId);