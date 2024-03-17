import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Nav() {

    const [auth, setAuth] = useContext(AuthContext)

    const navigate = useNavigate();


    const handleLogout = () => {
        setAuth({
            user: null,
            token: "",
        });

        localStorage.removeItem("auth");
        toast.success("Logged out successfully");
        navigate("/login")
    };
    return (
        <>
            <header className="bg-dark text-white text-center py-3">
                <h1 className="mt-3">KisanRaj</h1>
            </header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-sm" style={{ '--bs-bg-opacity': '0.8', 'height': '60px' }} >
                <div className="container-fluid ">
                    <Link className="navbar-brand text-warning" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navi" aria-controls="navi" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navi">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Buy
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to={auth?.user? "/dashboard/user/buy-commodity":"/buy-commodity"} >Buy Commodity</Link></li>
                                    <li><Link className="dropdown-item" to="/cp" >Buy Equipment</Link></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Sell
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/dashboard/user/sell-commodity" >Sell Commodity</Link></li>
                                    <li><Link className="dropdown-item" to="/cp" >Sell Equipment</Link></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Hire
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/user/hire-equipment" >Hire Equipment</Link></li>
                                    <li><Link className="dropdown-item" to="/cp" >Hire Cold Storages</Link></li>

                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Post
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to={auth?.user ? "/dashboard/user/post-potential" : "/login"} >Post Requirement</Link></li>
                                    <li><Link className="dropdown-item" to="/dashboard/user/post-equipment" >Post Equipment</Link></li>
                                </ul>

                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active p-3" aria-current="page" to="/coldstorages">Cold Storages</Link>
                            </li>

                            { /*<li className="nav-item">
                                <Link className="nav-link active p-3" aria-current="page" to="/rooms">Cold Storages</Link>
                            </li>*/}



                        </ul>



                        {!auth?.user ? (
                            <>
                                <button className="btn btn-sm btn-success m-3" type="button" onClick={() => { navigate("/login") }}>Login</button>
                                <button className="btn btn-sm btn-success m-3" type="button" onClick={() => { navigate("/register") }}>Register</button>
                            </>
                        ) : (
                            <>
                                <ul className="navbar-nav p-2 mx-5">
                                    <li className="nav-item">
                                        <Link className="nav-link active p-3" aria-current="page" to="/dashboard/user/listings-posted">Listings</Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Responses
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="/dashboard/user/proposals-recieved" >Proposals Recieved</Link></li>
                                            <li><Link className="dropdown-item" to="/dashboard/user/history/negotiations" >Negotiations History</Link></li>

                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" >
                                            History
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><Link className="dropdown-item" to="/mess" >Transactional History</Link></li>
                                            <li><Link className="dropdown-item" to="/cp" >Negotiations History</Link></li>

                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active p-3" aria-current="page" to="/Orders">Orders</Link>
                                    </li>

                                    <li className="nav-item dropdown active m-2">
                                        <a className="nav-link me-auto text-white disabled" href='#' data-bs-toggle="dropdown">{auth?.user?.name}   <i className="fa-solid fa-sort-down"></i></a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/dashboard/user/profile"> Profile</Link></li>
                                            <li><a className="dropdown-item" onClick={handleLogout}> Logout </a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown active m-2">
                                        <a className="nav-link me-auto text-white disabled" href='#' data-bs-toggle="dropdown">Language   <i className="fa-solid fa-sort-down"></i></a>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/dashboard/user/profile"> Telugu</Link></li>
                                            <li><a className="dropdown-item" onClick={handleLogout}> English </a></li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </>
                        )}





                    </div>
                </div>
            </nav>
        </>
    )
}


