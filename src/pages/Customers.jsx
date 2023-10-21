import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import CustomersTable from './Customers/CustomersTable';
import styles from './styles/Customers.module.css'
import { useEffect } from 'react';

const Customers = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    } 
  }, [isLogged, navigate])
  return (
    <>
        <div className={styles.CustomersArea}>
            <CustomersTable />
        </div>
    </>
  );
};

export default Customers;




