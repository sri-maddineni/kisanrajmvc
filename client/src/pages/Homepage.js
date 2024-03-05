import React from 'react';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import { Toaster } from 'react-hot-toast';
import "./Homepage.css"




export const Homepage = () => {



    return (
        <>
            <Header />
            <Toaster />
            <div className="container ">
                
                <div className="searcher m-2 text-center" style={{minHeight:"60vh", display:"flex",flexDirection:"row", alignItems:"center"}}>
                    <input type="text" placeholder={"enter product"} className='m-2' />
                    <input type="text" placeholder='enter location' className='m-2' />
                    <button className='btn btn-primary'> search</button>
                </div>
            </div>
            <Footer />
        </>
    );
};
