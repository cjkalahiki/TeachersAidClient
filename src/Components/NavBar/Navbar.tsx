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
import CampaignsIndex from '../Displays/Teacher/CampaignsIndex';

interface IProps {
    sessionToken: string;
    updateToken(newToken: string) : string;
    clearToken() : void;
    updateRole(newRole: string) : string;
    role: string;
}

export default class Navbar extends React.Component<IProps> {
    render() {
            return(
            <div className='navbar'>
                <br/>
                <Router>
                    <Grid container spacing={3}>
                        <Grid item xs={6} alignItems="flex-start">  
                            <Link to='/' style={{marginRight: '2em'}}>LOGO</Link>
                        </Grid>
                        <Grid item xs={6}>      
                            <Auth baseURL={'https://ck-teachers-aid-server.herokuapp.com'} sessionToken={this.props.sessionToken}  clearToken={this.props.clearToken} updateToken={this.props.updateToken} updateRole={this.props.updateRole}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Link to='/campaigns'>Your Campaigns</Link>
                        </Grid>
                    </Grid>
                    <div>
                        <Switch>
                            <Route exact path='/'><Home /></Route>
                            <Route exact path='/campaigns'><CampaignsIndex sessionToken={this.props.sessionToken} baseURL={'https://ck-teachers-aid-server.herokuapp.com'}/></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}