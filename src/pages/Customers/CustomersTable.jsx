import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/CustomersTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { getToken, putToken } from '../AxiosHeaders';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../GlobalTemplates/Empty';
import { apiUrl } from '../Urls';
import { FlaotingError } from '../GlobalTemplates/FloatingError';

const CustomersTable = () => {
    // Current Location
    const location = useLocation();

    // Logut context
    const { logout } = useAuth()

    // Check if data fetch comeplte
    const [fetched, setFetched] = useState(false)

    // Err handle
    const [err, setErr] = useState(false)

    // Error message
    const [message, setMessage] = useState("Error.")

    // Count the data to hide next / prev pagenumber go btn
    const [count, setCount] = useState(0)

    // Data storage
    const [data, setData] = useState([])

    // Search input
    const [search, setSearch] = useState("")

    // Navigate new url because it should be stored in memory so go back/forward will work
    const navigate = useNavigate()

    // SET API URL FOR DATA
    const [url, setUrl] = useState(location.search === "" ? '/admin/customer/' : `/admin/customer/${location.search}`)
    // next from api
    const [nextUrl, setNexturl] = useState(null)

    //prev from api
    const [previousUrl, setPreviousUrl] = useState(null)
    // Page number default 1
    const [pageNumber, setPageNumber] = useState(1)

    // Set the page number according to reload/search/next/prev as the naviagate to new url

    //Filter status

    useEffect(() => {
        const newUrl = new URL(`http://.../${location.search}`)
        //set search value
        setSearch(newUrl.searchParams.get("search") === null ? "" : newUrl.searchParams.get("search"))

        // Set page data accoriding to offset
        if (newUrl.searchParams.get("offset") === null) {
            setPageNumber(1)
        } else {
            let pageNumber = newUrl.searchParams.get("offset") / 10
            setPageNumber(pageNumber + 1)
        }
        //set the url to fetch the data
        setUrl(`/admin/customer/${location.search}`)
        return () => { };
    }, [location.key]); //location.key change by navigate

    // Fetchdata
    useEffect(() => {
        // Set fetched = false
        setFetched(false)

        // fetch the data 
        getToken(url)
            .then(response => {
                if (response.status === 200) {
                    // Set data
                    setCount(response.data.count)
                    setData(response.data.results)
                    setFetched(true)

                    // Next prev url set

                    setNexturl(response.data.next)
                    setPreviousUrl(response.data.previous)

                }
            })
            .catch(error => {
                //err handler
                setErr(true)
                if (error.response) {
                    //401 = unauthoirized
                    if (error.response.status === 401) {
                        logout()
                    } else {
                        //any other error
                        setMessage("Unexprected error.")
                    }
                } else {
                    // backend down
                    setMessage("No response received from the server.")
                }
            });

        return () => {
        };

    }, [url]); // on url change

    //hamdle search
    const handleSearch = () => {
        setCount(0)
        setPageNumber(1)
        const newUrl = new URL('http://....com' + url) // used dummy main url because url is only a key
        newUrl.searchParams.set("search", search)//search input
        newUrl.searchParams.set("limit", 10) //10 per page
        newUrl.searchParams.set("key", Math.random(1000)) // key for duplicate url/seacrhes so it will reload on any searches or reloads
        newUrl.searchParams.delete("offset") // remove page counts / current page and go to first page
        navigate(`${newUrl.search}`) // navigate to the url
    }

    const handlePrev = () => {
        if (previousUrl === null) {
            return;
        }
        const newUrl = new URL(previousUrl) //prev url genrated by api

        navigate(`${newUrl.search}`)//navigate url genrated by api

    }

    const handleNext = () => {
        if (nextUrl === null) {
            return;
        }
        const newUrl = new URL(nextUrl)//next url genrated by api

        navigate(`${newUrl.search}`)

    }


    const handleGo = (event) => {
        // no entry for invalid pages
        if (pageNumber < 1 || pageNumber > Math.ceil(count / 10)) {
            return;
        }
        const newUrl = new URL(`http://....com` + url) // dummy url as url is only search params
        if (pageNumber === 1) {
            newUrl.searchParams.delete("offset") // page 1 mean no offset
        } else {
            newUrl.searchParams.set("offset", (pageNumber - 1) * 10) // offse start from 10 (2nd page)
        }
        navigate(`${newUrl.search}`) //navigate to url
    }


    return (
        <>
            {/* floating erromessage */}
            {err ? <FlaotingError err={err} setErr={setErr} message={message} /> : ""}

            <div className={`${styles.CustomersTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Customers
                </div>
            </div>
            <div className={`${styles.CustomersTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="USERNAME " className="input input-bordered rounded-none w-full max-w-lg" />
                <div onClick={handleSearch} className="btn btn-success rounded-none  ml-2 w-[100px]">
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

            <div className="overflow-x-auto min-h-[500px]">
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
                            <th>ACTIVE USER</th>
                            <th className='min-w-[550px]'>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(customer => {
                            return <Row
                                key={customer.id}
                                id={customer.id}
                                username={customer.user}
                                email={customer.email}
                                first_name={customer.first_name}
                                last_name={customer.first_name}
                                verified_user={customer.verified_user}
                                super_seller={customer.super_seller}
                                is_active={customer.is_active}
                                img={customer.image}
                            />
                        }) : <tr></tr>}
                    </tbody>
                </table>
                {/* Handle loading or empty */}
                <div className={`w-[100%] min-h-[450px] ${fetched ? "hidden" : ""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length < 1 ? "" : "hidden"}`}>
                    {<EmptyMessage message={"No user found."} />}
                </div>
            </div>
            {/* Handle pagination */}
            <div className={`btnArea flex justify-center flex-wrap p-5 pb-2 ${count > 10 ? "" : "hidden"}`}>
                <div onClick={handlePrev} className="btn btn-primary w-[150px]"> Previous </div>
                <div onClick={handleNext} className="btn btn-primary w-[160px] ml-2"> Next </div>
            </div>
            <div className={`flex justify-center items-center p-2 pb-5 ${count > 10 ? "" : "hidden"}`}>
                <input onChange={e => setPageNumber(e.target.value)} value={pageNumber} type="text" placeholder="Page" className={` text-sm p-1 w-[50px] h-[30px] input rounded-none input-bordered`} />
                <div className="px-3 font-light">
                    of {Math.ceil(count / 10)}
                </div>
                <div onClick={handleGo} className="btn btn-sm btn-primary">Go</div>
            </div>
        </>
    )
}

export default CustomersTable

const Row = (props) => {
    // const handleEdit = (event) => {
    //     document.getElementById(`updatemodal${props.id}`).showModal()
    // }
    const handleSuper = (event) => {
        document.getElementById(`supermodal${props.id}`).showModal()
    }
    const handleRemoveSuper = (event) => {
        document.getElementById(`removesupermodal${props.id}`).showModal()
    }
    const handleDeactivate = (event) => {
        document.getElementById(`deactivatemodal${props.id}`).showModal()
    }
    const handleReactivate = (event) => {
        document.getElementById(`reactivatemodal${props.id}`).showModal()
    }
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.username}</td>
                <td>{props.email}</td>
                <td> <img className='w-[80px] h-[80px] border-2 object-cover rounded-[50%]' src={props.img !== 'NO IMAGE' ? apiUrl + props.img : "./dashboard/test.jpg"} alt="" />
                </td>
                <td>{props.first_name}</td>
                <td>{props.last_name}</td>
                <td>{props.verified_user ? "YES" : "NO"}</td>
                <td>{props.super_seller ? "YES" : "NO"}</td>
                <td>{props.is_active ? "YES" : "NO"}</td>
                <td>
                    {/* <span onClick={handleEdit} className='btn btn-success w-[150px] btn-sm' >Edit</span> */}
                    {props.super_seller ? <span onClick={handleRemoveSuper} className='btn btn-error w-[190px] btn-sm ml-2' >REMOVE SUPER SELLER</span> : <span onClick={handleSuper} className='btn btn-primary w-[190px] btn-sm ml-2' >MARK AS SUPER SELLER</span>}
                    {props.is_active ? <span onClick={handleDeactivate} className='btn btn-error w-[150px] ml-2 btn-sm' >Deactivate User</span> : <span onClick={handleReactivate} className='btn btn-success w-[150px] ml-2 btn-sm' >Reactivate User</span>}
                </td>
                {/* <UpdateCustomer data ={"Ok"}/> */}
                <td>
                    {
                        props.super_seller ?
                            <RemoveSuperCustomer
                                id={props.id}
                                username={props.username}
                                email={props.email}
                                first_name={props.first_name}
                                last_name={props.first_name}
                                is_active={props.is_active}
                                verified_user={props.verified_user}
                                super_seller={props.super_seller}
                            /> :
                            <SuperCustomer
                                id={props.id}
                                username={props.username}
                                email={props.email}
                                first_name={props.first_name}
                                last_name={props.first_name}
                                is_active={props.is_active}
                                verified_user={props.verified_user}
                                super_seller={props.super_seller}
                            />
                    }
                    {
                        props.is_active ?
                            <DeactivateCustomer
                                id={props.id}
                                username={props.username}
                                email={props.email}
                                first_name={props.first_name}
                                last_name={props.first_name}
                                is_active={props.is_active}
                                verified_user={props.verified_user}
                                super_seller={props.super_seller}
                            /> :
                            <ReactivateCustomer
                                id={props.id}
                                username={props.username}
                                email={props.email}
                                first_name={props.first_name}
                                last_name={props.first_name}
                                is_active={props.is_active}
                                verified_user={props.verified_user}
                                super_seller={props.super_seller}
                            />
                    }

                </td>
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

                    <div>
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
    // const location = useLocation();
    //logout when invalid token
    const { logout } = useAuth()

    //error message
    const [message, setMessage] = useState("Error.")

    //when clicked confirmed btn
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    //patch success
    const [success, setSuccess] = useState(false)
    //patch error
    const [err, setErr] = useState(false)

    //handle complete btn
    const handleComplete = () => {
        //clicked true to show the loading animation to btn
        setClicked(true)

        //data to patch
        const patchData = {
            "super_seller": true,
            "active": props.is_active
        }
        //url to api
        const url = `/admin/customer/${props.id}/`
        //send request
        putToken(url, patchData)
            .then(data => {
                // const newUrl = new URL(`http://.../${location.search}`)
                // newUrl.searchParams.set("updated",props.title+Math.random(1))
                // navigate(newUrl.search)
                if (data.status === 200) {
                    //set success
                    setSuccess(true)
                }

                //stop loading animation
                setClicked(false)

            }).catch(error => {
                setErr(true)
                if (error.response) {
                    if (error.response.status === 401) {
                        logout() //logout when invalid token
                    } else if (error.response.status === 400) {
                        //error message
                        setMessage("Unexpected error.")
                    }
                } else {
                    //error message
                    setMessage("No response from server")
                }
                //stop loading animation

                setClicked(false)
            })
    }

    //close btn to remove the confirmation text
    const handleClose = () => {
        setSuccess(false)
        setErr(false)
    }
    return (
        <>

            <dialog id={`supermodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">SUPER CUSTOMER
                        <br />
                        ID#:{props.id}
                    </h3>

                    <div>
                        <div className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Email</div>
                        <input value={props.email} type="email" disabled placeholder="Email" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">First name</div>
                        <input value={props.first_name} disabled type="text" placeholder="First Name" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Last Name</div>
                        <input value={props.last_name} type="text" disabled placeholder="Last Name" className="input input-bordered w-full max-w-lg" />
                    </div>

                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>

                    {/* Handle btn */}
                    <button onClick={handleComplete} className="btn btn-primary mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "MARK AS SUPER SELLER"}

                    </button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleClose} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
const RemoveSuperCustomer = (props) => {
    // const location = useLocation();
    //logout when invalid token
    const { logout } = useAuth()

    //error message
    const [message, setMessage] = useState("Error.")

    //when clicked confirmed btn
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    //patch success
    const [success, setSuccess] = useState(false)
    //patch error
    const [err, setErr] = useState(false)

    //handle complete btn
    const handleComplete = () => {
        //clicked true to show the loading animation to btn
        setClicked(true)

        //data to patch
        const patchData = {
            "super_seller": false,
            "active": props.is_active
        }
        //url to api
        const url = `/admin/customer/${props.id}/`
        //send request
        putToken(url, patchData)
            .then(data => {
                // const newUrl = new URL(`http://.../${location.search}`)
                // newUrl.searchParams.set("updated",props.title+Math.random(1))
                // navigate(newUrl.search)
                if (data.status === 200) {
                    //set success
                    setSuccess(true)
                }

                //stop loading animation
                setClicked(false)

            }).catch(error => {
                setErr(true)
                if (error.response) {
                    if (error.response.status === 401) {
                        logout() //logout when invalid token
                    } else if (error.response.status === 400) {
                        //error message
                        setMessage("Unexpected error.")
                    }
                } else {
                    //error message
                    setMessage("No response from server")
                }
                //stop loading animation

                setClicked(false)
            })
    }

    //close btn to remove the confirmation text
    const handleClose = () => {
        setSuccess(false)
        setErr(false)
    }
    return (
        <>

            <dialog id={`removesupermodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">REMOVE SUPER CUSTOMER
                        <br />
                        ID#:{props.id}
                    </h3>

                    <div>
                        <div className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Email</div>
                        <input value={props.email} type="email" disabled placeholder="Email" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">First name</div>
                        <input value={props.first_name} disabled type="text" placeholder="First Name" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Last Name</div>
                        <input value={props.last_name} type="text" disabled placeholder="Last Name" className="input input-bordered w-full max-w-lg" />
                    </div>

                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>

                    {/* Handle btn */}
                    <button onClick={handleComplete} className="btn btn-error mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "REMOVE SUPER SELLER"}

                    </button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleClose} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
const DeactivateCustomer = (props) => {
    // const location = useLocation();
    //logout when invalid token
    const { logout } = useAuth()

    //error message
    const [message, setMessage] = useState("Error.")

    //when clicked confirmed btn
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    //patch success
    const [success, setSuccess] = useState(false)
    //patch error
    const [err, setErr] = useState(false)

    //handle complete btn
    const handleDeactivate = () => {
        //clicked true to show the loading animation to btn
        setClicked(true)

        //data to patch
        const patchData = {
            "super_seller": props.super_seller,
            "active": false
        }
        //url to api
        const url = `/admin/customer/${props.id}/`
        //send request
        putToken(url, patchData)
            .then(data => {
                // const newUrl = new URL(`http://.../${location.search}`)
                // newUrl.searchParams.set("updated",props.title+Math.random(1))
                // navigate(newUrl.search)
                if (data.status === 200) {
                    //set success
                    setSuccess(true)
                }

                //stop loading animation
                setClicked(false)

            }).catch(error => {
                setErr(true)
                if (error.response) {
                    if (error.response.status === 401) {
                        logout() //logout when invalid token
                    } else if (error.response.status === 400) {
                        //error message
                        setMessage("Unexpected error.")
                    }
                } else {
                    //error message
                    setMessage("No response from server")
                }
                //stop loading animation

                setClicked(false)
            })
    }

    //close btn to remove the confirmation text
    const handleClose = () => {
        setSuccess(false)
        setErr(false)
    }
    return (
        <>

            <dialog id={`deactivatemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">DEACTIVATE USER
                        <br />
                        ID#:{props.id}
                    </h3>

                    <div className="categoryInput">
                        <div className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Email</div>
                        <input value={props.email} type="email" disabled placeholder="Email" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">First name</div>
                        <input value={props.first_name} disabled type="text" placeholder="First Name" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Last Name</div>
                        <input value={props.last_name} type="text" disabled placeholder="Last Name" className="input input-bordered w-full max-w-lg" />
                    </div>

                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>

                    {/* Handle btn */}
                    <button onClick={handleDeactivate} className="btn btn-error mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "DEACTIVATE USER"}

                    </button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleClose} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

const ReactivateCustomer = (props) => {
    // const location = useLocation();
    //logout when invalid token
    const { logout } = useAuth()

    //error message
    const [message, setMessage] = useState("Error.")

    //when clicked confirmed btn
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    //patch success
    const [success, setSuccess] = useState(false)
    //patch error
    const [err, setErr] = useState(false)

    //handle complete btn
    const handleDeactivate = () => {
        //clicked true to show the loading animation to btn
        setClicked(true)

        //data to patch
        const patchData = {
            "super_seller": props.super_seller,
            "active": true
        }
        //url to api
        const url = `/admin/customer/${props.id}/`
        //send request
        putToken(url, patchData)
            .then(data => {
                // const newUrl = new URL(`http://.../${location.search}`)
                // newUrl.searchParams.set("updated",props.title+Math.random(1))
                // navigate(newUrl.search)
                if (data.status === 200) {
                    //set success
                    setSuccess(true)
                }

                //stop loading animation
                setClicked(false)

            }).catch(error => {
                setErr(true)
                if (error.response) {
                    if (error.response.status === 401) {
                        logout() //logout when invalid token
                    } else if (error.response.status === 400) {
                        //error message
                        setMessage("Unexpected error.")
                    }
                } else {
                    //error message
                    setMessage("No response from server")
                }
                //stop loading animation

                setClicked(false)
            })
    }

    //close btn to remove the confirmation text
    const handleClose = () => {
        setSuccess(false)
        setErr(false)
    }
    return (
        <>

            <dialog id={`reactivatemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">REACTIVATE USER
                        <br />
                        ID#:{props.id}
                    </h3>

                    <div className="categoryInput">
                        <div className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Email</div>
                        <input value={props.email} type="email" disabled placeholder="Email" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">First name</div>
                        <input value={props.first_name} disabled type="text" placeholder="First Name" className="input input-bordered w-full max-w-lg" />
                        <div className="my-2 text-xl">Last Name</div>
                        <input value={props.last_name} type="text" disabled placeholder="Last Name" className="input input-bordered w-full max-w-lg" />
                    </div>

                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>

                    {/* Handle btn */}
                    <button onClick={handleDeactivate} className="btn btn-success mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "REACTIVATE USER"}

                    </button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleClose} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}