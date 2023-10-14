import CustomersTable from './Customers/CustomersTable';
import styles from './styles/Customers.module.css'

const Customers = () => {

  return (
    <>
        <div className={styles.CustomersArea}>
            <CustomersTable />
        </div>
    </>
  );
};

export default Customers;




