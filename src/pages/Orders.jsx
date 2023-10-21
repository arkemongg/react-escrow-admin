import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import OrdersTable from './Orders/OrdersTable';
import styles from './styles/Orders.module.css'
import { useEffect } from 'react';

const Orders = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    } 
  }, [isLogged, navigate])
  return (
    <>
        <div className={styles.OrdersArea}>
            <OrdersTable />
        </div>
    </>
  );
};

export default Orders;




