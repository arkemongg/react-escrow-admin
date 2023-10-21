import { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import styles from './styles/RecentOrders.module.css'
import { convertDatetimeToDate, getToken } from '../AxiosHeaders';
import LoadingArea from '../GlobalTemplates/LoadingArea'
import { apiUrl } from '../Urls';
import { Link } from 'react-router-dom';
const RecentOrders = () => {

    const {logout} = useAuth()
  
    const [data, setData] = useState([])
  
    useEffect(() => {
      
      const url = '/admin/orders/?limit=5'
      getToken(url)
        .then(response => {
          if (response.status === 200) {
            setData(response.data.results)
          }
        })
        .catch(error => {
          
          if(error.response){
            if(error.response.status===401){
              logout()
            }
          }
        });
  
      return () => {}; //HANDLE MULTIPLE CALL ERROR
  
    }, [])
    
    return (
        <>
            <div className={styles.recentOrdersArea}>
                <div className={`${styles.recentOrders}`}>
                    <div className="text-2xl p-3 flex items-center justify-between">
                        <div className="span">
                            Recent Orders
                        </div>
                        <Link to={'orders'} className="btn btn-primary">
                            All Orders
                        </Link>
                    </div>
                    <hr />

                    <div className='ordersArea'>
                        <ul className={`${styles.ordersList}`}>
                            <li className={`${styles.orders} px-5 py-2`}>
                                <div className='font-bold w-[120px] min-w-[120px]'>Product</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Photo</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Order ID</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Status</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Total</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Date</div>
                            </li>
                            {data.length<1?<LoadingArea />:data.map(order=>{
                                
                                return <Order  
                                    id ={order.id}
                                    product = {order.orderitems[0].productTitle}
                                    img = {order.orderitems[0].productImage}
                                    qty = {order.orderitems[0].quantity}
                                    price = {order.orderitems[0].unit_price}
                                    status = {order.order_status}
                                    date = {order.created_at}
                                    key = {order.id}
                                />
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecentOrders;


const Order = (props) => {

    const escrow_pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const escrow_complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>
    const escrow_failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'> Failed </div>
    
    let status = escrow_pending

    if(props.status==='F'){
        status = escrow_failed
    }else if(props.status==='C'){
        status = escrow_complete
    }
    
    return (
        <>
            <li className={`${styles.orders} px-5 py-2`}>
                <div className=' w-[120px]  min-w-[120px]'>{props.product.length>15?props.product.slice(0,14):props.product}</div>
                <div className=' w-[120px]  min-w-[120px]' >
                    <img className='w-[80px] h-[80px] border-2 rounded-lg' src={apiUrl+props.img} alt="" />
                </div>
                <div className=' w-[120px]  min-w-[120px]' >{props.id}</div>
                <div className=' w-[120px]  min-w-[120px]' >{status}</div>
                <div className=' w-[120px]  min-w-[120px] text-primary' >${(props.qty*props.price).toFixed(2)}</div>
                <div className=' w-[120px]  min-w-[120px]' >{convertDatetimeToDate(props.date)}</div>
            </li>
           
        </>
    )
}