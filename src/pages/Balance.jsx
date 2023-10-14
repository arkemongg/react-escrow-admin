import BalanceTables from './Balance/BalanceTable';
import styles from './styles/Balance.module.css'

const Balance = () => {

  return (
    <>
        <div className={styles.CategoryArea}>
            <BalanceTables />
        </div>
    </>
  );
};

export default Balance;




