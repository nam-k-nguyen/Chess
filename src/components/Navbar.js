import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <NavLink end to="/">Home</NavLink>
            <NavLink end to="/matching">Matching</NavLink>
            <NavLink end to="/play">Play</NavLink>
            <NavLink end to="/setting">Setting</NavLink>
            <NavLink end to="/login">Login</NavLink>
        </nav>
    )
}
