import styles from './styles/ReviewsTable.module.css'

const ReviewsTable = () => {
    return (
        <>
            <div className={`${styles.ReviewsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Reviews
                </div>
            </div>
            <div className={`${styles.ReviewsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input type="text" placeholder="Username" className="input input-bordered rounded-none w-full max-w-lg" />
                <div className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.ReviewsTable} flex items-center px-3`}>
                <select className="select select-bordered rounded-none w-full max-w-lg">
                    <option disabled selected>Filter</option>
                    <option>COMPLETED</option>
                    <option>NOT COMPLETED</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>SELLER USERNAME</th>
                            <th>REVIEWER USERNAME</th>
                            <th>RATING</th>
                            <th>COMMENT</th>
                            <th>COMPLETED</th>
                            <th>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>5</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>5</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>5</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <th>4</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>1</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
                        {/* row 5 */}
                        <tr>
                            <th>5</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>2</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
                        {/* row 6 */}
                        <tr>
                            <th>6</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>3</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
                        {/* row 7 */}
                        <tr>
                            <th>7</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>4</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
                        {/* row 8 */}
                        <tr>
                            <th>8</th>
                            <td>Username</td>
                            <td>Username</td>
                            <td>5</td>
                            <td>50.00</td>
                            <td>YES</td>
                            <td>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                            </td>
                        </tr>
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

export default ReviewsTable

const Row = (props) => {
    return (
        <>
            <tr>
                <th>8</th>
                <td>Username</td>
                <td>Username</td>
                <td>5</td>
                <td>50.00</td>
                <td>YES</td>
                <td>
                    <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                </td>
            </tr>
        </>
    )
}