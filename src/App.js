import './App.css';
import { AuthProvider } from './AuthContext';

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
import Login from './pages/Login';
import ScrollToTop from './ScrollToTop';


function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="login" element={<Login />} />
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
        </ScrollToTop>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
