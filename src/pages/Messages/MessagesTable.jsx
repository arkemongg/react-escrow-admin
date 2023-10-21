import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/MessagesTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { convertDatetimeToDate, getToken } from '../AxiosHeaders';
import { FlaotingError } from '../GlobalTemplates/FloatingError';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../GlobalTemplates/Empty';

const MessagesTable = () => {
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
    const [url, setUrl] = useState(location.search === "" ? '/admin/conversations/' : `/admin/conversations/${location.search}`)
    // next from api
    const [nextUrl, setNexturl] = useState(null)

    //prev from api
    const [previousUrl, setPreviousUrl] = useState(null)
    // Page number default 1
    const [pageNumber, setPageNumber] = useState(1)

    // Set the page number according to reload/search/next/prev as the naviagate to new url
    useEffect(() => {
        const newUrl = new URL(`http://.../${location.search}`)
        setSearch(newUrl.searchParams.get("search") === null ? "" : newUrl.searchParams.get("search"))
        // Set page data accoriding to offset
        if (newUrl.searchParams.get("offset") === null) {
            setPageNumber(1)
        } else {
            let pageNumber = newUrl.searchParams.get("offset") / 10
            setPageNumber(pageNumber + 1)
        }
        //set the url to fetch the data
        setUrl(`/admin/conversations/${location.search}`)
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

            <div className={`${styles.MessagesTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Messages
                </div>
            </div>
            <div className={`${styles.MessagesTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Username / Conversations ID" className="input input-bordered rounded-none w-full max-w-lg" />
                <div onClick={handleSearch} className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>


            <div className="overflow-x-auto min-h-[450px]">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>USERNAME ONE</th>
                            <th>USERNAME TWO</th>
                            <th>MESSAGES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(conversation => {
                            return <Row
                                key={conversation.id}
                                id={conversation.id}
                                username_one={conversation.username_one}
                                username_two={conversation.username_two}
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

export default MessagesTable

const Row = (props) => {
    const { logout } = useAuth()
    const [count, setCount] = useState([])
    const [url, setUrl] = useState(`/admin/messages/?search=${props.id}`)
    const [nextUrl, setNextUrl] = useState()
    const [data, setData] = useState([])
    const handleMessage = () => {
        setData([])
        document.getElementById(`messagemodal${props.id}`).showModal()

            const messageData = getToken(url)
            messageData.then(data => {
                setData(oldData => [...oldData, ...data.data.results])
                setCount(data.data.count)
                //next
                setNextUrl(data.data.next)
            }).catch(error => {
                if (error.response) {
                    //401 = unauthoirized
                    if (error.response.status === 401) {
                        logout()
                    } else {
                        alert("Unexpected error.")
                    }
                } else {
                    // backend down
                    alert("No response received from the server.")
                }
            })

    }


    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.username_one}</td>
                <td>{props.username_two}</td>
                <td>
                    <span onClick={handleMessage} className='btn btn-success w-[160px] btn-sm' >View Messages</span>
                    <Message
                        id={props.id}
                        user_one={props.username_one}
                        user_two={props.username_two}
                        data={data}
                        count={count}
                        nextUrl = {nextUrl}
                        setNextUrl = {setNextUrl}
                        setData = {setData}
                    />
                </td>
            </tr>
        </>
    )
}

const Message = (props) => {
    const { logout } = useAuth()

    const handleLoadMore = () => {
        if(props.nextUrl===null){
            return;
        }
        document.getElementById(`messagemodal${props.id}`).showModal()
        
            const messageData = getToken(props.nextUrl)
            messageData.then(data => {
                props.setData(oldData => [...oldData, ...data.data.results])
                props.setNextUrl(data.data.next)
            }).catch(error => {
                if (error.response) {
                    //401 = unauthoirized
                    if (error.response.status === 401) {
                        logout()
                    } else {
                        alert("Unexpected error.")
                    }
                } else {
                    // backend down
                    alert("No response received from the server.")
                }
            })

    }

    return (
        <>
            <dialog id={`messagemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Messages</h3>
                    {props.data.map(message => {
                        if (message.username === props.user_one) {
                            return <ChatStart
                                key={message.id}
                                username={message.username}
                                message={message.message}
                                created_at={message.created_at}
                            />
                        } else {
                            return <ChatEnd
                                key={message.id}
                                username={message.username}
                                message={message.message}
                                created_at={message.created_at}
                            />
                        }
                    })}
                    {props.count > 10 ? <div onClick={handleLoadMore} className='btn btn-primary'>Load  More</div> : ""}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

const ChatStart = (props) => {
    return (
        <>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="/dashboard/client.png" />
                    </div>
                </div>
                <div className="chat-header">
                    {props.username}
                    <time className="text-xs opacity-50"> {convertToReadableTime(props.created_at)}</time>
                </div>
                <div className="chat-bubble">{props.message}</div>
            </div>

        </>
    )
}
const ChatEnd = (props) => {
    return (
        <>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="/dashboard/client.png" />
                    </div>
                </div>
                <div className="chat-header">
                    {props.username}

                    <time className="text-xs opacity-50"> {convertToReadableTime(props.created_at)}</time>
                </div>
                <div className="chat-bubble chat-bubble-primary">{props.message}</div>
            </div>
        </>
    )
}

function convertToReadableTime(timestamp) {
    const dt = new Date(timestamp);
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const day = String(dt.getDate()).padStart(2, '0');
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    const seconds = String(dt.getSeconds()).padStart(2, '0');


    const readableTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return readableTime;
}