import styles from './styles/OrderCustomerProductStat.module.css'

import { getToken } from '../AxiosHeaders.js';
import { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { FlaotingError } from '../GlobalTemplates/FloatingError';

const OrderCustomerProductStat = () => {
  const [err, setErr] = useState(false)
  const [message, setMessage] = useState("false")
  const {logout} = useAuth()

  const [orderData, setOrderData] = useState()
  const [depositData, setDepositData] = useState()
  const [viewData, setViewData] = useState()
  const [customerData, setCustomerData] = useState()
 

  useEffect(() => {
    
    const url = '/admin/total-data/'
    getToken(url)
      .then(response => {
        if (response.status === 200) {
          const data = response.data
          setOrderData(data.total_orders)
          setDepositData(data.total_deposits)
          setViewData(data.total_products_view)
          setCustomerData(data.total_customer)
        }
      })
      .catch(error => {
        setErr(true)
        if(error.response){
          if(error.response.status===401){
            logout()
          }else{
            setMessage("Error fetching data.")
          }
        }else{
          setMessage("No response received from the server.")
        }
      });

    return () => {}; //HANDLE MULTIPLE CALL ERROR

  }, [])

  return (
    <>
      {err? <FlaotingError err={err} setErr = {setErr} message = {message} />:""}
      <div className={styles.OrderCustomerProductArea}>
        <TotalOrders data={orderData} />
        <TotalDeposits data={depositData} />
        <TotalViews data={viewData} />
        <TotalCustomer data={customerData} />
      </div>
    </>
  );
};

export default OrderCustomerProductStat;

const TotalOrders = (props) => {
  
  return (
    <div className={`${styles.item} border-l-4 border-primary flex justify-between items-center`}>
      <div className="inforArea">
        <div className="px-2">
          Total Orders
        </div>
        <div className="text-2xl p-2 text-primary">
          {props.data ? props.data : <span className="loading loading-bars loading-md"></span>}
        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/order.png" alt="" />
      </div>
    </div>
  )
}
const TotalDeposits = (props) => {
  return (
    <div className={`${styles.item} border-l-4 border-success flex justify-between items-center`}>
      <div className="inforArea">
        <div className="px-2">
          Total depopsits
        </div>
        <div className="text-2xl p-2 text-success">
          {props.data ? "$" + props.data : <span className="loading loading-bars loading-md"></span>}

        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/wallet.png" alt="" />
      </div>
    </div>
  )
}

const TotalCustomer = (props) => {
  return (
    <div className={`${styles.item} border-l-4 border-info flex justify-between items-center`}>
      <div className="inforArea">
        <div className=" px-2">
          Total Customers
        </div>
        <div className="text-2xl p-2 text-info">
          {props.data ? props.data : <span className="loading loading-bars loading-md"></span>}
        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/client.png" alt="" />
      </div>
    </div>
  )
}

const TotalViews = (props) => {
  return (
    <div className={`${styles.item} border-l-4 border-accent flex justify-between items-center`}>
      <div className="inforArea">
        <div className="px-2">
          Total Product Views
        </div>
        <div className="text-2xl p-2 text-accent">
          {props.data ? props.data : <span className="loading loading-bars loading-md"></span>}

        </div>
      </div>
      <div className="imgArea p-2">
        <img className='w-[50px] ' src="./dashboard/view.png" alt="" />
      </div>
    </div>
  )
}