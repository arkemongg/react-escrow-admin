import VerificationsTable from './Verifications/VerificationsTable';
import styles from './styles/Verifications.module.css'

const Verifications = () => {

  return (
    <>
        <div className={styles.VerificationsArea}>
            <VerificationsTable />
        </div>
    </>
  );
};

export default Verifications;




