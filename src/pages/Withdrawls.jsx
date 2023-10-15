
import WithdrawalsTable from './Withdrawals/WithdrawalsTable';
import styles from './styles/Withdrawals.module.css'

const Withdrawals = () => {

  return (
    <>
        <div className={styles.WithdrawalsArea}>
            <WithdrawalsTable />
        </div>
    </>
  );
};

export default Withdrawals;




