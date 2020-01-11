import React from 'react'
import {NavLink} from 'react-router-dom'
import {ThemeContext} from '../context/ThemeContext.js'

const activeStyle = {
    color: '#bd333e'
}

class Nav extends React.Component {
    static contextType = ThemeContext;
    render () {
        const {toggleTheme} = this.context;
        return (
            <div className='row nav space-between'>
                <ul className='row'>
                    <li>
                        <NavLink
                            exact to='/'
                            activeStyle={activeStyle}
                            className='nav-link'
                        >
                        Top
                        </NavLink> 
                    </li>
                    <li>
                        <NavLink
                            to='/new'
                            activeStyle={activeStyle}
                            className='nav-link'
                        >
                            New
                        </NavLink> 
                    </li>
                    <li>
                        <NavLink
                            to='/best'
                            activeStyle={activeStyle}
                            className='nav-link'
                        >
                            Best
                        </NavLink> 
                    </li>
                </ul>
                <label className="switch">
                    <input 
                        type="checkbox"
                        onChange={toggleTheme}
                    />
                    <span className="slider"></span>
                </label>
            </div>
        )
    }
}
export default Nav;