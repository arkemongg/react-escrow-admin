import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/WithdrawalsTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { convertDatetimeToDate, getToken, putToken } from '../AxiosHeaders';
import { FlaotingError } from '../GlobalTemplates/FloatingError';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../GlobalTemplates/Empty';

const WithdrawalsTable = () => {
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
    const [url, setUrl] = useState(location.search === "" ? '/admin/withdrawals/' : `/admin/withdrawals/${location.search}`)
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
        setFilterValue(newUrl.searchParams.get("status") === null ? "" : newUrl.searchParams.get("status"))
        // Set page data accoriding to offset
        if (newUrl.searchParams.get("offset") === null) {
            setPageNumber(1)
        } else {
            let pageNumber = newUrl.searchParams.get("offset") / 10
            setPageNumber(pageNumber + 1)
        }
        //set the url to fetch the data
        setUrl(`/admin/withdrawals/${location.search}`)
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

        navigate(`?status=${event.target.value}`)
    }

    return (
        <>
            {/* floating erromessage */}
            {err ? <FlaotingError err={err} setErr={setErr} message={message} /> : ""}

            <div className={`${styles.WithdrawalsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Withdrawals
                </div>
            </div>
            <div className={`${styles.WithdrawalsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="USERNAME /ID" className="input input-bordered rounded-none w-full max-w-lg" />
                <div onClick={handleSearch} className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.WithdrawalsTable} flex items-center px-3`}>
                <select onChange={handleFilter} value={filterValue} className="select select-bordered rounded-none w-full max-w-lg">
                    <option value={""}>Filter</option>
                    <option value={"P"}>PENDING</option>
                    <option value={"F"}>FAILED</option>
                    <option value={"C"}>COMPLETED</option>
                </select>
            </div>

            <div className="overflow-x-auto min-h-[500px]">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>USERNAME</th>
                            <th>TOTAL AMOUNT</th>
                            <th>AMOUNT TO PAY</th>
                            <th>FEE %</th>
                            <th>COIN TYPE</th>
                            <th className='min-w-[360px]'>WITHDRAWAL ADDRESS</th>
                            <th >TX ID</th>
                            <th>STATUS</th>
                            <th className='min-w-[115px]'>CREATED AT</th>
                            <th className='min-w-[360px]'>MARK AS COMPLETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(withdraw => {
                            return <Row
                                key={withdraw.id}
                                id={withdraw.id}
                                username={withdraw.user}
                                total_amount={withdraw.total_amount}
                                amount={withdraw.amount}
                                fee={withdraw.fee}
                                crypto={withdraw.crypto}
                                crypto_address={withdraw.crypto_address}
                                status={withdraw.status}
                                TX_ID={withdraw.TX_ID}
                                created_at={withdraw.created_at}
                            />
                        }) : <tr></tr>}

                    </tbody>
                </table>
                {/* Handle loading or empty */}
                <div className={`w-[100%] min-h-[450px] ${fetched ? "hidden" : ""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length < 1 ? "" : "hidden"}`}>
                    {<EmptyMessage message={"No withdraw found ."} />}
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

export default WithdrawalsTable

const Row = (props) => {
    const escrow_pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const escrow_complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>
    const escrow_failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'> Failed </div>

    let status = escrow_pending

    if (props.status === 'F') {
        status = escrow_failed
    } else if (props.status === 'C') {
        status = escrow_complete
    }
    const handleComplete = (event) => {
        document.getElementById(`completemodal${props.id}`).showModal()
    }
    const handleFailed = (event) => {
        document.getElementById(`failedmodal${props.id}`).showModal()
    }
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.username}</td>
                <td className='text-primary font-bold'>${(props.total_amount).toFixed(2)}</td>
                <td className='text-error font-bold'>${(props.amount).toFixed(2)}</td>
                <td className='text-success font-bold'>{props.fee}%</td>
                <td>{props.crypto}</td>
                <td>{props.crypto_address}</td>
                <td>{props.TX_ID}</td>
                <td>{status}</td>
                <td>{convertDatetimeToDate(props.created_at)}</td>
                <td>
                    {props.status === 'P' ? <>
                        <span onClick={handleComplete} className='btn btn-success w-[160px] btn-sm' >MARK AS COMPLETE</span>
                        <span onClick={handleFailed} className='btn btn-error w-[160px] ml-2 btn-sm' >MARK AS FAILED</span>
                    </> : "-"}

                </td>
                <td>
                    {props.status === 'P' ? <>
                        <CompelteWithdrawals
                            id={props.id}
                            username={props.username}
                            total_amount={props.total_amount}
                            amount={props.amount}
                            fee={props.fee}
                            crypto={props.crypto}
                            crypto_address={props.crypto_address}
                            status={props.status}
                            TX_ID={props.TX_ID}
                            created_at={props.created_at}
                        />
                        <FailedWithdrawals
                            id={props.id}
                            username={props.username}
                            total_amount={props.total_amount}
                            amount={props.amount}
                            fee={props.fee}
                            crypto={props.crypto}
                            crypto_address={props.crypto_address}
                            status={props.status}
                            TX_ID={props.TX_ID}
                            created_at={props.created_at}
                        />
                    </> : ""}
                </td>
            </tr>
        </>
    )
}


const CompelteWithdrawals = (props) => {
    // const location = useLocation();
    const { logout } = useAuth()
    const [message, setMessage] = useState("Error.")
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)


    const [tx, setTX] = useState("-")

    const handleComplete = () => {
        setClicked(true)
        const patchData = {
            "status": "C",
            "TX_ID": tx
        }
        const url = `/admin/withdrawals/${props.id}/`
        putToken(url, patchData)
            .then(data => {
                // const newUrl = new URL(`http://.../${location.search}`)
                // newUrl.searchParams.set("updated",props.title+Math.random(1))
                // navigate(newUrl.search)
                if (data.status === 200) {
                    setSuccess(true)
                }
                setClicked(false)


            }).catch(error => {
                setErr(true)
                if (error.response) {
                    if (error.response.status === 401) {
                        logout()
                    } else if (error.response.status === 400) {
                        setMessage("Unexpected error /Already updated.")
                    }
                } else {
                    setMessage("No response from server")
                }
                setClicked(false)
            })
    }

    const handleClose = () => {
        setSuccess(false)
        setErr(false)
    }
    return (
        <>

            <dialog id={`completemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">COMPLETE WITHDRAWAL</h3>
                    <h3 className="font-bold text-lg">ID#:{props.id}</h3>

                    <div className="categoryInput">
                        <div htmlFor="username" className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Total Amount</div>
                        <input value={props.total_amount} type="text" disabled placeholder="Total Amount" className="input input-bordered w-full max-w-lg" />

                        <div htmlFor="amount" className="my-2 text-xl">Amount to pay</div>
                        <input value={props.amount} disabled type="text" placeholder="Amount" className="input input-bordered w-full max-w-lg" />

                        <div htmlFor="fee" className="my-2 text-xl">Fee %</div>
                        <input value={props.fee} disabled type="text" placeholder="Fee" className="input input-bordered w-full max-w-lg" />


                        <div htmlFor="status" className="my-2 text-xl">Coin Type</div>
                        <input value={props.crypto} type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Address</div>
                        <input value={props.crypto_address} type="text" disabled placeholder="created at" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">TXID</div>
                        <input onChange={e => setTX(e.target.value)} value={tx} type="text" placeholder="TXID" className="input input-bordered w-full max-w-lg" />
                    </div>
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    <button onClick={handleComplete} className="btn btn-success mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "MARK AS COMPLETE"}

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

const FailedWithdrawals = (props) => {
    // const location = useLocation();
    const { logout } = useAuth()
    const [message, setMessage] = useState("Error.")
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)

    const handleFailed = () => {
        setClicked(true)
        const patchData = {
            "status": "F",
            "TX_ID": "-"
        }
        const url = `/admin/withdrawals/${props.id}/`
        putToken(url, patchData)
            .then(data => {
                // const newUrl = new URL(`http://.../${location.search}`)
                // newUrl.searchParams.set("updated",props.title+Math.random(1))
                // navigate(newUrl.search)
                if (data.status === 200) {
                    setSuccess(true)
                }
                setClicked(false)

            }).catch(error => {
                setErr(true)
                if (error.response) {
                    if (error.response.status === 401) {
                        logout()
                    } else if (error.response.status === 400) {
                        setMessage("Unexpected error /Already updated.")
                    }
                } else {
                    setMessage("No response from server")
                }
                setClicked(false)
            })
    }

    const handleClose = () => {
        setSuccess(false)
        setErr(false)
    }
    return (
        <>

            <dialog id={`failedmodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">FAIL WITHDRAWAL</h3>
                    <h3 className="font-bold text-lg">ID#:6940</h3>
                    <h3 className="text-error text-sm"> ***Marking fail will return the full balance to the customer.</h3>
                    <div className="categoryInput">
                        <div htmlFor="username" className="my-2 text-xl">Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Total Amount</div>
                        <input value={props.total_amount} type="text" disabled placeholder="Total Amount" className="input input-bordered w-full max-w-lg" />

                        <div htmlFor="amount" className="my-2 text-xl">Amount to pay</div>
                        <input value={props.amount} disabled type="text" placeholder="Amount" className="input input-bordered w-full max-w-lg" />

                        <div htmlFor="fee" className="my-2 text-xl">Fee %</div>
                        <input value={props.fee} disabled type="text" placeholder="Fee" className="input input-bordered w-full max-w-lg" />


                        <div htmlFor="status" className="my-2 text-xl">Coin Type</div>
                        <input value={props.crypto} type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Address</div>
                        <input value={props.crypto_address} type="text" disabled placeholder="created at" className="input input-bordered w-full max-w-lg" />

                    </div>
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    <button onClick={handleFailed} className="btn btn-error mt-2 w-[200px]">

                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "MARK AS FAILED"}

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