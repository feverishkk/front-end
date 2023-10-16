import React, { useEffect, useState } from 'react'
import {
    AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
    Inject, AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, Export
} from '@syncfusion/ej2-react-charts';
import { getAllUserStocks, getUserBalance, reChargeUserBalance } from '../../Services/DashBoard';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

const DashBoardComponent = () => {

    const userId = sessionStorage.getItem("user_id");

    const [userOwnedList, setUserOwnedList] = useState([]);
    const [balance, setBalance] = useState(0);
    const [UserBalance, setUserBalance] = useState(0);

    // Pie차트
    useEffect(() => {
        const dashBoardDTO = { userId };
        getAllUserStocks(dashBoardDTO).then((response) => {
            console.log(response.data, 'response');
            setUserOwnedList(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    // 유저 잔고
    useEffect(() => {
        const balanceDTO = { userId };
        getUserBalance(balanceDTO).then((response)=>{
            setUserBalance(response.data);
            console.log(UserBalance);
        }).catch(error=>{
            console.error(error);
        })
    },[]);

    const datalabel = { visible: true, position: 'Inside', name: 'text' };
    const tooltip = { enable: true };
    const tooltipRender = (args) => {
        let value = args.point.y / args.series.sumOfPoints * 100;
        args.text = args.point.x + '' + Math.ceil(value) + '' + '%';
    };
    const legendSettings = { visible: true };

    function handleSubmit(e) {
        e.preventDefault();
        const reChargeDTO = { userId, balance };
        console.log(reChargeDTO);
        reChargeUserBalance(reChargeDTO).then((response) => {
            console.log(response.data, response.status);
        }).catch(error => {
            console.error(error);
        })
        location.reload(false);
    }

    return (
        <>
            <div>
                <div className='mt-2 col-2 offset-2'>
                    <div className="e-card" id="basic">
                        <div className="e-card-header">
                            <div className="e-card-header-caption">
                                <div className="e-card-title">Your Balance</div>
                            </div>
                        </div>
                        <div className="e-card-content">
                            <p> You have : $ <span style={{color:"red"}}>{UserBalance} </span> </p>
                        </div>
                    </div>
                </div>
                <AccumulationChartComponent id='charts' tooltip={tooltip} title='User Owned Stocks Properties' subTitle='차트 안에 있는 숫자가 보유량 입니다.'
                    tooltipRender={tooltipRender} legendSettings={legendSettings}>
                    <Inject services={[AccumulationTooltip, PieSeries, AccumulationDataLabel, AccumulationLegend, Export]} />
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={userOwnedList} xName='x' yName='y' radius='70%' dataLabel={datalabel}>
                        </AccumulationSeriesDirective>
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>

            </div>
            <br /><br /><br /><br />
            <div className='col-md-4 offset-2'>
                <div className="e-card" id="basic">
                    <div className="e-card-header">
                        <div className="e-card-header-caption">
                            <div className="e-card-title">Recharge Your Balance</div>
                        </div>
                    </div>
                    <div className="e-card-content">
                        <NumericTextBoxComponent min={1} onChange={(e) => setBalance(e.target.value)} name='balance' />
                    </div>

                    <div className='justify-content-md-center'>
                        <ButtonComponent style={{ width: '80px' }} onClick={(e) => handleSubmit(e)}>
                            Submit
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoardComponent