import styles from './styles/WithdrawalsTable.module.css'

const WithdrawalsTable = () => {
    return (
        <>
            <div className={`${styles.WithdrawalsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Withdrawals
                </div>
            </div>
            <div className={`${styles.WithdrawalsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input type="text" placeholder="Username" className="input input-bordered rounded-none w-full max-w-lg" />
                <div className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.WithdrawalsTable} flex items-center px-3`}>
                <select className="select select-bordered rounded-none w-full max-w-lg">
                    <option disabled selected>Filter</option>
                    <option>Pending</option>
                    <option>Failed</option>
                    <option>COMPLETED</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>USERNAME</th>
                            <th>CUSTOMER ID</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                            <th>CREATED AT</th>
                            <th className='min-w-[360px]'>MARK AS COMPLETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
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
                <div className="btn btn-sm btn-primary">Go</div>
            </div>
        </>
    )
}

export default WithdrawalsTable

const Row = (props) => {
    return (
        <>
            <tr>
                <th>8</th>
                <td>Username</td>
                <td>100</td>
                <td>19.99</td>
                <td>Pending</td>
                <td>12/10/20</td>
                <td>
                    <span className='btn btn-success w-[160px] btn-sm' >MARK AS COMPLETE</span>
                    <span className='btn btn-error w-[160px] ml-2 btn-sm' >MARK AS FAILED</span>
                </td>
            </tr>
        </>
    )
}