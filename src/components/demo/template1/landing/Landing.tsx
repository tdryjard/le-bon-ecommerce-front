import React, { useState } from 'react'
import { Navbar } from '../navbar/Navbar'
import './Landing.scss'

export const LandingDemo = () => {
    const [name] = useState<string>('NOM MARQUE')
    const [slogan] = useState<string>('LE SLOGAN DE VOTRE MARQUE')
    const [describe] = useState<any>(`Long texte qui décrit votre marque et ce que vous vendezLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
    magnaaliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
     Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sintoccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`)

    return (
        <div className="container">
            <Navbar />
            <h1 className="title" style={{ fontSize: '30px', marginTop: '250px' }}>{name}</h1>
            <h2 className="text" style={{ fontSize: '20px' }}>{slogan}</h2>
            <img className="illustrationLanding" src={require('../images/illustration.png')} alt={name} />
            <h3 style={{ marginBottom: '80px', width: '50%' }} className="text">{describe}</h3>
        </div>
    )
}