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
    updateRole(newRole : string) : string;
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
        this.loginOn = this.loginOn.bind(this);
        this.loginOff = this.loginOff.bind(this);
        this.signupOn = this.signupOn.bind(this);
        this.signupOff = this.signupOff.bind(this);
    }


    loginOn(){
        this.setState({
            login: true
        })
    }

    loginOff(){
        this.setState({
            login: false
        })
    }

    signupOn() {
        this.setState({
            signUp: true
        })
    }

    signupOff(){
        this.setState({
            signUp: false
        })
    }


    componentDidUpdate(prevProps: IProps, prevState: IState){
        if (prevProps.sessionToken !== this.props.sessionToken){
            this.forceUpdate();
        }
    }

    render(){
        return (
            <div>
                {
                    this.state.login === false
                        ? null
                        : <Login sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} updateToken={this.props.updateToken} clearToken={this.props.clearToken} open={this.state.login} updateRole={this.props.updateRole} loginOff={this.loginOff}/>
                }
                { /* if user has not clicked on button, modal will not display */
                    this.state.signUp === false 
                        ? null 
                        : <Register sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} updateToken={this.props.updateToken} clearToken={this.props.clearToken} open={this.state.signUp} updateRole={this.props.updateRole} signupOff={this.signupOff}/>
                }
                {
                    (this.props.sessionToken === '' || this.props.sessionToken === 'undefined')
                        ? <Button variant='contained' style={{marginRight: '2em', backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '15pt'}} onClick={this.loginOn}>Log in</Button>
                        : null
                }
                {
                    (this.props.sessionToken === '' || this.props.sessionToken === 'undefined')
                        ? <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '15pt'}} onClick={this.signupOn}>Sign up</Button>
                        : null
                }
                {
                    (this.props.sessionToken !== '' && this.props.sessionToken !== 'undefined')
                        ? <Logout clearToken={this.props.clearToken}/>
                        : null
                }
            </div>
        )
    }
}