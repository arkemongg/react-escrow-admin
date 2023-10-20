import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/VerificationsTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { getToken, putToken } from '../AxiosHeaders';
import { FlaotingError } from '../GlobalTemplates/FloatingError';
import { EmptyMessage } from '../GlobalTemplates/Empty';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { apiUrl } from '../Urls';

const VerificationsTable = () => {
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
    const [url, setUrl] = useState(location.search === "" ? '/admin/verification/' : `/admin/verification/${location.search}`)
    // next from api
    const [nextUrl, setNexturl] = useState(null)

    //prev from api
    const [previousUrl, setPreviousUrl] = useState(null)
    // Page number default 1
    const [pageNumber, setPageNumber] = useState(1)

    // Set the page number according to reload/search/next/prev as the naviagate to new url

    //Filter status
    const [filterValue, setFilterValue] = useState("")
    useEffect(() => {
        const newUrl = new URL(`http://.../${location.search}`)
        //set search value
        setSearch(newUrl.searchParams.get("search") === null ? "" : newUrl.searchParams.get("search"))
        setFilterValue(newUrl.searchParams.get("completed") === null ? "" : newUrl.searchParams.get("completed"))
        // Set page data accoriding to offset
        if (newUrl.searchParams.get("offset") === null) {
            setPageNumber(1)
        } else {
            let pageNumber = newUrl.searchParams.get("offset") / 10
            setPageNumber(pageNumber + 1)
        }
        //set the url to fetch the data
        setUrl(`/admin/verification/${location.search}`)
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

    const handleFilter = (event) => {
        setFilterValue(event.target.value)

        navigate(`?completed=${event.target.value}`)
    }
    return (
        <>
            {/* floating erromessage */}
            {err ? <FlaotingError err={err} setErr={setErr} message={message} /> : ""}

            <div className={`${styles.VerificationsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Verifications
                </div>
            </div>
            <div className={`${styles.VerificationsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="USERNAME " className="input input-bordered rounded-none w-full max-w-lg" />
                <div onClick={handleSearch} className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.VerificationsTable} flex items-center px-3`}>
                <select onChange={handleFilter} value={filterValue} className="select select-bordered rounded-none w-full max-w-lg">
                    <option value={""}>Filter</option>
                    <option value={"false"}>PENDING</option>
                    <option value={"true"}>COMPLETED</option>
                </select>
            </div>

            <div className="overflow-x-auto min-h-[500px]">
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
                            <th className='min-w-[500px]'>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(customer => {
                            return <Row
                                key={customer.id}
                                id={customer.id}
                                username={customer.username}
                                fullname={customer.fullname}
                                nid_verify_front={customer.nid_verify_front}
                                nid_verify_back={customer.nid_verify_back}
                                nid_verify_selfie={customer.nid_verify_selfie}
                                completed={customer.completed}
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

export default VerificationsTable

const Row = (props) => {
    const nid_verify_front = apiUrl + props.nid_verify_front
    const nid_verify_back = apiUrl + props.nid_verify_back
    const nid_verify_selfie = apiUrl + props.nid_verify_selfie

    const pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>

    let status = pending
    if (props.completed) {
        status = complete
    }
    const handleComplete = (event) => {
        document.getElementById(`completemodal${props.id}`).showModal()
    }
    const handleCancel = (event) => {
        document.getElementById(`cancelmodal${props.id}`).showModal()
    }
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.username}</td>
                <td>{props.fullname}</td>
                <td> <img className='w-[80px] h-[80px] border-2  rounded-lg' src={nid_verify_front} alt="" />
                </td>
                <td><img className='w-[80px] h-[80px] border-2  rounded-lg' src={nid_verify_back} alt="" /></td>
                <td><img className='w-[80px] h-[80px] border-2  rounded-lg' src={nid_verify_selfie} alt="" /></td>
                <td>{status}</td>
                <td>
                    {props.completed ? "" : <span onClick={handleComplete} className='btn btn-success w-[160px] btn-sm' >MARK AS VERIFIED</span>}
                    <span onClick={handleCancel} className='btn btn-error w-[300px] ml-2 btn-sm' >CANCEL/RESUBMIT/REMOVE VERIFIED</span>
                </td>
                <td>
                    {props.completed ? "" :
                        <CompelteVerification
                            nid_verify_front={nid_verify_front}
                            nid_verify_back={nid_verify_back}
                            nid_verify_selfie={nid_verify_selfie}
                            id={props.id}
                            username={props.username}
                            fullname={props.fullname}
                            completed={props.completed}
                        />
                    }

                    <CancelVerification
                        nid_verify_front={nid_verify_front}
                        nid_verify_back={nid_verify_back}
                        nid_verify_selfie={nid_verify_selfie}
                        id={props.id}
                        username={props.username}
                        fullname={props.fullname}
                        completed={props.completed}
                    />
                </td>
            </tr>
        </>
    )
}

const CompelteVerification = (props) => {
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
            "submited": true,
            "completed": true
        }
        //url to api
        const url = `/admin/verification/${props.id}/`
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
            <dialog id={`completemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Complete Verification</h3>
                    <h3 className="font-bold text-lg">ID#:{props.id}</h3>

                    <div>

                        <div className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Customer Name</div>
                        <input value={props.fullname} disabled type="text" placeholder="Customer Name" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl text-center">NID Front</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.nid_verify_front} alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">NID Back</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.nid_verify_back} alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">Selfie</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.nid_verify_selfie} alt="" />
                        </div>

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input value={props.completed?"COMPLETE":"PENDING"} type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                    </div>
                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>

                    {/* Handle btn */}
                    <button onClick={handleComplete} className="btn btn-success mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "MARK AS VERIFIED"}

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

const CancelVerification = (props) => {
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
    const handleCancel = () => {
        //clicked true to show the loading animation to btn
        setClicked(true)

        //data to patch
        const patchData = {
            "submited": false,
            "completed": false
        }
        //url to api
        const url = `/admin/verification/${props.id}/`
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
            <dialog id={`cancelmodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Cancel Verification</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>

                    <div>

                    <div className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Customer Name</div>
                        <input value={props.fullname} disabled type="text" placeholder="Customer Name" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl text-center">NID Front</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.nid_verify_front} alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">NID Back</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.nid_verify_back} alt="" />
                        </div>

                        <div className="my-2 text-xl text-center">Selfie</div>
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.nid_verify_selfie} alt="" />
                        </div>

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input value={props.completed?"COMPLETE":"PENDING"} type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />
                    
                    </div>

                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>

                    {/* Handle btn */}
                    <button onClick={handleCancel} className="btn btn-error mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "REMOVE VERIFY / CANCEL"}

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