import React, { useEffect, useState } from 'react'
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { buyStock, getUserOwnedStocksList, sellStock } from '../../Services/TradeServices';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { AutoCompleteComponent } from '@syncfusion/ej2-react-dropdowns';
import { getStockList } from '../../Services/StockServices';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';

import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Category, Tooltip, Zoom, Crosshair, CandleSeries } from '@syncfusion/ej2-react-charts';

import axios from 'axios';

const TradeComponent = () => {

  const [stocklist, setStocklist] = useState([]);
  const [stockName, setStockName] = useState('');
  const [onwedList, setOnwedList] = useState([]);
  const [quantities, setQuantities] = useState(0);
  const [stockPrice, setStockPrice] = useState(0);
  const [buyOrSell, setBuyOrSell] = useState(true);
  // True면  Buy
  // False면 Sell
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [chartTitle, setChartTitle] = useState('');

  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const userOwnedStockList = { userId };
    getUserOwnedStocksList(userOwnedStockList).then((response) => {
      setOnwedList(response.data);
    }).catch(error => {
      console.error(error);
    })
  }, []);

  useEffect(() => {
    getStockList().then((response) => {
      setStocklist(response.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  // 유저가 눌렀을 때 정보 가져오는 useEffect
  useEffect(() => {
    timeSeries(stockName);
  }, [stockName])

  async function timeSeries(SelectedSymbol = 'AAPL') {

    const options = {
      method: 'GET',
      url: 'https://apistocks.p.rapidapi.com/monthly',
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

  function handleBuyStock(e) {
    e.preventDefault();
    timeSeries(stockName);
    const tradeDTO = { userId, stockName, quantities, stockPrice };

    buyStock(tradeDTO).then((response) => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
    window.location.reload(false);
  }

  function handleSellStock(e) {
    e.preventDefault();
    const tradeDTO = { userId, stockName, quantities, stockPrice };

    sellStock(tradeDTO).then((response) => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });
    window.location.reload(false);
  }

  function itemTemplate(data) {
    return (<span><span >{data.Symbol}</span> &nbsp;&nbsp;&nbsp; <span>{data.companyName}</span></span>);
  }

  const companyName = { value: 'Symbol' };

  const primaryxAxis = { title: 'Date', valueType: 'Category', majorGridLines: { width: 0 } };
  const primaryyAxis = { title: 'Price in Dollar', minimum: 100, maximum: 200, interval: 20 };
  const style = { textAlign: "center" };
  const legendSettings = { visible: false };

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3'>


          <form>

            <div className="card border-success mb-3" >
              <div className="card-body text-success">

                <h5 className="card-title">Buy & Sell Stock</h5>

                <p className="card-text">
                  <RadioButtonComponent label="Buy" name="state" checked={true} onChange={() => setBuyOrSell(true)} /> &nbsp; &nbsp;
                  <RadioButtonComponent label="Sell" name="state" onChange={() => setBuyOrSell(false)} />

                  <br /> <br />

                  {
                    buyOrSell == true && <span> Select Symbol :
                      <AutoCompleteComponent dataSource={stocklist} fields={companyName} itemTemplate={itemTemplate}
                        placeholder="Find a Symbol" onChange={(e) => setStockName(e.target.value)} />
                    </span>
                  }

                  {
                    buyOrSell == false && <span> You have these symbol(s) :
                      <DropDownListComponent dataSource={onwedList} id="ddlelement" placeholder='Select Your Stocks'
                        onChange={(e) => setStockName(e.target.value)} /> </span>
                  }

                  <span> Quantities : </span>
                  <NumericTextBoxComponent onChange={(e) => setQuantities(e.target.value)} name='quantities' />

                  <span> Price : </span>
                  <NumericTextBoxComponent onChange={(e) => setStockPrice(e.target.value)} name='stockPrice' />

                </p>

                <div>

                  {
                    buyOrSell == true && <button className='btn btn-primary' onClick={(e) => handleBuyStock(e)} >Buy</button>
                  }

                  {
                    buyOrSell == false && <button className='btn btn-danger' onClick={(e) => handleSellStock(e)} >Sell</button>
                  }


                </div>

              </div>

            </div>

          </form>

          <ChartComponent id='charts' style={style} primaryXAxis={primaryxAxis} primaryYAxis={primaryyAxis} legendSettings={legendSettings} title={chartTitle + '- Stock Chart'}>
            <Inject services={[CandleSeries, Tooltip, Category, Crosshair, Zoom]} />
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={timeSeriesData} xName='Date' yName='High' name='SHIRPUR-G' type='Candle' low='Low' high='High' open='Open' close='Close' bearFillColor='#e56590' bullFillColor='#f8b883'>
              </SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>

        </div>
      </div>
    </div>
  )
}

export default TradeComponent