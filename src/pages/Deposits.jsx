import DepositsTable from './Deposits/DepositsTable';
import styles from './styles/Deposits.module.css'

const Deposits = () => {

  return (
    <>
        <div className={styles.DepositArea}>
            <DepositsTable />
        </div>
    </>
  );
};

export default Deposits;




