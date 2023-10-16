import styles from './styles/dashboard.module.css'
import OrderCustomerProductStat from './Dashboard/OrderCustomerProductStat';
import CustomersAndTrendingProducts from './Dashboard/CustomersAndTrendingProducts';
import RecentOrders from './Dashboard/RecentOrders';
import TotalStats from './Dashboard/TotalStats';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useEffect } from 'react';


const Dashboard = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate()
  useEffect(()=>{
      if(!isLogged){
          navigate('/login')
      }
  },[])
  return (
    <>
        <div className={styles.dashboardArea}>
              <OrderCustomerProductStat />
              <CustomersAndTrendingProducts />
              <RecentOrders />
              <TotalStats />
        </div>
    </>
  );
};

export default Dashboard;




