import { Outlet, Link } from "react-router-dom";
import './Nav.css'
const Navigation = () => {
    
        const closeDrawer = () => {
          const drawerToggle = document.getElementById('my-drawer');
          if (drawerToggle.checked) {
            drawerToggle.checked = false; // Uncheck the checkbox to hide the drawer
          }
        }

    return (
        <>
            <div className="navbar bg-base-100 border-b-[0.1px] border-gray-300">
                <div className="navbar-start">
                    <div className="drawer">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn btn-ghost btn-circle drawer-button"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg></label>
                        </div>

                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay right-[0] cursor-pointer w-[50px] h-[50px] z-10 fixed">
                                    <img className="w-[30px] h-[30px]" src="/delete.png" alt="X" />
                                </label>
                                <li className="text-2xl">ESCROW STORE </li>
                                <li className="p-2"><button>Customers</button></li>

                                <li className="p-2">
                                    <Link to={'/category'} onClick={closeDrawer}> Category</Link>
                                </li>

                                <li className="p-2"><button>Products</button></li>
                                <li className="p-2"><button>Orders</button></li>
                                <li className="p-2"><button>Reviews</button></li>
                                <li className="p-2"><button>Balance</button></li>
                                <li className="p-2"><button>Deposits</button></li>
                                <li className="p-2"><button>Withdrawals</button></li>
                                <li className="p-2"><button>Verifications</button></li>
                                {/* <li className="p-2"><button>Support Emails</button></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl">Escrow Admin Panel</a>
                </div>
                <div className="navbar-end">
                    {/* <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button> */}

                    <div className="dropdown dropdown-end pr-5">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="/user.png" alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="p-3 font-bold">
                                Mr Admin 1
                            </li>
                            <li><a>Dashboard</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="navbar bg-base-100 border-b-[0.1px] border-gray-300 nav-2">
                <ul className="w-[100%] flex">
                    <li className="p-2"><button>Customers</button></li>
                    <li className="p-2"><Link to={'/category'}>Category</Link></li>
                    <li className="p-2"><button>Products</button></li>
                    <li className="p-2"><button>Orders</button></li>
                    <li className="p-2"><button>Reviews</button></li>
                    <li className="p-2"><button>Balance</button></li>
                    <li className="p-2"><button>Deposits</button></li>
                    <li className="p-2"><button>Withdrawals</button></li>
                    <li className="p-2"><button>Verifications</button></li>
                    {/* <li className="p-2"><button>Support Emails</button></li> */}
                </ul>
            </div>

            <div className="outlet">
                <Outlet />
            </div>

            <footer className=" footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2023 - All right reserved by Escrow Team - Ark</p>
                </aside>
            </footer>
        </>
    )
}

export default Navigation

