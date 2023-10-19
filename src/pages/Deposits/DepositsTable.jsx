import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/DepositsTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { convertDatetimeToDate, getToken } from '../AxiosHeaders';
import { FlaotingError } from '../GlobalTemplates/FloatingError';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../GlobalTemplates/Empty';

const DepositsTable = () => {
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
    const [url, setUrl] = useState(location.search === "" ? '/admin/transactions/' : `/admin/transactions/${location.search}`)
    // next from api
    const [nextUrl, setNexturl] = useState(null)

    //prev from api
    const [previousUrl, setPreviousUrl] = useState(null)
    // Page number default 1
    const [pageNumber, setPageNumber] = useState(1)

    // Set the page number according to reload/search/next/prev as the naviagate to new url
    useEffect(() => {
        const newUrl = new URL(`http://.../${location.search}`)
        setSearch(newUrl.searchParams.get("search"))
        // Set page data accoriding to offset
        if (newUrl.searchParams.get("offset") === null) {
            setPageNumber(1)
        } else {
            let pageNumber = newUrl.searchParams.get("offset") / 10
            setPageNumber(pageNumber + 1)
        }
        //set the url to fetch the data
        setUrl(`/admin/transactions/${location.search}`)
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

        // if(newUrl.searchParams.get("offset")===null){
        //     setPageNumber(1)
        // }else{
        //     let pageNumber = newUrl.searchParams.get("offset")/10
        //         setPageNumber(pageNumber+1)
        // }
    }
    const handleNext = () => {
        if (nextUrl === null) {
            return;
        }
        const newUrl = new URL(nextUrl)//next url genrated by api

        navigate(`${newUrl.search}`)
        // if(newUrl.searchParams.get("offset")===null){
        //     setPageNumber(1)
        // }else{
        //     let pageNumber = newUrl.searchParams.get("offset")/10
        //         setPageNumber(pageNumber+1)
        // }
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

            <div className={`${styles.DepositsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Deposits
                </div>
            </div>
            <div className={`${styles.DepositsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder="Username / ID" className="input input-bordered rounded-none w-full max-w-lg" />
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

            <div className="overflow-x-auto min-h-[450px]">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>USERNAME</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                            <th>CREATED AT</th>
                            <th>PAYMENT LINK</th>

                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(deposit => {
                            return <Row
                                key={deposit.id}
                                id={deposit.id}
                                username={deposit.user}
                                amount={deposit.amount}
                                status = {deposit.status}
                                created_at = {deposit.created_at}
                                payment_url = {deposit.payment_url_for_admin}
                            />
                        }) : <tr></tr>}

                    </tbody>

                </table>
                {/* Handle loading or empty */}
                <div className={`w-[100%] min-h-[450px] ${fetched ? "hidden" : ""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length < 1 ? "" : "hidden"}`}>
                    {<EmptyMessage message={"No deposit found."} />}
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

export default DepositsTable

const Row = (props) => {
    const escrow_pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const escrow_complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>
    const escrow_failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'> Failed </div>
    
    let status = escrow_pending

    if(props.status==='F'){
        status = escrow_failed
    }else if(props.status==='C'){
        status = escrow_complete
    }
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.username}</td>
                <td className='text-primary font-bold'>${(props.amount).toFixed(2)}</td>
                <td>{status}</td>
                <td>{convertDatetimeToDate(props.created_at)}</td>
                <td>{props.payment_url}</td>
            </tr>
        </>
    )
}