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
                            
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th className='min-w-[150px]'>PHOTO</th>
                            <th>FIRST NAME</th>
                            <th>LAST NAME</th>
                            <th>VERIFIED USER</th>
                            <th>SUPER SELLER</th>
                            <th>IS SELLER</th>
                            <th>ACTIVE USER</th>
                            <th className='min-w-[550px]'>EDIT</th>
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
    const handleEdit = (event) => {
        document.getElementById('updatemodal').showModal()
    }
    const handleSuper = (event) => {
        document.getElementById('supermodal').showModal()
    }
    const handleDeactivate = (event) => {
        document.getElementById('deactivatemodal').showModal()
    }
    return (
        <>
            <tr>
                <th>8</th>
                
                <td>Username</td>
                <td>Email@email.com Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, mollitia?</td>
                <td> <img className='w-[80px] h-[80px] border-2  rounded-[50%]' src="./dashboard/test.jpg" alt="" />
                </td>
                <td>First</td>
                <td>Last</td>
                <td>YES</td>
                <td>NO</td>
                <td>YES</td>
                <td>YES</td>
                <td>
                    <span onClick={handleEdit} className='btn btn-success w-[150px] btn-sm' >Edit</span>
                    <span onClick={handleSuper} className='btn btn-primary w-[190px] btn-sm ml-2' >MARK AS SUPER SELLER</span>
                    <span onClick={handleDeactivate} className='btn btn-error w-[150px] ml-2 btn-sm' >Deactivate User</span>
                </td>
                <UpdateCustomer data ={"Ok"}/>
                <SuperCustomer data ={"Ok"}/>
                <DeactivateCustomer data ={"Ok"}/>
            </tr>
        </>
    )
}

const UpdateCustomer = (props) => {
    return (
        <>

            <dialog id="updatemodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">UPDATE CUSTOMER</h3>
                    <h3 className="font-bold text-lg">ID#:69402</h3>
                    
                    <div className="categoryInput">
                        <div htmlFor="username" className="my-2 text-xl">Username</div>
                        <input value={props.data} type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Email</div>
                        <input type="text" placeholder="Email" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="username" className="my-2 text-xl">First name</div>
                        <input value={props.data} type="text" placeholder="First Name" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Last Name</div>
                        <input type="text" placeholder="Last Name" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-success mt-2 w-[200px]">UPDATE</button>

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
const SuperCustomer = (props) => {
    return (
        <>

            <dialog id="supermodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">SUPER CUSTOMER
                    <br />
                    ID#:80
                    </h3>
                    
                    <div className="categoryInput">
                        <div htmlFor="username" className="my-2 text-xl">Username</div>
                        <input value={props.data} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Email</div>
                        <input type="email" disabled placeholder="Email" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="username" className="my-2 text-xl">First name</div>
                        <input value={props.data} disabled type="text" placeholder="First Name" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Last Name</div>
                        <input type="text" disabled placeholder="Last Name" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-primary mt-2 w-[200px]">MARK AS SUPER SELLER</button>

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

const DeactivateCustomer = (props) => {
    return (
        <>

            <dialog id="deactivatemodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">DEACTIVATE CUSTOMER
                    <br />
                    ID#:80
                    </h3>
                    
                    <div className="categoryInput">
                        <div htmlFor="username" className="my-2 text-xl">Username</div>
                        <input value={props.data} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Email</div>
                        <input type="email" disabled placeholder="Email" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="username" className="my-2 text-xl">First name</div>
                        <input value={props.data} disabled type="text" placeholder="First Name" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Last Name</div>
                        <input type="text" disabled placeholder="Last Name" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-error mt-2 w-[200px]">DEATIVATE</button>

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