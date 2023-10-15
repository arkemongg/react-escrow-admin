
import ProductsTable from './Products/ProductsTable';
import styles from './styles/Products.module.css'

const Products = () => {

  return (
    <>
        <div className={styles.ProductsArea}>
            <ProductsTable />
        </div>
    </>
  );
};

export default Products;




