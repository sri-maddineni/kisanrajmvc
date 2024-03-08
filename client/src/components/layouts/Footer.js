import "./Footer.css";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="div1">
          <div className="contact">
            <h2>Contact Us</h2>
            <input type="Text" placeholder="Your Name" className="namer" />
            <input type="Text" placeholder="Your Email" className="mailer" />
            <input
              type="Textarea"
              placeholder="Your Message"
              className="msge"
              rows="4"
              cols="20"
            />
            <button className="btn btn-md  btn-outline-info btnsend">
              send
            </button>
          </div>
        </div>
        <div className="div2">
          <h2>Sponsors</h2>
          <a href="/">ITC</a>
          <a href="/">TATA</a>
        </div>
        <div className="div3 text-center">
          <h2>All links</h2>
          <a href="/">Buy</a>
          <a href="/">Sell</a>
          <a href="/">Hire</a>
          <a href="/">Buyers</a>
          <a href="/">Sellers</a>
          <a href="/">Farmers</a>
          <a href="/">Companies</a>
          <Link to="/dashboard/user/buy-commodity">All Commodities</Link>
          <a href="/">Cold storages</a>
          <a href="/">Equipment for Hire</a>
          <a href="/">Equipment for sale</a>
        </div>

        <div className="div4 text-center">
        <Logo/>
          <h2>Follow us on</h2>
          <a href="/">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="/">
            <i className="fa-solid fa-envelope"></i>
          </a>
          <a href="/">
            <i className="fa-solid fa-phone"></i>
          </a>
        </div>
        <div className="div5"></div>
      </div>
    </>
  );
};

export default Footer;
