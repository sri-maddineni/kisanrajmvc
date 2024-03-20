import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="list-group">
                <NavLink to="/dashboard/user/transactions" className="list-group-item list-group-item-action">Transactions History</NavLink>
                <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Active orders</NavLink>
                <NavLink to="/dashboard/user/proposals-sent" className="list-group-item list-group-item-action">Proposals sent</NavLink>
                <NavLink to="/dashboard/user/proposals-recieved" className="list-group-item list-group-item-action">Responses & Negotiations</NavLink>
                <NavLink to="/dashboard/user/listings-posted" className="list-group-item list-group-item-action">Listings posted</NavLink>
                <NavLink to="/dashboard/user/sell-commodity" className="list-group-item list-group-item-action">Sell Commodity</NavLink>
                <NavLink to="/dashboard/user/buy-commodity" className="list-group-item list-group-item-action">Buy Commodity</NavLink>
                <NavLink to="/dashboard/user/post-potential" className="list-group-item list-group-item-action">Post potential</NavLink>
                <NavLink to="/dashboard/user/hire-equipment" className="list-group-item list-group-item-action">Hire Equipment</NavLink>
                
                <NavLink to="/dashboard/user/post-equipment" className="list-group-item list-group-item-action">Post Equipment</NavLink>
                <NavLink to="/dashboard/user/my-equipment-listing" className="list-group-item list-group-item-action">My Equipment Listing</NavLink>
            </div>


        </>
    )
}

export default UserMenu