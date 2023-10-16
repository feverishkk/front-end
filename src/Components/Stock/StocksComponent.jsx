import React, { useEffect, useState } from 'react';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { getAllUserOwnedStocks, getStockList } from '../../Services/StockServices'
import axios from 'axios';
import { addWatchlistAndStocks, getWatchlistName } from '../../Services/WatchlistService';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Category, Tooltip, Zoom, Crosshair, HiloOpenCloseSeries }
  from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

import { ChipListComponent } from '@syncfusion/ej2-react-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
import '../../App.css'

const StockComponent = () => {

  const userId = sessionStorage.getItem("user_id");

  const [watchlistName, setWatchlistName] = useState([]);
  const [stocklist, setStocklist] = useState([]);
  const [stockName, setStockName] = useState('');
  const [wishlistName, setWishlistName] = useState('');
  const [timeSeriesData, setTimeSeriesData] = useState('');
  const [chartTitle, setChartTitle] = useState('');
  const [userOwendStocks, setUserOwnedStocks] = useState([]);
  const [selectedSymbolName, setSelectedSymbolName] = useState('');

  // 주식 목록들 가져오는 useEffect
  useEffect(() => {
    getStockList().then((response) => {
      setStocklist(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  // 유저의 Watchlist를 가져오는 useEffect
  useEffect(() => {
    getWatchlistName(userId).then((response) => {
      setWatchlistName(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const StockDTO = { userId };
    getAllUserOwnedStocks(StockDTO).then((response) => {
      setUserOwnedStocks(response.data);
      console.log(userOwendStocks);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  // 유저가 눌렀을 때 정보 가져오는 useEffect
  useEffect(() => {
    timeSeries(selectedSymbolName);
  }, [selectedSymbolName])

  async function timeSeries(SelectedSymbol = " ") {
    if (SelectedSymbol == "") {
      SelectedSymbol = 'AAPL';
    }

    const options = {
      method: 'GET',
      url: 'https://apistocks.p.rapidapi.com/daily',
      params: {
        symbol: SelectedSymbol,
        dateStart: '2023-01-01',
        dateEnd: '2023-10-10'
      },
      headers: {
        'X-RapidAPI-Key': 'c1b44bd912msh2f07e988adef1aap16ae60jsnac03fd75789e',
        'X-RapidAPI-Host': 'apistocks.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);

    setChartTitle(response.data.Metadata.Symbol);
    setTimeSeriesData(response.data.Results);
  }


  function itemTemplate(data) {
    return (<span><span >{data.Symbol}</span> &nbsp;&nbsp;&nbsp; <span>{data.companyName}</span></span>);
  }

  const companyName = { value: 'Symbol' };

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

  function handAddStock(e) {
    e.preventDefault();
    const wishlistDTO = { userId, stockName, wishlistName };

    addWatchlistAndStocks(wishlistDTO).then((response) => {
      console.log(response.data);
      console.log(response.status);
    }).catch(error => {
      console.error(error);
    });
  }

  function clickedSymbol(symbolName) {
    timeSeries(symbolName);
  }

  const primaryxAxis = { title: 'Date', valueType: 'Category' };
  const primaryyAxis = { title: 'Price in Dollar', minimum: 100, maximum: 200, interval: 20 };
  const style = { textAlign: "center" };
  const legendSettings = { visible: false };
  const border = { border: { width: 0 } };

  return (
    <>
      <div className='container'>
        <br /> <br />
        <div className='row'>
          <div className='col-md-2 offset-2'>
            {/*  모달 창 : 위시리스트에 주식 추가하기  */}
            <div className="offset" id='dialog-target' >
              <button className='e-control e-btn' id='targetButton1' role='button' onClick={handleClick.bind(this)}>Add Stocks</button>

              <div style={{ height: '200px' }} >

                <DialogComponent width='600px' isModal={true} header='Add Symbol' target='#dialog-target' visible={status.hideDialog}
                  close={dialogClose} overlayClick={onOverlayClick}>

                  {/* 유저의 watchlist출력 */}
                  <DropDownListComponent dataSource={watchlistName} id="ddlelement" placeholder='select your watchlist'
                    onChange={(e) => setWishlistName(e.target.value)} />

                  &nbsp;

                  {/* 유저가 선택한 Symbol이 선택 */}
                  <AutoCompleteComponent dataSource={stocklist} fields={companyName} itemTemplate={itemTemplate}
                    placeholder="Find a Company" onChange={(e) => setStockName(e.target.value)} />

                  <button className='btn btn-primary' onClick={(e) => handAddStock(e)} style={{ width: '100px' }} >
                    Submit
                  </button>

                </DialogComponent>

                <br /> <br />
              </div>
            </div>
          </div>
        </div>

        {/* 고객이 가지고 있는 종목들을 보여준 후 보유하고 있는 종목을 누르면 차트가 바뀐다. */}
        <div className='col-md-2 offset-2'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"> Symbol </th>
                <th scope="col">Quantities</th>
                <th scope="col">Avg_price</th>
              </tr>
            </thead>
            <tbody>
              {
                userOwendStocks.map((info, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        {
                          <ChipListComponent text={info.symbol} onClick={() => clickedSymbol(info.symbol)} > </ChipListComponent>
                        }
                      </td>
                      <td> {info.quantities} </td>
                      <td> {info.avg_price}  </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        {/* 차트 */}
        <div>
          <ChartComponent id='charts' style={style} primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} legendSettings={legendSettings}
            chartArea={border} width={Browser.isDevice ? '100%' : '80%'} title={chartTitle + ' - High Low Open Close Chart'} >

            <Inject services={[HiloOpenCloseSeries, Tooltip, Category, Crosshair, Zoom]} />
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={timeSeriesData} xName='Date' yName='High' type='HiloOpenClose' low='Low' high='High' open='Open' close='Close'>
              </SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>



      </div>

    </>
  )


}

export default StockComponent