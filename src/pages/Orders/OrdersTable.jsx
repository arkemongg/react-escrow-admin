import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/OrdersTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { convertDatetimeToDate, getToken, putToken } from '../AxiosHeaders';
import { FlaotingError } from '../GlobalTemplates/FloatingError';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../GlobalTemplates/Empty';
import { apiUrl } from '../Urls';

const OrdersTable = () => {
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
    const [url, setUrl] = useState(location.search === "" ? '/admin/orders/' : `/admin/orders/${location.search}`)
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
        setFilterValue(newUrl.searchParams.get("order_status") === null ? "" : newUrl.searchParams.get("order_status"))
        // Set page data accoriding to offset
        if (newUrl.searchParams.get("offset") === null) {
            setPageNumber(1)
        } else {
            let pageNumber = newUrl.searchParams.get("offset") / 10
            setPageNumber(pageNumber + 1)
        }
        //set the url to fetch the data
        setUrl(`/admin/orders/${location.search}`)
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

        navigate(`?order_status=${event.target.value}`)
    }
    return (
        <>
            {/* floating erromessage */}
            {err ? <FlaotingError err={err} setErr={setErr} message={message} /> : ""}

            <div className={`${styles.OrdersTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Orders
                </div>
            </div>
            <div className={`${styles.OrdersTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="USERNAME / ORDER ID" className="input input-bordered rounded-none w-full max-w-lg" />
                <div onClick={handleSearch} className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.OrdersTable} flex items-center px-3`}>
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
                            <th>BUYER USERNAME</th>
                            <th>SELLER USERNAME</th>
                            <th>ORDER STATUS</th>

                            <th className='min-w-[250px]'>PRODUCT TITLE</th>
                            <th>PRODUCT IMG</th>
                            <th>PRODUCT QTY</th>
                            <th>TOTAL</th>
                            <th>CREATED AT</th>
                            <th className='min-w-[360px]'>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(order => {
                            return <Row
                                key={order.id}
                                id={order.id}
                                buyer_username={order.buyer_username}
                                seller_username={order.seller_username}
                                status={order.order_status}
                                created_at={order.created_at}

                                product={order.orderitems[0].productTitle}
                                img={order.orderitems[0].productImage}
                                qty={order.orderitems[0].quantity}
                                price={order.orderitems[0].unit_price}

                            />
                        }) : <tr></tr>}
                    </tbody>
                </table>
                {/* Handle loading or empty */}
                <div className={`w-[100%] min-h-[450px] ${fetched ? "hidden" : ""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length < 1 ? "" : "hidden"}`}>
                    {<EmptyMessage message={"No order found."} />}
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

export default OrdersTable

const Row = (props) => {
    var img = apiUrl + props.img;
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
                <td>{props.buyer_username}</td>
                <td>{props.seller_username}</td>
                <td>{status}</td>

                <td>{props.product}</td>
                <td>
                    <img className='w-[80px] h-[80px] border-2 rounded-lg' src={img} alt="" />
                </td>
                <td>{props.qty}</td>
                <td className='text-primary font-bold'>${(props.qty * props.price).toFixed(2)}</td>
                <td className='min-w-[110px]'>{convertDatetimeToDate(props.created_at)}</td>
                <td>
                    {props.status === 'P' ? <>
                        <span onClick={handleComplete} className='btn btn-success w-[160px] btn-sm' >MARK AS COMPLETE</span>
                        <span onClick={handleFailed} className='btn btn-error w-[160px] ml-2 btn-sm' >MARK AS FAILED</span>
                    </> : "-"}
                </td>
                {props.status === 'P' ? <td>
                    <CompelteOrder
                        id={props.id}
                        buyer_username={props.buyer_username}
                        seller_username={props.seller_username}
                        status={props.status}
                        created_at={props.created_at}
                        product={props.product}
                        img={img}
                        qty={props.qty}
                        price={props.price}
                    />
                    <FailedOrder
                        id={props.id}
                        buyer_username={props.buyer_username}
                        seller_username={props.seller_username}
                        status={props.status}
                        created_at={props.created_at}
                        product={props.product}
                        img={img}
                        qty={props.qty}
                        price={props.price}
                    />
                </td> : ""}
            </tr>
        </>
    )
}

const CompelteOrder = (props) => {
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
            "order_status": "C"
        }
        //url to api
        const url = `/admin/orders/${props.id}/`
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
                        setMessage("Unexpected error /Already updated.")
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
                    <h3 className="font-bold text-lg">COMPLETE ORDER</h3>
                    <h3 className="font-bold text-lg">ID#:{props.id}</h3>
                    <h3 className="text-error text-sm"> ***Marking complete will transfer the balance to seller from buyer.</h3>

                    <div className="categoryInput">
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.img} alt="" />
                        </div>
                        <div className="my-2 text-xl">Product Title</div>
                        <input value={props.product} disabled type="text" placeholder="Product" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Buyer Username</div>
                        <input value={props.buyer_username} disabled type="text" placeholder="Buyer Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Seller Username</div>
                        <input value={props.seller_username} type="text" disabled placeholder="Seller Username" className="input input-bordered w-full max-w-lg" />


                        <div className="my-2 text-xl">QTY</div>
                        <input value={props.qty} disabled type="text" placeholder="QTY" className="input input-bordered w-full max-w-lg" />
                        
                        <div className="my-2 text-xl">Total</div>
                        <input  value={'$'+(props.qty * props.price).toFixed(2)} disabled type="text" placeholder="Total" className=" input input-bordered w-full max-w-lg" />
                        

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input value={props.status} type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />

                    </div>
                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    
                    {/* Handle btn */}
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

const FailedOrder = (props) => {
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
    const handleFailed = () => {
        //clicked true to show the loading animation to btn
        setClicked(true)

        //data to patch
        const patchData = {
            "order_status": "F"
        }
        //url to api
        const url = `/admin/orders/${props.id}/`
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
                        setMessage("Unexpected error /Already updated.")
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

            <dialog id={`failedmodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">FAILED ORDER</h3>
                    <h3 className="font-bold text-lg">ID#:{props.id}</h3>
                    <h3 className="text-error text-sm"> ***Marking fail will release the balance from on hold.</h3>

                    <div className="categoryInput">
                    <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.img} alt="" />
                        </div>
                        <div className="my-2 text-xl">Product Title</div>
                        <input value={props.product} disabled type="text" placeholder="Product" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Buyer Username</div>
                        <input value={props.buyer_username} disabled type="text" placeholder="Buyer Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Seller Username</div>
                        <input value={props.seller_username} type="text" disabled placeholder="Seller Username" className="input input-bordered w-full max-w-lg" />


                        <div className="my-2 text-xl">QTY</div>
                        <input value={props.qty} disabled type="text" placeholder="QTY" className="input input-bordered w-full max-w-lg" />
                        
                        <div className="my-2 text-xl">Total</div>
                        <input  value={'$'+(props.qty * props.price).toFixed(2)} disabled type="text" placeholder="Total" className=" input input-bordered w-full max-w-lg" />
                        

                        <div htmlFor="status" className="my-2 text-xl">Status</div>
                        <input value={props.status} type="text" disabled placeholder="Status" className="input input-bordered w-full max-w-lg" />

                    </div>
                    {/* confirmation text */}
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    
                    {/* handle buttons */}
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