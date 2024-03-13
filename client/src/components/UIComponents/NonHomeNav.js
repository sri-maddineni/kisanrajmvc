import React from 'react'
import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <>
    <header className="bg-dark text-white text-center py-3">
        <h1 className="mt-3">BEC Studo</h1>
    </header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-sm" style={{ '--bs-bg-opacity': '0.8', 'height':'60px' }} >
        <div className="container-fluid ">
          <Link className="navbar-brand text-warning" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navi" aria-controls="navi" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navi">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active p-3" aria-current="page" to='/hostels'>Hostels</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active p-3" aria-current="page" to="/rooms">Rooms</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link text-white p-3 disabled" href='#' id="navbarDropdown"  data-bs-toggle="dropdown" aria-expanded="false" >
                  Food
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/mess" >Mess</Link></li>
                  <li><Link className="dropdown-item" to="/cp" >Curry Points</Link></li>
                  <li><Link className="dropdown-item" to="/restaurants" >Restaurants</Link></li>
                  <li><Link className="dropdown-item" to="/fc" >Food courts</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link text-white p-3 disabled" href='#' data-bs-toggle="dropdown" > Academics  </a>
                 <ul className="dropdown-menu">
                   <li><a className="dropdown-item" href='#'> Attendence</a></li>
                   <li><a className="dropdown-item" href='#'> My Certifications </a></li>
                   <li><a className="dropdown-item" href='#'> Intenals calc </a></li>
                   <li><a className="dropdown-item" href='#'> Materials </a></li>
                 </ul>
             </li>
             <li className="nav-item dropdown">
        <a className="nav-link text-white p-3 disabled" href='#' data-bs-toggle="dropdown">Placements</a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" to="html/plamaterials.html"> Materials </a></li>
          <li>
            <a className="dropdown-item" href='#'>Student Experience</a>
            
            <ul className="submenu">
              <li><a className="dropdown-item" href='#'>Y20</a></li>
              <li><a className="dropdown-item" href='#'>Y21</a></li>
              <li><a className="dropdown-item" href='#'>Y22</a></li>
            </ul>
          </li>
         
          
        </ul>
      </li>
             <li className="nav-item dropdown">
                <a className="nav-link text-white p-3 disabled" href='#' data-bs-toggle="dropdown"> Student organisations  </a>
                 <ul className="dropdown-menu">
                   <li><a className="dropdown-item" href='#'> Awaz</a></li>
                   <li><a className="dropdown-item" href='#'> CCA </a></li>
                   <li><a className="dropdown-item" href='#'> SAC </a></li>
                   <li><a className="dropdown-item" href='#'> CodeVerse </a></li>
                 </ul>
             </li>
             <li className="nav-item dropdown">
                <a className="nav-link text-white p-3 disabled" href='#' data-bs-toggle="dropdown"> Results  </a>
                 <ul className="dropdown-menu">
                   <li><a className="dropdown-item" href='#'> Y20</a></li>
                   <li><a className="dropdown-item" href='#'> Y21 </a></li>
                   <li><a className="dropdown-item" href='#'> Y22 </a></li>
                   <li><a className="dropdown-item" href='#'> Y23 </a></li>
                 </ul>
             </li>
             <li className="nav-item">
                <a className="nav-link active p-3" aria-current="page" href='#'>Alumni</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link text-white p-3 disabled" href='#' data-bs-toggle="dropdown"> Others  </a>
                 <ul className="dropdown-menu">
                   <li><a className="dropdown-item" href='#'> Services</a></li>
                   <li><a className="dropdown-item" href='#'> Coupons </a></li>
                   <li><a className="dropdown-item" href='#'> Market </a></li>
                   
                 </ul>
             </li>
            </ul>
            <ul className="navbar-nav p-2">
                <li className="nav-item dropdown active">
                    <a className="nav-link me-auto text-white p-2 disabled" href='#' data-bs-toggle="dropdown"> About  </a>
                     <ul className="dropdown-menu">
                       <li><a className="dropdown-item" href="#"> Developers</a></li>
                       <li><a className="dropdown-item" href='#'> Y21 </a></li>
                       <li><a className="dropdown-item" href='#'> Y22 </a></li>
                       <li><a className="dropdown-item" href='#'> Y23 </a></li>
                     </ul>
                 </li>
            </ul>
            
            
           <button className="btn btn-sm btn-success m-3" type="button">Login</button>
           <button className="btn btn-sm btn-success m-3" type="button">Sign up</button>
      
            
          </div>
        </div>
      </nav>
    </>
  )
}


