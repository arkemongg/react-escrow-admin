import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import DepositsTable from './Deposits/DepositsTable';
import styles from './styles/Deposits.module.css'
import { useEffect } from 'react';

const Deposits = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    } 
  }, [isLogged, navigate])
  return (
    <>
        <div className={styles.DepositArea}>
            <DepositsTable />
        </div>
    </>
  );
};

export default Deposits;




