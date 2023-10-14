import styles from './styles/CustomersTable.module.css'

const CustomersTable = () => {
    return (
        <>
            <div className={`${styles.CustomersTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Customers
                </div>
            </div>
            <div className={`${styles.CustomersTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input type="text" placeholder="Username" className="input input-bordered rounded-none w-full max-w-lg" />
                <div className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            {/* <div className={`${styles.CustomersTable} flex items-center px-3`}>
                <select className="select select-bordered rounded-none w-full max-w-lg">
                    <option disabled selected>Filter</option>
                    <option>COMPLETED</option>
                    <option>NOT COMPLETED</option>
                </select>
            </div> */}

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>USERNAME</th>
                            <th>FIRST NAME</th>
                            <th>LAST NAME</th>
                            <th>VERIFIED USER</th>
                            <th>SUPER SELLER</th>
                            <th>IS SELLER</th>
                            <th>ACTIVE USER</th>
                            <th>EDIT</th>
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

export default CustomersTable

const Row = (props) => {
    return (
        <>
            <tr>
                <th>8</th>
                <th>8</th>
                <td>Username</td>
                <td>First</td>
                <td>Last</td>
                <td>YES</td>
                <td>NO</td>
                <td>YES</td>
                <td>YES</td>
                <td>
                    <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                </td>
            </tr>
        </>
    )
}