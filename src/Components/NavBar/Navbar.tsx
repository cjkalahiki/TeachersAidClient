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
import {Grid, Button} from '@material-ui/core';
import CampaignsIndex from '../Displays/Teacher/CampaignsIndex';
import TransactionsIndex from '../Displays/Donor/TransactionsIndex';
import logo from '../../Assets/teachersaid.png';

interface IProps {
    sessionToken: string;
    updateToken(newToken: string) : string;
    clearToken() : void;
    updateRole(newRole: string) : string;
    role: string;
}

export default class Navbar extends React.Component<IProps> {
    
    componentDidUpdate(prevProps: IProps){
        if(prevProps.role !== this.props.role){
            this.forceUpdate();
        }
    }
    
    render() {
            return(
            <div className='navbar'>
                <br/>
                <Router>
                    <Grid container>
                        <Grid item xs={3} alignItems="flex-start">  
                            <Link to='/' style={{marginRight: '2em'}}><img src={logo} alt='logo' style={{width: '18vw', marginLeft: '5em'}}/></Link>
                        </Grid>
                        <Grid item xs={6}>
                        {
                            this.props.role === 'teacher'
                                ? <Grid item xs={8}><Link to='/campaigns'><Button style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '11pt', height: '50px', textDecoration:'underline #E24E24'}}>Your Campaigns</Button></Link></Grid>
                                : null
                        }
                        {
                            this.props.role === 'donor'
                                ? <Grid item xs={8}><Link to='/transactions'><Button style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '11pt', height: '50px', textDecoration:'underline #E24E24'}}>Your Transactions</Button></Link></Grid>
                                : null
                        }
                        </Grid>
                        <Grid item xs={3} style={{marginBottom: '4em'}} justify='flex-end'>      
                            <Auth baseURL={'https://ck-teachers-aid-server.herokuapp.com'} sessionToken={this.props.sessionToken}  clearToken={this.props.clearToken} updateToken={this.props.updateToken} updateRole={this.props.updateRole}/>
                        </Grid>
                    </Grid>
                    <div>
                        <Switch>
                            <Route exact path='/'><Home sessionToken={this.props.sessionToken} role={this.props.role}/></Route>
                            {
                                this.props.role === 'teacher'
                                    ?  <Route exact path='/campaigns'><CampaignsIndex sessionToken={this.props.sessionToken} baseURL={'https://ck-teachers-aid-server.herokuapp.com'}/></Route>
                                    : null
                            }
                            {
                                this.props.role === 'donor'
                                    ?  <Route exact path='/transactions'><TransactionsIndex sessionToken={this.props.sessionToken} baseURL={'https://ck-teachers-aid-server.herokuapp.com'}/></Route>
                                    : null
                            }
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}