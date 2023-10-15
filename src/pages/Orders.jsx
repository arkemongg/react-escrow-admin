import OrdersTable from './Orders/OrdersTable';
import styles from './styles/Orders.module.css'

const Orders = () => {

  return (
    <>
        <div className={styles.OrdersArea}>
            <OrdersTable />
        </div>
    </>
  );
};

export default Orders;




