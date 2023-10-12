import styles from './styles/RecentOrders.module.css'
const RecentOrders = () => {
    return (
        <>
            <div className={styles.recentOrdersArea}>
                <div className={`${styles.recentOrders}`}>
                    <div className="text-2xl p-3 flex items-center justify-between">
                        <div className="span">
                            Recent Orders
                        </div>
                        <div className="btn btn-primary">
                            All Orders
                        </div>
                    </div>
                    <hr />

                    <div className='ordersArea'>
                        <ul className={`${styles.ordersList}`}>
                            <li className={`${styles.orders} px-5 py-2`}>
                                <div className='font-bold w-[120px] min-w-[120px]'>Product</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Photo</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Product ID</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Status</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Total</div>
                                <div className='font-bold w-[120px] min-w-[120px]' >Date</div>
                            </li>
                            <Order />
                            <Order />
                            <Order />
                            <Order />
                            <Order />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecentOrders;


const Order = () => {
    const escrow_pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    return (
        <>
            <li className={`${styles.orders} px-5 py-2`}>
                <div className=' w-[120px]  min-w-[120px]'>Lorem ipsum dolor sit amet</div>
                <div className=' w-[120px]  min-w-[120px]' >
                    <img className='w-[80px] h-[80px] border-2 rounded-lg' src="./dashboard/test.jpg" alt="" />
                </div>
                <div className=' w-[120px]  min-w-[120px]' >1000</div>
                <div className=' w-[120px]  min-w-[120px]' >{escrow_pending}</div>
                <div className=' w-[120px]  min-w-[120px] text-primary' >$1500.00</div>
                <div className=' w-[120px]  min-w-[120px]' >12/10/20</div>
            </li>
           
        </>
    )
}