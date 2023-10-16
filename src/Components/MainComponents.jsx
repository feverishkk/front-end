import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import LayoutComponent from '../Layouts/LayoutComponent';
import LoginComponent from './Account/LoginComponent';
import RegisterComponent from './Account/RegisterComponent';
import StocksComponent from './Stock/StocksComponent';
import WatchlistComponent from './Watchlist/WatchlistComponent';
import WelcomeComponent from './WelcomePage/WelcomeComponent';
import MarketComponent from './Market/MarketComponent';
import ScreenerComponent from './Screener/ScreenerComponent';

import { isUserLoggedIn } from '../Services/AccountServices';
import TradeComponent from './Trade/TradeComponent';
import DashBoardComponent from './DashBoard/DashBoardComponent';

const MainComponent = () => {

  function AuthenticatedUserOnly({ children }) {

    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    } else {
      return <Navigate to="/" />
    }
  }

  const isAuth = isUserLoggedIn();


  return (
    <>

      <BrowserRouter>
        <LayoutComponent />

        <Routes>


          <Route path="/stocks" element={
            <AuthenticatedUserOnly>
              <StocksComponent />
            </AuthenticatedUserOnly>
          }>
          </Route>

          <Route path='/watchlist' element={
            <AuthenticatedUserOnly>
              <WatchlistComponent />
            </AuthenticatedUserOnly>
          }>
          </Route>

          <Route path='/' element={<WelcomeComponent />} ></Route>
          <Route path='/register' element={<RegisterComponent />}></Route>
          <Route path='/login' element={<LoginComponent />}></Route>

          <Route path='/welcome' element={
            <AuthenticatedUserOnly>
              <WelcomeComponent />
            </AuthenticatedUserOnly>
          }></Route>

          <Route path='/trade' element={
            <AuthenticatedUserOnly>
              <TradeComponent />
            </AuthenticatedUserOnly>
          }> </Route>

          <Route path='/markets' element={
            <AuthenticatedUserOnly>
              <MarketComponent />
            </AuthenticatedUserOnly>
          }> </Route>

          <Route path='/screener' element={
            <AuthenticatedUserOnly>
              <ScreenerComponent />
            </AuthenticatedUserOnly>
          }> </Route>

          <Route path='/dashboard' element={
            <AuthenticatedUserOnly>
              <DashBoardComponent />
            </AuthenticatedUserOnly>
          }></Route>

        </Routes>

      </BrowserRouter>

    </>
  )
}

export default MainComponent