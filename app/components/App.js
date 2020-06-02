import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './Nav.js'
import {ThemeContext} from '../context/ThemeContext.js'
import Top from './Top.js'
import New from './New.js'
import Post from './Post.js'
import User from './User.js'
import Best from './Best.js'
import {BASE_URL} from '../utils/constants' 

class App extends React.Component {
    static contextType = ThemeContext;
    render () {
        const {isLight} = this.context;
        const theme = isLight ? 'light' : 'dark';
        return (
            <Router>
                <div className = {theme}>
                    <div className='main-page'>
                        <Nav/>
                        <Switch>
                            <Route exact path={`${BASE_URL}`} component={Top}/>
                            <Route path={`${BASE_URL}/new`} component={New}/>
                            <Route path={`${BASE_URL}/best`} component={Best}/>
                            <Route path={`${BASE_URL}/post`} component={Post}/>
                            <Route path={`${BASE_URL}/user`} component={User}/>
                            <Route render={()=>(<h1>404 Not Found</h1>)} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;