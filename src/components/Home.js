
import React from "react";
import { useHistory } from "react-router-dom"
import "./Home.css";


const Home = () => {
    const history = useHistory()

    return (

        <div className="Home">

            <h1>Teknolojik Yemekler</h1>
            <p>KOD ACIKTIRIR PİZZA, DOYURUR</p>

            <div>
                <button id="home-button" type="submit" onClick={() => history.push("/OrderPizza")}   >
                    ACIKTIM
                </button>
            </div>


            <div>

            </div>

        </div>

    )
}

export default Home;