import styles from './styles/OrderCustomerProductStat.module.css'
const OrderCustomerProductStat = () => {

  return (
    <>
      <div className={styles.OrderCustomerProductArea}>
        <TotalOrders />
        <TotalDeposits />
        <TotalViews />
        <TotalCustomer />
      </div>
    </>
  );
};

export default OrderCustomerProductStat;

const TotalOrders = () => {
  return (
    <div className={`${styles.item} border-l-4 border-primary flex justify-between items-center`}>
      <div className="inforArea">
        <div className="px-2">
          Total Orders
        </div>
        <div className="text-2xl p-2 text-primary">
          8850
        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/order.png" alt="" />
      </div>
    </div>
  )
}
const TotalDeposits = () => {
  return (
    <div className={`${styles.item} border-l-4 border-success flex justify-between items-center`}>
      <div className="inforArea">
        <div className="px-2">
          Total depopsits
        </div>
        <div className="text-2xl p-2 text-success">
          $69420.00
        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/wallet.png" alt="" />
      </div>
    </div>
  )
}

const TotalCustomer = () => {
  return (
    <div className={`${styles.item} border-l-4 border-info flex justify-between items-center`}>
      <div className="inforArea">
        <div className=" px-2">
          Total Customers
        </div>
        <div className="text-2xl p-2 text-info">
          8850
        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/client.png" alt="" />
      </div>
    </div>
  )
}

const TotalViews = () => {
  return (
    <div className={`${styles.item} border-l-4 border-accent flex justify-between items-center`}>
      <div className="inforArea">
        <div className="px-2">
          Total Product Views
        </div>
        <div className="text-2xl p-2 text-accent">
          8850
        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/view.png" alt="" />
      </div>
    </div>
  )
}