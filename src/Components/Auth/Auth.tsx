import React from 'react';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import { 
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    FormGroup,
    TextField
} from '@material-ui/core';

interface IProps {
    baseURL: string;
    sessionToken: string;
    updateToken(newToken: string) : string;
    clearToken() : void;
}

interface IState {
    signUp: boolean;
    login: boolean;
}

export default class Auth extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props)
        this.state = {
            signUp: false,
            login: false
        }
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    //toggle for login and signup when button is clicked to display modal. also the button display needs to be a ternary checking if signup/login is false, if not, display logout component that i have not built yet.
    toggleLogin() {
        this.setState({
            login: !this.state.login
        })
    }

    toggleSignup() {
        this.setState({
            signUp: !this.state.signUp
        })
    }


    componentDidUpdate(prevProps: IProps, prevState: IState){
        if (prevProps.sessionToken !== this.props.sessionToken){
            this.forceUpdate();
        }
    }

    render(){
        // const views = this.state.login === true ? <Login sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} updateToken={this.props.updateToken} clearToken={this.props.clearToken} open={this.state.login}/> : <Register sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} updateToken={this.props.updateToken} clearToken={this.props.clearToken}/>
        return (
            <div>
                {
                    this.state.login === false
                        ? null
                        : <Login sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} updateToken={this.props.updateToken} clearToken={this.props.clearToken} open={this.state.login}/>
                }
                { /* if user has not clicked on button, modal will not display */
                    this.state.signUp === false 
                        ? null 
                        : <Register sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} updateToken={this.props.updateToken} clearToken={this.props.clearToken} open={this.state.signUp}/>
                }
                {
                    this.props.sessionToken === ''
                        ? <Button variant='contained' style={{marginRight: '2em', backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} onClick={this.toggleLogin}>Log in</Button>
                        : null
                }
                {
                    this.props.sessionToken === ''
                        ? <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} onClick={this.toggleSignup}>Sign up</Button>
                        : null
                }
                {
                    this.props.sessionToken !== ''
                        ? <Logout clearToken={this.props.clearToken}/>
                        : null
                }
            </div>
        )
    }
}