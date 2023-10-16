
import { Link } from 'react-router-dom'
import '../../../src/Sidebar.css';

const SideBarComponent = () => {


  return (
    <>
      <div className="sidenav">

        <Link to="/watchlist">Watchlist</Link>
        <Link to="/stocks">Stocks</Link>
        <Link to="/markets">Markets</Link>
        <Link to="/screener">Screnner</Link>
        <Link to="/trade">Trade</Link>
        <Link to="/dashboard">DashBoard</Link>

      </div>
    </>

  );
}

export default SideBarComponent

