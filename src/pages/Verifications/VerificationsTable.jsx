import styles from './styles/VerificationsTable.module.css'

const VerificationsTable = () => {
    return (
        <>
            <div className={`${styles.VerificationsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Verifications
                </div>
            </div>
            <div className={`${styles.VerificationsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input type="text" placeholder="USERNAME" className="input input-bordered rounded-none w-full max-w-lg" />
                <div className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.VerificationsTable} flex items-center px-3`}>
                <select className="select select-bordered rounded-none w-full max-w-lg">
                    <option disabled selected>Filter</option>
                    <option>Pending</option>
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
                            <th className='min-w-[150px]' >NID FRONT</th>
                            <th className='min-w-[150px]'>NID BACK</th>
                            <th className='min-w-[150px]'>SELFIE</th>
                            <th>STATUS</th>
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

export default VerificationsTable

const Row = (props) => {
    const handleComplete = (event) => {
        document.getElementById('completemodal').showModal()
    }
    const handleCancel = (event) => {
        document.getElementById('cancelmodal').showModal()
    }
    return (
        <>
            <tr>
                <th>8</th>
                <td>Username</td>
                <td>100</td>
                <td> <img className='w-[80px] h-[80px] border-2  rounded-lg' src="./dashboard/test.jpg" alt="" />
                </td>
                <td><img className='w-[80px] h-[80px] border-2  rounded-lg' src="./dashboard/test.jpg" alt="" /></td>
                <td><img className='w-[80px] h-[80px] border-2  rounded-lg' src="./dashboard/test.jpg" alt="" /></td>
                <td>COMPLETED</td>
                <td>
                    <span onClick={handleComplete} className='btn btn-success w-[160px] btn-sm' >MARK AS VERIFIED</span>
                    <span onClick={handleCancel} className='btn btn-error w-[160px] ml-2 btn-sm' >CANCEL/RESUBMIT</span>
                </td>
                <td>
                    <CompelteVerification />
                    <CancelVerification />
                </td>
            </tr>
        </>
    )
}

const CompelteVerification = (props) => {

    return (
        <>
            <dialog id="completemodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Complete Verification</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>

                    <div className="categoryInput">

                        <div className="my-2 text-xl">Username</div>
                        <input value={props.data} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Customer Name</div>
                        <input value={props.data} disabled type="text" placeholder="Customer Name" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl text-center">NID Front</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">NID Back</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">Selfie</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-success mt-2 w-[200px]">MARK AS VERIFIED</button>

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

const CancelVerification = (props) => {

    return (
        <>
            <dialog id="cancelmodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Cancel Verification</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>

                    <div className="categoryInput">

                        <div className="my-2 text-xl">Username</div>
                        <input value={props.data} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Customer Name</div>
                        <input value={props.data} disabled type="text" placeholder="Customer Name" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl text-center">NID Front</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">NID Back</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">Selfie</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src="./dashboard/test.jpg" alt="" />
                        </div>

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-error mt-2 w-[200px]">CANCEL/RESUBMIT</button>

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