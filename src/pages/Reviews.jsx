import ReviewsTable from './Reviews/ReviewsTable';
import styles from './styles/Balance.module.css'

const Reviews = () => {

  return (
    <>
        <div className={styles.ReviewsArea}>
            <ReviewsTable />
        </div>
    </>
  );
};

export default Reviews;




