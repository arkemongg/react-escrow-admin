import './App.css';
import Navigation from './Nav';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from './pages/Category';
import Balance from './pages/Balance';
import Reviews from './pages/Reviews';
import Customers from './pages/Customers';
import Deposits from './pages/Deposits';
import Withdrawals from './pages/Withdrawls';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Verifications from './pages/Verification';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={< Dashboard />} />
            <Route path='customers' element={< Customers />} />
            <Route path='category' element={< Category />} />
            <Route path='products' element={< Products />} />
            <Route path='orders' element={< Orders />} />
            <Route path='reviews' element={< Reviews />} />
            <Route path='balance' element={< Balance />} />
            <Route path='deposits' element={< Deposits />} />
            <Route path='withdrawals' element={< Withdrawals />} />
            <Route path='verifications' element={< Verifications />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
