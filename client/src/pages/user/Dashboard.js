import React from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import UserMenu from './UserMenu'
import Navbar from '../../components/UIComponents/Navbar'


const Dashboard = () => {

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 m-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-8">
                        <div className='text-center'>
                            <h1 className='text-center'>user Dash board</h1>



                        </div>
                    </div>
                </div>


            </div>

            <Footer />

        </>
    )
}

export default Dashboard