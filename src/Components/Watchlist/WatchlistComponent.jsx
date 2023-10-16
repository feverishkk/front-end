import React, { useEffect, useState } from 'react'

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';

import { createWatchlist, getWatchlist, getWatchlistName } from '../../Services/WatchlistService'

import axios from 'axios';
import '../../App.css'

const WatchlistComponent = () => {
  const userId = sessionStorage.getItem("user_id");

  const [watchlistName, setWatchlistName] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [symbolInfo, setSymbolInfo] = useState([]);

  const [createWatchlistName, setCreateWatchlistNmae] = useState('');

  let dataLength = useState(0);

  useEffect(() => {
    getWatchlistName(userId).then((response) => {
      setWatchlistName(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  async function stockInfo(symobl, time) {

    var options = {
      method: 'GET',
      url: 'https://twelve-data1.p.rapidapi.com/quote',
      params: {
        symbol: symobl,
        interval: time,
        outputsize: '30',
        format: 'json'
      },
      headers: {
        'X-RapidAPI-Key': 'c1b44bd912msh2f07e988adef1aap16ae60jsnac03fd75789e',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    setResponseData(response.data);

    setSymbolInfo(responseData => [...responseData, response.data]);
    console.log(symbolInfo);
  }

  function getWishlistInfo(e) {
    const wishlistName = e.target.value;
    const wishlistDTO = { userId, wishlistName };

    getWatchlist(wishlistDTO).then((response) => {
      setSelectedList(response.data);
      dataLength = response.data.length;
      console.log(dataLength);

      for (let i = 0; i < dataLength; i++) {
        stockInfo(response.data[i], '1month');
      }
    })
  }

  function handleCreateWishlist(e) {
    e.preventDefault();
    const wishlistDTO = { userId, createWatchlistName };
    createWatchlist(wishlistDTO).then((response) => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })

  }

  let dialogInstance;

  const [status, setStatus] = React.useState({ hideDialog: false });

  function onOverlayClick() {
    setStatus({ hideDialog: false });
  }
  function dialogClose() {
    setStatus({ hideDialog: false });
  }
  function handleClick() {
    setStatus({ hideDialog: true });
  }

  return (
    <>
      <br /> <br />
      <div className='col-6 offset-2'>
        <div className='row'>
          <DropDownListComponent dataSource={watchlistName} id="ddlelement" placeholder='select your watchlist'
            onChange={(e) => getWishlistInfo(e)} />

          <div className="row offset-10" style={{ width: "200px" }} id='dialog-target' >

            <button className='e-control e-btn' id='targetButton1' role='button' onClick={handleClick.bind(this)}>Create Watchlist</button>

            <div style={{ height: '150px' }}>

              <DialogComponent width='600px' isModal={true} target='#dialog-target' visible={status.hideDialog}
                close={dialogClose} overlayClick={onOverlayClick}>

                <div className="textboxes">
                  <h4>Add Watchlist</h4>
                  <TextBoxComponent placeholder="Enter Watchlist Name" value={createWatchlistName}
                    onChange={(e) => setCreateWatchlistNmae(e.target.value)}
                    name='createWatchlistName' type='text' floatLabelType="Auto" />
                </div>

                <button className='btn btn-primary' onClick={(e) => handleCreateWishlist(e)} style={{ width: '100px' }} > Submit </button>
              </DialogComponent>

            </div>

          </div>
        </div>

      </div>

      <div className='col-4 offset-2'>
        <h5> My Wishlist </h5>

        <table className="table table-striped table-dark" >
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Name</th>
              <th scope="col">Exchange</th>
              <th scope="col">Open</th>
              <th scope="col">Close</th>
              <th scope="col">High</th>
              <th scope="col-2">52 Wk High</th>
              <th scope="col-4">52 Wk Low</th>
            </tr>
          </thead>
          <tbody>
            {
              selectedList == null
                ?
                " "
                :
                symbolInfo.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{item.symbol}</td>
                      <td>{item.name}</td>
                      <td>{item.exchange}</td>
                      <td>{item.open}</td>
                      <td>{item.close}</td>
                      <td>{item.high}</td>
                      <td>{item.fifty_two_week.high}</td>
                      <td>{item.fifty_two_week.low}</td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>

    </>

  )

}

export default WatchlistComponent