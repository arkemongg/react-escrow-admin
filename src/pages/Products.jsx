import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import ProductsTable from './Products/ProductsTable';
import styles from './styles/Products.module.css'

const Products = () => {
  const { isLogged } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    } 
  }, [isLogged, navigate])
  return (
    <>
        <div className={styles.ProductsArea}>
            <ProductsTable />
        </div>
    </>
  );
};

export default Products;




