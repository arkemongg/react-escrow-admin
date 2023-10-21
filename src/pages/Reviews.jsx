import { useNavigate } from 'react-router-dom';
import ReviewsTable from './Reviews/ReviewsTable';
import styles from './styles/Balance.module.css'
import { useAuth } from '../AuthContext';
import { useEffect } from 'react';

const Reviews = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    } 
  }, [isLogged, navigate])
  return (
    <>
        <div className={styles.ReviewsArea}>
            <ReviewsTable />
        </div>
    </>
  );
};

export default Reviews;




