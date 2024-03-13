import React from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {

    const [email, setemail] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [answer, setanswer] = useState("");

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newPassword, answer });

            if (res && res.data.success) {
                toast.success(res.data.message)
                navigate("/login")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in registration!")
        }
    }


    return (
        <>
            <Header />
            <div><h1 className='text-center m-2'>Reset password</h1></div>
            <div className="total text-center my-2">
                <div className="register my-2">
                    <form className="text-center m-3" onSubmit={handlesubmit}>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"

                                value={email}
                                onChange={(e) => { setemail(e.target.value) }}
                                placeholder="Enter Email"
                                required
                            />

                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"

                                value={answer}
                                onChange={(e) => { setanswer(e.target.value) }}
                                placeholder="Enter secret answer"
                                required
                            />

                        </div>

                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"

                                value={newPassword}
                                onChange={(e) => { setnewPassword(e.target.value) }}
                                placeholder="Enter new password"
                                required
                            />

                        </div>

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                        <div className="m-3">

                        </div>

                        {/*
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label htmlFor="">Accept terms and conditions</label>
          </div>
          */}






                    </form>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default ForgotPassword