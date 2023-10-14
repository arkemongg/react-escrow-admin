import styles from './styles/Category.module.css'

import CategoryTables from './Category/CategoryTables';

const Category = () => {

  return (
    <>
        <div className={styles.CategoryArea}>
            <CategoryTables />
        </div>
    </>
  );
};

export default Category;




