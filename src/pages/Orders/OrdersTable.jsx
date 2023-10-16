import styles from './styles/OrdersTable.module.css'

const OrdersTable = () => {
    return (
        <>
            <div className={`${styles.OrdersTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Orders
                </div>
            </div>
            <div className={`${styles.OrdersTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input type="text" placeholder="USERNAME / ORDER ID" className="input input-bordered rounded-none w-full max-w-lg" />
                <div className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.OrdersTable} flex items-center px-3`}>
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
                            <th>BUYER USERNAME</th>
                            <th>SELLER USERNAME</th>
                            <th>ORDER STATUS</th>
                            <th>PRODUCT ID</th>
                            <th className='min-w-[250px]'>PRODUCT TITLE</th>
                            <th>PRODUCT IMG</th>
                            <th>PRODUCT QTY</th>
                            <th>TOTAL</th>
                            <th>CREATED AT</th>
                            <th className='min-w-[360px]'>EDIT</th>
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

export default OrdersTable

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
                <td>BUYER USERNAME</td>
                <td>SELLER USERNAME</td>
                <td>PENDING</td>
                <td>1000000</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis culpa consectetur vitae? Beatae, laborum voluptate repellat ad dolores voluptatum perspiciatis!</td>
                <td>
                    <img className='w-[80px] h-[80px] border-2 rounded-lg' src="./dashboard/test.jpg" alt="" />
                </td>
                <td>100</td>
                <td>1000.00</td>
                <td>12/10/20</td>
                <td>
                    <span onClick={handleComplete} className='btn btn-success w-[160px] btn-sm' >MARK AS COMPLETE</span>
                    <span onClick={handleFailed} className='btn btn-error w-[160px] ml-2 btn-sm' >MARK AS FAILED</span>
                </td>
                <CompelteOrder />
                <FailedOrder />
            </tr>
        </>
    )
}

const CompelteOrder = (props) => {
    return (
        <>
            <dialog id="completemodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">COMPLETE ORDER</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>
                    <h3 className="text-error text-sm"> ***Marking complete will transfer the balance to seller from buyer.</h3>

                    <div className="categoryInput">
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>
                        <div className="my-2 text-xl">Product Title</div>
                        <input value={props.data} disabled type="text" placeholder="Product" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Buyer Username</div>
                        <input value={props.data} disabled type="text" placeholder="Buyer Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Seller Username</div>
                        <input type="text" disabled placeholder="Seller Username" className="input input-bordered w-full max-w-lg" />


                        {/* <div className="my-2 text-xl">QTY</div>
                        <input value={props.data} disabled type="text" placeholder="QTY" className="input input-bordered w-full max-w-lg" />
                        
                        <div className="my-2 text-xl">Total</div>
                        <input value={props.data} disabled type="text" placeholder="Total" className="input input-bordered w-full max-w-lg" />
                         */}

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Created At</div>
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

const FailedOrder = (props) => {
    return (
        <>

            <dialog id="failedmodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">FAILED ORDER</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>
                    <h3 className="text-error text-sm"> ***Marking fail will release the balance from on hold.</h3>

                    <div className="categoryInput">
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>
                        <div className="my-2 text-xl">Product Title</div>
                        <input value={props.data} disabled type="text" placeholder="Product" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Buyer Username</div>
                        <input value={props.data} disabled type="text" placeholder="Buyer Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Seller Username</div>
                        <input type="text" disabled placeholder="Seller Username" className="input input-bordered w-full max-w-lg" />


                        {/* <div className="my-2 text-xl">QTY</div>
                        <input value={props.data} disabled type="text" placeholder="QTY" className="input input-bordered w-full max-w-lg" />
                        
                        <div className="my-2 text-xl">Total</div>
                        <input value={props.data} disabled type="text" placeholder="Total" className="input input-bordered w-full max-w-lg" />
                         */}

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Created At</div>
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