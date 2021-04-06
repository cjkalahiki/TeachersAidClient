import React from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {
    BrowserRouter as Router,
  } from 'react-router-dom';
import Home from '../Home/Home';
// import Auth from '../Auth';

type Props = {

}

export default class Navbar extends React.Component {
    render() {
            return(
            <div className='navbar'>
                <Router>
                    <div className='navbar-styling'> {/* make a styles.js */}
                        <ul>
                            <li><Link to='/home'>LOGO</Link></li>
                            {/* <li><Auth /></li> */}
                        </ul>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path='/home'><Home /></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}