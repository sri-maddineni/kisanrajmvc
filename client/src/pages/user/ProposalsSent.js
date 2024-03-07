import React, { useContext } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import AuthContext from "../../context/AuthContext";
import AdminMenu from "../../components/layouts/AdminMenu";

const ProposalsSent = () => {
  const [auth] = useContext(AuthContext);

  return (
    <>
      <Header />

      <div className="row m-3">
        <div className="col-md-3">
          {auth.user.role === "0" ? <AdminMenu /> : <UserMenu />}
        </div>
        <div className="col-md-9 text-center" style={{ minHeight: "50vh" }}>
          <h3>Proposals Sent</h3>

          <div className="row flex wrap">
            <div className="card m-2" style={{ width: "30%" }}>
              <div className="card-title">
                <h2>hello wrold</h2>
              </div>
              <div className="card-body">
                <div className="image">
                  <img
                    src="https://image.shutterstock.com/image-photo/black-rowan-berries-on-branches-260nw-159086927.jpg"
                    style={{ width: "90%" }}
                    alt="not found"
                  />
                </div>

                <div className="card-text">
                  <p>hello </p>
                  <p>hello </p>
                </div>
              </div>
            </div>

            <div className="card m-2" style={{ width: "30%" }}>
              <div className="card-title"></div>
              <div className="card-body">
                <div className="image">
                  <img
                    src="https://image.shutterstock.com/image-photo/black-rowan-berries-on-branches-260nw-159086927.jpg"
                    style={{ width: "90%" }}
                    alt="not found"
                  />
                </div>

                <div className="card-text">
                  <p>product name</p>
                  <p>product seller</p>
                  <p>product price</p>
                  <p>product quantity</p>
                </div>
              </div>
            </div>
            <div className="card m-2" style={{ width: "30%" }}>
              <div className="card-title"></div>
              <div className="card-body">
                <div className="image">
                  <img
                    src="https://image.shutterstock.com/image-photo/black-rowan-berries-on-branches-260nw-159086927.jpg"
                    style={{ width: "95%" }}
                    alt="not found"
                  />
                </div>

                <div className="card-text">
                  <p>product name</p>
                  <p>product seller</p>
                  <p>product price</p>
                  <p>product quantity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProposalsSent;
