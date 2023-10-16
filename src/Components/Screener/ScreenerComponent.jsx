import React from 'react'
import { useState } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import axios from 'axios';
import { useEffect } from 'react';

const ScreenerComponent = () => {

  const [selection1, setSelection1] = useState('');
  const [selection2, setSelection2] = useState('');
  const [rateResult, setRateResult] = useState([]);

  const currency = ['USD', 'JPY', 'EUR', 'KRW', 'CNY', 'INR', 'VND', 'GBP', 'AED', 'QAR', 'SAR', 'THB', 'SGD'];

  useEffect(() => {
    exchangeRate();
  }, [])

  async function exchangeRate(option1 = 'USD', option2 = 'JPY') {
    console.log(option1, option2, 'op');
    const options = {
      method: 'GET',
      url: 'https://exchange-rate-api1.p.rapidapi.com/convert',
      params: {
        base: option1,
        target: option2
      },
      headers: {
        'X-RapidAPI-Key': 'c1b44bd912msh2f07e988adef1aap16ae60jsnac03fd75789e',
        'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com'
      }
    };

    await axios.request(options).then((response) => {
      setRateResult(response.data);
    }).catch(error => {
      console.error(error);
    });

    console.log(rateResult, 'console');
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selection1, selection2, 'sel')
    exchangeRate(selection1, selection2);
  }

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div>

            <div className="e-card" id="basic">
              <div className="e-card-header">
                <div className="e-card-header-caption">
                  <div className="e-card-title">Exchange Rate</div>
                </div>
              </div>
              <div className="e-card-content">
                <DropDownListComponent id='ddlelement' dataSource={currency} onChange={(e) => setSelection1(e.target.value)} />
                <DropDownListComponent id='ddlelement' dataSource={currency} onChange={(e) => setSelection2(e.target.value)} />
                <div className='d-grid gap-2 col-6 mx-auto'>
                  <button className='btn btn-success btn-sm' onClick={(e) => handleSubmit(e)}> Submit </button>
                </div>
              </div>
            </div>

            {
              rateResult.code == 2500501 || rateResult.length == 0 ? " " :
              
                <div>
                  <p> If you change value then rate will be changed. </p>
                  <p > Rate: <strong style={{color:'red'}}> {rateResult.convert_result.rate} </strong>  </p>
                  <p > Base: <strong style={{color:'blue'}} >{rateResult.convert_result.base}</strong> </p>
                  <p > Target: <strong>{rateResult.convert_result.target}</strong> </p>
                </div>
            }


          </div>

        </div>
      </div>
    </div>
  )
}

export default ScreenerComponent