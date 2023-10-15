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
                    <span className='btn btn-success w-[160px] btn-sm' >MARK AS VERIFIED</span>
                    <span className='btn btn-error w-[160px] ml-2 btn-sm' >CANCEL/RESUBMIT</span>
                </td>
            </tr>
        </>
    )
}