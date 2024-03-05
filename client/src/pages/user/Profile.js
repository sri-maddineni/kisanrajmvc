import React, { useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "../../components/layouts/AdminMenu";

const Profile = () => {
    const [auth] = useContext(AuthContext);

    return (
        <>
            <Header />
           
                <div className="row m-3">
                    <div className="col-md-3">
                      {auth.user.role==="0"?<AdminMenu/>:<UserMenu/>}
                    </div>
                    <div className="col-md-9">
                        <h3>Profile</h3>

                        <pre>
                            {JSON.stringify(auth, null, 4)}
                        </pre>
                        {auth.user.role === "1" && <h1>Logged in as user</h1>}
                        {auth.user.role === "0" && <h1>Logged in as admin</h1>}
                        
                    </div>
                </div>
            
            <Footer />
        </>
    );
};

export default Profile;
