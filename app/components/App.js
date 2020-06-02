import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
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
            <Router basename={BASE_URL}>
                <div className = {theme}>
                    <div className='main-page'>
                        <Nav/>
                        <Switch>
                            <Route exact path='/' component={Top}/>
                            <Route path='/new' component={New}/>
                            <Route path='/best' component={Best}/>
                            <Route path='/post' component={Post}/>
                            <Route path='/user' component={User}/>
                            <Route render={()=>(<h1>404 Not Found</h1>)} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;