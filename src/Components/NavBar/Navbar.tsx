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
import Auth from '../Auth/Auth';
import {Grid} from '@material-ui/core';

interface IProps {
    sessionToken: string;
    updateToken(newToken: string) : string;
    clearToken() : void;
}

export default class Navbar extends React.Component<IProps> {
    render() {
            return(
            <div className='navbar'>
                <br/>
                <Router>
                    <Grid container spacing={3}>
                        <Grid item xs={6} alignItems="flex-start">  
                            <Link to='/home'>LOGO</Link>
                        </Grid>
                        <Grid item xs={6}>      
                            <Auth baseURL={'https://ck-teachers-aid-server.herokuapp.com'} sessionToken={this.props.sessionToken}  clearToken={this.props.clearToken} updateToken={this.props.updateToken}/>
                        </Grid>
                    </Grid>
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