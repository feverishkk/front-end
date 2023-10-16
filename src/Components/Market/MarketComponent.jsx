import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const MarketComponent = () => {
  const [stockNews, setStockNews] = useState([]);
  const [cryptoNews, setCryptoNews] = useState([]);

  async function getStockNews() {
    const options = {
      method: 'GET',
      url: 'https://global-stock-market-api-data.p.rapidapi.com/news/stock_market_news/1',
      headers: {
        'X-RapidAPI-Key': 'c1b44bd912msh2f07e988adef1aap16ae60jsnac03fd75789e',
        'X-RapidAPI-Host': 'global-stock-market-api-data.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    setStockNews(response.data);
  }

  async function getCryptoNews() {
    const options = {
      method: 'GET',
      url: 'https://global-stock-market-api-data.p.rapidapi.com/news/cryptocurrency_news/1',
      headers: {
        'X-RapidAPI-Key': 'c1b44bd912msh2f07e988adef1aap16ae60jsnac03fd75789e',
        'X-RapidAPI-Host': 'global-stock-market-api-data.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    setCryptoNews(response.data);
  }

  useEffect(() => {
    getStockNews();
    getCryptoNews();
  }, [])


  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Stock News</h5>
              <div className="scrollable">
                {
                  stockNews.map((news, idx) => {
                    return (
                      <div key={idx}>
                        <div >
                          <a href={news.newsUrl}> {news.newsTitle} </a> <p> - {news.postedBy} {news.postedOn} </p>
                        </div>
                      </div>

                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Crypto News</h5>
              <div className="scrollable">
                {
                  cryptoNews.map((news, idx) => {
                    return (
                      <div key={idx}>
                        <div >
                          <a href={news.newsUrl}> {news.newsTitle} </a> <p> - {news.postedBy} {news.postedOn} </p>
                        </div>
                      </div>

                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketComponent