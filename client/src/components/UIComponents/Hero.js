import "./Hero.css";
import { useNavigate } from "react-router-dom";
//import data from "../Data/Coomodities";
import Searchbar from "./Searchbar";
//import Location from "../Data/Location";

//import { productlist } from "../Data/productslist";
//import LocationComponent from "../Data/LocationComponent";

const Hero=(props)=> {

    const navigate = useNavigate();

    return (
        <>
            <div className={props.cname}>
                <img src={props.imglink} alt="heroimage" />
                <div className="hero-text">

                    <h1>{props.title}</h1>

                    <input
                        type="search"
                        placeholder={`Search for Tomatoes in`}
                        className="loc"
                       
                    />

                    <div className="buttons">
                        <button
                            className="btn buy btn-outline-info mx-2 my-2"
                            onClick={() => {
                                navigate("/dashboard/user/buy-commodity")
                             }}
                        >
                            Buy
                        </button>
                        <button
                            className="btn buy btn-outline-info mx-2 my-2"
                            onClick={() => {
                                navigate("/dashboard/user/sell-commodity");
                            }}
                        >
                            Sell
                        </button>
                        <button
                            className="btn buy btn-outline-info mx-2 my-2"
                            onClick={()=>{
                                navigate("/dashboard/user/hire-equipment")
                            }}
                        >
                            Hire
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
