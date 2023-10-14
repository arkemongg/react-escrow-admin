import logo from './logo.svg';
import './App.css';
import Navigation from './Nav';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from './pages/Category';
import Balance from './pages/Balance';
import Reviews from './pages/Reviews';
import Customers from './pages/Customers';
import Deposits from './pages/Deposits';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={< Dashboard  />} />
            <Route path='customers' element={< Customers  />} />
            <Route path='category' element={< Category  />} />
            <Route path='reviews' element={< Reviews  />} />
            <Route path='balance' element={< Balance  />} />
            <Route path='deposits' element={< Deposits  />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
