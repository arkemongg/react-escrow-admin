import styles from './styles/dashboard.module.css'
import OrderCustomerProductStat from './Dashboard/OrderCustomerProductStat';
import CustomersAndTrendingProducts from './Dashboard/CustomersAndTrendingProducts';
import RecentOrders from './Dashboard/RecentOrders';
import TotalStats from './Dashboard/TotalStats';


const Dashboard = () => {

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




