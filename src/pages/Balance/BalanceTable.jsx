import styles from './styles/BalanceTable.module.css'

const BalanceTables = () => {
    return (
        <>
            <div className={`${styles.BalanceTables} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Customer Balance
                </div>
            </div>
            <div className={`${styles.BalanceTables} flex items-center px-3 bg-[#F2F2F2]`}>
                <input type="text" placeholder="Username" className="input input-bordered rounded-none w-full max-w-lg" />
                <div className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer ID</th>
                            <th>Username</th>
                            <th>Balance</th>
                            <th>On Hold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>1</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>2</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>3</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <th>4</th>
                            <td>4</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                        {/* row 5 */}
                        <tr>
                            <th>5</th>
                            <td>5</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                        {/* row 6 */}
                        <tr>
                            <th>6</th>
                            <td>6</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                        {/* row 7 */}
                        <tr>
                            <th>7</th>
                            <td>7</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                        {/* row 8 */}
                        <tr>
                            <th>8</th>
                            <td>8</td>
                            <td>Username</td>
                            <td>1000.00</td>
                            <td>50.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='btnArea flex justify-center flex-wrap p-5 pb-2'>
                <div className="btn btn-primary w-[150px]"> Previous </div>
                <div className="btn btn-primary w-[160px] ml-2"> Next </div>
            </div>
            <div className={`flex justify-center items-center p-2 pb-5 `}>
                    <input type="text" placeholder="Page" className={` text-sm p-1 w-[50px] h-[30px] input rounded-none input-bordered`} /> 
                    <div className="px-3 font-light">
                         of {10}
                    </div>
                    <div  className="btn btn-sm btn-primary">Go</div>
            </div>
        </>
    )
}

export default BalanceTables