import { useNavigate } from 'react-router-dom';
import BalanceTables from './Balance/BalanceTable';
import styles from './styles/Balance.module.css'
import { useAuth } from '../AuthContext';
import { useEffect } from 'react';

const Balance = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    } 
  }, [isLogged, navigate])
  return (
    <>
        <div className={styles.CategoryArea}>
            <BalanceTables />
        </div>
    </>
  );
};

export default Balance;




