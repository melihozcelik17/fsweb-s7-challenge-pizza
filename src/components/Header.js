import React from 'react'

import "./Header.css"
import { Link } from "react-router-dom"



function Header() {
    return (
        <div className='header'>
            <h1>Teknolojik Yemekler</h1>
            <div>
                <div className='side-bar'>
                    <Link to='/'>Home</Link>
                    <Link to='/OrderPizza'>OrderPizza</Link>
                    <Link to='/Success'>Success</Link>

                </div>
            </div>
        </div >


    )
}

export default Header;