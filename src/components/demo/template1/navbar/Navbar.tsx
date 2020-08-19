import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

export const Navbar = () => {
    const [name] = useState('NOM MARQUE')
    const [origin, setOrigin] = useState('')

    useEffect(() => {
        let loc: any = window.location.pathname
        setOrigin(loc)
    }, [])

    return (
        <div className="containerNavbar">
            <img src={require('../images/logo.png')} className="logoNavbar" />
            <div className="rowNavbar">
                <Link className={origin === "/demo" ? "linkOn" : "link"} to="/demo">{name}</Link>
                <div style={{ marginRight: '20px', marginLeft: '20px' }} className="verticalTiret" />
                <Link className={origin !== "/demo" ? "linkOn" : "link"} to="/demo-boutique">BOUTIQUE</Link>
            </div>
        </div>
    )
}