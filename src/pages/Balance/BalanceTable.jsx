import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/BalanceTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { getToken } from '../AxiosHeaders';
import { FlaotingError } from '../GlobalTemplates/FloatingError';
import { EmptyMessage } from '../GlobalTemplates/Empty';
import LoadingArea from '../GlobalTemplates/LoadingArea';

const BalanceTables = () => {
    const location = useLocation();
    const { logout } = useAuth()
    const [fetched, setFetched] = useState(false)
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState("Error.")
    const [count, setCount] = useState(0)

    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    const [url,setUrl] = useState(location.search===""?'/admin/balance/?search=&&limit=10':`/admin/balance/${location.search}`)
    const [nextUrl,setNexturl] = useState(null)
    const [previousUrl,setPreviousUrl] = useState(null)
    
    useEffect(() => {
        setUrl(`/admin/balance/${location.search}`)
        return () => {};
    }, [location.key]);

    useEffect(() => {
        setFetched(false)
        
        getToken(url)
        .then(response => {
            if (response.status === 200) {
                setCount(response.data.count)
                setData(response.data.results)
                setFetched(true)

                // Next prev

                setNexturl(response.data.next)
                setPreviousUrl(response.data.previous)
               
            }
        })
        .catch(error => {
            setErr(true)
            if (error.response) {
                if (error.response.status === 401) {
                    logout()
                } else {
                    setMessage("Unexprected error.")
                }
            } else {
                setMessage("No response received from the server.")
            }
        });

        return () => {
        };

    }, [url]);

    const handleSearch = ()=>{
        setCount(0)
        const newUrl = new URL('http://example.com'+url)
        newUrl.searchParams.set("search",search)
        newUrl.searchParams.set("limit",10)
        newUrl.searchParams.set("key",Math.random(1000))
        newUrl.searchParams.delete("offset")
        navigate(`${newUrl.search}`)
    }

    const handlePrev = ()=>{
        if(previousUrl===null){
            return;
        }
        const newUrl = new URL(previousUrl)
        navigate(`${newUrl.search}`)
    }
    const handleNext = ()=>{
        if(nextUrl===null){
            return;
        }
        const newUrl = new URL(nextUrl)
        navigate(`${newUrl.search}`)
    }
    
    return (
        <>
            {err ? <FlaotingError err={err} setErr={setErr} message={message} /> : ""}

            <div className={`${styles.BalanceTables} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Customer Balance
                </div>
            </div>
            <div className={`${styles.BalanceTables} flex items-center px-3 bg-[#F2F2F2]`}>
                <input onChange={e=>setSearch(e.target.value)} type="text" placeholder="Username" className="input input-bordered rounded-none w-full max-w-lg" />
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
                            <th>Customer ID</th>
                            <th>Username</th>
                            <th>Balance</th>
                            <th>On Hold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(balance => {
                            return <Row
                                key = {balance.id}
                                id = {balance.id}
                                username = {balance.user_name}
                                customer_id = {balance.customer}
                                balance = {balance.balance}
                                on_hold = {balance.on_hold}
                            />
                        }) : <tr></tr>}
                    </tbody>
                </table>
                <div className={`w-[100%] min-h-[450px] ${fetched ? "hidden" : ""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length < 1 ? "" : "hidden"}`}>
                    {<EmptyMessage message={"No user found."} />}
                </div>
            </div>

            <div className={`btnArea flex justify-center flex-wrap p-5 pb-2 ${count > 10 ? "" : "hidden"}`}>
                <div onClick={handlePrev} className="btn btn-primary w-[150px]"> Previous </div>
                <div onClick={handleNext} className="btn btn-primary w-[160px] ml-2"> Next </div>
            </div>
            <div className={`flex justify-center items-center p-2 pb-5 ${count > 10 ? "" : "hidden"}`}>
                <input type="text" placeholder="Page" className={` text-sm p-1 w-[50px] h-[30px] input rounded-none input-bordered`} />
                <div className="px-3 font-light">
                    of {Math.ceil(count/10)}
                </div>
                <div className="btn btn-sm btn-primary">Go</div>
            </div>
        </>
    )
}

export default BalanceTables

const Row = (props) => {
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.customer_id}</td>
                <td>{props.username}</td>
                <td className='text-primary font-bold'>${(props.balance).toFixed(2)}</td>
                <td className='text-primary font-bold'>${(props.on_hold).toFixed(2)}</td>
            </tr>
        </>
    )
}