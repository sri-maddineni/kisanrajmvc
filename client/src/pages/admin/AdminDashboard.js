import React from 'react'
import Footer from '../../components/layouts/Footer'
import Header from '../../components/layouts/Header'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
const AdminDashboard = () => {
    const [auth]=useContext(AuthContext);
    return (
        <>
            <Header />
            <div className="container-fluid m-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3>Admin name: {auth?.user?.name}</h3>
                            <h3>Admin email: {auth?.user?.email}</h3>
                        </div>
                    </div>

                </div>
            </div>
       
     
            <Footer />
        </>
    )
}

export default AdminDashboard