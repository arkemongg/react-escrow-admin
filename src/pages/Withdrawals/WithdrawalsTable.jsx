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
                    <option>PENDING</option>
                    <option>FAILED</option>
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
                            <th>CUSTOMER NAME</th>
                            <th>AMOUNT</th>
                            <th>FEE</th>
                            <th>COIN TYPE</th>
                            <th>WITHDRAWAL ADDRESS</th>
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
    const handleComplete = (event) => {
        document.getElementById('completemodal').showModal()
    }
    const handleFailed = (event) => {
        document.getElementById('failedmodal').showModal()
    }
    return (
        <>
            <tr>
                <th>8</th>
                <td>Username</td>
                <td>100</td>
                <td>19.99</td>
                <td>2.5</td>
                <td>BTC</td>
                <td>Loremipsumdolorsitametconsecteturadipisicingelit.Earumrationepariaturquaeipsamolestiaeprovidentaspernaturabeaqueodioquasi.</td>
                <td>Pending</td>
                <td>12/10/20</td>
                <td>
                    <span onClick={handleComplete} className='btn btn-success w-[160px] btn-sm' >MARK AS COMPLETE</span>
                    <span onClick={handleFailed} className='btn btn-error w-[160px] ml-2 btn-sm' >MARK AS FAILED</span>
                </td>
                <CompelteWithdrawals data={"ok"} />
                <FailedWithdrawals data={"ok"} />
            </tr>
        </>
    )
}


const CompelteWithdrawals = (props) => {
    return (
        <>

            <dialog id="completemodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">COMPLETE WITHDRAWAL</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>

                    <div className="categoryInput">
                        <div htmlFor="username" className="my-2 text-xl">Username</div>
                        <input value={props.data} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div htmlFor="Customer Name" className="my-2 text-xl">Customer Name</div>
                        <input type="text" disabled placeholder="Customer Name" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="amount" className="my-2 text-xl">Amount</div>
                        <input value={props.data} disabled type="text" placeholder="Amount" className="input input-bordered w-full max-w-lg" />

                        <div htmlFor="fee" className="my-2 text-xl">Fee</div>
                        <input value={props.data} disabled type="text" placeholder="Fee" className="input input-bordered w-full max-w-lg" />
                        
                        
                        <div htmlFor="status" className="my-2 text-xl">Coin type</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="createdat" className="my-2 text-xl">Address</div>
                        <input type="text" value={"Loremipsumdolorsitametconsecteturadipisicingelit.Earumrationepariaturquaeipsamolestiaeprovidentaspernaturabeaqueodioquasi."} disabled placeholder="created at" className="input input-bordered w-full max-w-lg" />
                       
                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="createdat" className="my-2 text-xl">Created at</div>
                        <input type="text" disabled placeholder="created at" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-success mt-2 w-[200px]">MARK AS COMPLETE</button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

const FailedWithdrawals = (props) => {
    return (
        <>

            <dialog id="failedmodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">FAIL WITHDRAWAL</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>
                    <h3 className="text-error text-sm"> ***Marking fail will return the full balance to the customer.</h3>
                    <div className="categoryInput">
                        <div htmlFor="username" className="my-2 text-xl">Username</div>
                        <input value={props.data} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div htmlFor="Customer Name" className="my-2 text-xl">Customer Name</div>
                        <input type="text" disabled placeholder="Customer Name" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="amount" className="my-2 text-xl">Amount</div>
                        <input value={props.data} disabled type="text" placeholder="Amount" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="fee" className="my-2 text-xl">Fee</div>
                        <input value={props.data} disabled type="text" placeholder="Fee" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="status" className="my-2 text-xl">Coin type</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="createdat" className="my-2 text-xl">Address</div>
                        <input type="text" value={"Loremipsumdolorsitametconsecteturadipisicingelit.Earumrationepariaturquaeipsamolestiaeprovidentaspernaturabeaqueodioquasi."} disabled placeholder="created at" className="input input-bordered w-full max-w-lg" />
                       
                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                        
                        <div htmlFor="createdat" className="my-2 text-xl">Created at</div>
                        <input type="text" disabled placeholder="created at" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-error mt-2 w-[200px]">MARK AS FAILED</button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}