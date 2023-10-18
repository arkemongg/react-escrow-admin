import { useEffect, useState } from 'react';
import styles from './styles/ReviewsTable.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { getToken, putToken } from '../AxiosHeaders';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../GlobalTemplates/Empty';

const ReviewsTable = () => {
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
    const [url, setUrl] = useState(location.search === "" ? '/admin/feedback/' : `/admin/feedback/${location.search}`)
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
        setFilterValue(newUrl.searchParams.get("featured") === null ? "" : newUrl.searchParams.get("featured"))
        // Set page data accoriding to offset
        if (newUrl.searchParams.get("offset") === null) {
            setPageNumber(1)
        } else {
            let pageNumber = newUrl.searchParams.get("offset") / 10
            setPageNumber(pageNumber + 1)
        }
        //set the url to fetch the data
        setUrl(`/admin/feedback/${location.search}`)
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

        navigate(`?featured=${event.target.value}`)
    }
    return (
        <>
            <div className={`${styles.ReviewsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Reviews
                </div>
            </div>
            <div className={`${styles.ReviewsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="SELLER USERNAME / ID / BUYER USERNAME" className="input input-bordered rounded-none w-full max-w-lg" />
                <div onClick={handleSearch} className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>


            <div className="overflow-x-auto min-h-[500px]">
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
                        {fetched ? data.map(review => {
                            return <Row
                                key={review.id}
                                id={review.id}
                                seller_username={review.seller_username}
                                reviewer_username={review.reviewer_username}
                                rating={review.rating}
                                comment={review.comment}
                                completed={review.completed}
                            />
                        }) : <tr></tr>}
                    </tbody>
                </table>
                {/* Handle loading or empty */}
                <div className={`w-[100%] min-h-[450px] ${fetched ? "hidden" : ""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length < 1 ? "" : "hidden"}`}>
                    {<EmptyMessage message={"No reviews found."} />}
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

export default ReviewsTable

const Row = (props) => {
    const handleEdit = (event) => {
        document.getElementById(`updatemodal${props.id}`).showModal()
    }
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.seller_username}</td>
                <td>{props.reviewer_username}</td>
                <td className='flex items-center'>{props.rating} <img className='w-[15px] h-[15px]' src="/star.png" alt="" /></td>
                <td>{props.comment}</td>
                <td>{props.completed ? "YES" : "NO"}</td>
                <td>
                    <span onClick={handleEdit} className='btn btn-success w-[150px] btn-sm' >Edit</span>
                </td>
                <UpdateReview id={props.id}
                    seller_username={props.seller_username}
                    reviewer_username={props.reviewer_username}
                    rating={props.rating}
                    comment={props.comment} />
            </tr>
        </>
    )
}


const UpdateReview = (props) => {
    const [rating, setRating] = useState(props.rating)
    const [comment, setComment] = useState(props.comment)

    // const location = useLocation();
    const { logout } = useAuth()
    const [message, setMessage] = useState("Error.")
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const handleUpdate = () => {
        if (rating < 1 || rating > 5) {
            setErr(true)
            setMessage("Rating should be 1-5.")
            return;
        }
        setClicked(true)
        const patchData = {
            "rating": rating,
            "comment": comment
        }
        const url = `/admin/feedback/${props.id}/`
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
                        setMessage("Unexpected error.")
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

            <dialog id={`updatemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">EDIT REVIEW</h3>
                    <h3 className="font-bold text-lg">ID#:{props.id}</h3>

                    <div className="categoryInput">
                        <div className="my-2 text-xl">Seller Username</div>
                        <input value={props.seller_username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Reviewer  Username</div>
                        <input value={props.reviewer_username} type="text" disabled placeholder="Username" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Rating</div>
                        <input onChange={e => setRating(e.target.value)} value={rating} type="text" placeholder="Rating" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Comment</div>
                        <input onChange={e => setComment(e.target.value)} value={comment} type="text" placeholder="Comment" className="input input-bordered w-full max-w-lg" />

                    </div>
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    <button onClick={handleUpdate} className="btn btn-success mt-2 w-[200px]">
                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "UPDATE REVIEW"}
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