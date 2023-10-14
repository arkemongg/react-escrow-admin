import logo from './logo.svg';
import './App.css';
import Navigation from './Nav';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from './pages/Category';
import Balance from './pages/Balance';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={< Dashboard  />} />
            <Route path='category' element={< Category  />} />
            <Route path='balance' element={< Balance  />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
