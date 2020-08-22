import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.scss'

export const Footer = () => {
    return(
        <div className="footer">
            <Link to="/CGU" className="linkFooter">Conditions générales d'utilisation</Link>
        </div>
    )
}