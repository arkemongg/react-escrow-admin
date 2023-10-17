import styles from './styles/Category.module.css'

import CategoryTables from './Category/CategoryTables';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { memo, useEffect } from 'react';

const Category = () => {
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
        <CategoryTables />
      </div>
    </>
  );
};

export default memo(Category);




