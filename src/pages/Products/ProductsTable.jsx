import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles/ProductsTable.module.css'
import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { getToken, patchToken, putToken } from '../AxiosHeaders';
import { EmptyMessage } from '../GlobalTemplates/Empty';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { apiUrl } from '../Urls';

const ProductsTable = () => {
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
    const [url, setUrl] = useState(location.search === "" ? '/admin/products/' : `/admin/products/${location.search}`)
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
        setUrl(`/admin/products/${location.search}`)
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
            <div className={`${styles.ProductsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Products
                </div>
            </div>
            <div className={`${styles.ProductsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="USERNAME / PRODUCTS ID" className="input input-bordered rounded-none w-full max-w-lg" />
                <div onClick={handleSearch} className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.ProductsTable} flex items-center px-3`}>
                <select onChange={handleFilter} value={filterValue} className="select select-bordered rounded-none w-full max-w-lg">
                    <option value={""}>Filter</option>
                    <option value={true}>FEATURED</option>
                    <option value={false}>NOT_FEATURED</option>
                </select>
            </div>

            <div className="overflow-x-auto min-h-[500px]">
                <table className="table table-zebra ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className='min-w-[250px]'>PRODUCT TITLE</th>
                            <th >DESCRIPTION</th>
                            <th>PRODUCT IMG</th>
                            <th>INVENTORY</th>
                            <th>PRICE</th>
                            <th>SELLER USERNAME</th>
                            <th>SALES</th>
                            <th>VIEW COUNT</th>
                            <th>FEATURED</th>

                            <th className='min-w-[370px]'>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetched ? data.map(product => {
                            return <Row
                                key={product.id}
                                id={product.id}
                                username={product.user}
                                title={product.title}
                                description={product.description}
                                image={product.image}
                                price={product.price}
                                inventory={product.inventory}
                                sales={product.sales}
                                featured={product.featured}
                                view_count={product.view_count}
                            />
                        }) : <tr></tr>}
                    </tbody>
                </table>
                {/* Handle loading or empty */}
                <div className={`w-[100%] min-h-[450px] ${fetched ? "hidden" : ""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length < 1 ? "" : "hidden"}`}>
                    {<EmptyMessage message={"No products found ."} />}
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

export default ProductsTable

const Row = (props) => {
    var img = apiUrl + props.image;
    const handleFeatured = (event) => {
        document.getElementById(`featuredmodal${props.id}`).showModal()
    }
    const handleRemoveFeatured = (event) => {
        document.getElementById(`removemodal${props.id}`).showModal()
    }
    const handleDelist = (event) => {
        document.getElementById(`delistmodal${props.id}`).showModal()
    }
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.title}</td>
                <td title={props.description} className='whitespace-nowrap max-w-[250px] overflow-hidden'>{props.description}</td>
                <td>
                    <img className='w-[80px] h-[80px] border-2 rounded-lg' src={img} alt="image" />
                </td>
                <td>{props.inventory}</td>
                <td className='text-primary'>${props.price}</td>
                <td>{props.username}</td>
                <td>{props.sales}</td>
                <td>{props.view_count}</td>
                <td>{props.featured ? "YES" : "NO"}</td>

                <td>
                    {props.featured ? <span onClick={handleRemoveFeatured} className='btn btn-error w-[170px] btn-sm' >REMOVE FEATURED</span> : <span onClick={handleFeatured} className='btn btn-success w-[170px] btn-sm' >MARK AS FEATURED</span>}
                    <span onClick={handleDelist} className='btn btn-error w-[160px] ml-2 btn-sm' >DELIST</span>
                </td>
                <td>
                    {props.featured ? <RemoveFeaturedProduct id={props.id} image={img} title={props.title} username={props.username} /> : <FeaturedProduct id={props.id} image={img} title={props.title} username={props.username} />}
                    <DelistProduct id={props.id} image={img} title={props.title} username={props.username} />
                </td>
            </tr>
        </>
    )
}


const FeaturedProduct = (props) => {
    // const location = useLocation();
    const { logout } = useAuth()
    const [message, setMessage] = ["Error."]
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const handleFeatured = () => {
        setClicked(true)
        const patchData = {
            "featured": true,
        }
        const url = `/admin/products/${props.id}/`
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

            <dialog id={`featuredmodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Featured Product
                        <br />
                        ID#:{props.id}
                    </h3>

                    <div className="productInput">
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.image} alt="image" />
                        </div>
                        <div className="my-2 text-xl">Title</div>
                        <input value={props.title} disabled type="text" placeholder="Title" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Seller Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg mb-2" />


                    </div>
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    <button onClick={handleFeatured} className="btn btn-success mt-2 w-[200px]">
                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "MARK AS FEATURED"}

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
const DelistProduct = (props) => {
    // const location = useLocation();
    const { logout } = useAuth()
    const [message, setMessage] = useState("Error.")
    const [clicked, setClicked] = useState(false)
    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const handleDelist = () => {
        setClicked(true)
        const patchData = {
            "expired": true,
        }
        const url = `/admin/products/${props.id}/`
        putToken(url, patchData)
            .then(data => {
                if (data.status === 200) {
                    setSuccess(true)
                    setClicked(false)
                }

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

            <dialog id={`delistmodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delist Product
                        <br />
                        ID#:{props.id}
                    </h3>

                    <div className="productInput">
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.image} alt="image" />
                        </div>
                        <div className="my-2 text-xl">Title</div>
                        <input value={props.title} disabled type="text" placeholder="Title" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Seller Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg mb-2" />

                    </div>
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    <button onClick={handleDelist} className="btn btn-error mt-2 w-[200px]">
                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "DELIST"}
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

const RemoveFeaturedProduct = (props) => {
    // const location = useLocation();
    const { logout } = useAuth()
    const [message, setMessage] = useState("Error.")
    const [clicked, setClicked] = useState(false)

    // Navigate new url because it should be stored in memory so go back/forward will work
    // const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const handleRemoveFeatured = () => {
        setClicked(true)
        const patchData = {
            "featured": false,
        }
        const url = `/admin/products/${props.id}/`
        putToken(url, patchData)
            .then(data => {
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

            <dialog id={`removemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delist Product
                        <br />
                        ID#:{props.id}
                    </h3>

                    <div className="productInput">
                        <div className="my-2 ">
                            <img className='w-[328px] h-[250px] m-auto ' src={props.image} alt="image" />
                        </div>
                        <div className="my-2 text-xl">Title</div>
                        <input value={props.title} disabled type="text" placeholder="Title" className="input input-bordered w-full max-w-lg" />

                        <div className="my-2 text-xl">Seller Username</div>
                        <input value={props.username} disabled type="text" placeholder="Username" className="input input-bordered w-full max-w-lg mb-2" />

                    </div>
                    <p className={`text-success  ${success ? '' : 'hidden'}`}>Successfully updated.</p>
                    <p className={`text-error  ${err ? '' : 'hidden'}`}>{message}</p>
                    <button onClick={handleRemoveFeatured} className="btn btn-error mt-2 w-[200px]">
                        {clicked ? <span className="loading loading-dots loading-xs"></span> : "REMOVE FEATURED"}
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