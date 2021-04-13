import React, { SyntheticEvent } from 'react';
import { 
    Dialog,
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
    updateRole(newRole: string) : string;
    loginOff(): void;
    open: boolean;
}

interface IState {
    open: boolean,
    username: string,
    password: string
}

export default class Login extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props)
        this.state = {
            open: this.props.open,
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.inputCompiler = this.inputCompiler.bind(this);
    }

    handleOpen(){
        this.setState({
            open: true
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    loginFetch = async (e: SyntheticEvent) => {
        e.preventDefault();

        if(this.state.password === ''){
            alert('You must input your password');
        } else if (this.state.username.length < 1){
            alert('You must input your username');
        } else {
            this.props.clearToken();

            let newURL = `${this.props.baseURL}/users/login`;
            try {
                await fetch(newURL, {
                    method: 'POST',
                    body: JSON.stringify({user: {username: this.state.username, password: this.state.password}}),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        if (data.message){
                            alert(data.message);
                        }
                        this.props.updateToken(data.sessionToken);
                        this.props.updateRole(data.user.role);
                        this.props.loginOff();
                    })
            } catch (err) {
                alert('failed to login user');
            }
        }

    }

    handleSubmit(e: SyntheticEvent){
        e.preventDefault();
        this.loginFetch(e);
    }

    inputCompiler(e: SyntheticEvent){
        const input = e.target as HTMLInputElement;
        this.setState((prevState: IState) => ({...prevState, [input.name]: input.value} as Pick<IState, keyof IState>));
    }

    render(){
        return (
            <Dialog open={true}>
                <DialogTitle style={{textAlign: 'center'}}>Login</DialogTitle>
                <form onSubmit={this.handleSubmit} style={{padding: "2em", width: '25vw', textAlign: 'center'}}>
                    <FormGroup>
                        <TextField id='outlined-basic' label='username' variant='filled' value={this.state.username} name='username' onChange={this.inputCompiler}>Username: </TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField id='outlined-basic' label='password' variant='filled' value={this.state.password} name='password' onChange={this.inputCompiler} type="password">Password: </TextField>
                    </FormGroup>
                    <br/>
                    <Button variant='contained' onClick={this.handleSubmit} style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '11pt', height: '50px', textDecoration:'underline #E24E24'}}>Log in</Button>
                    <Button variant='contained' onClick={this.props.loginOff} style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '11pt', height: '50px', textDecoration:'underline #E24E24', marginLeft: '2em'}}>Cancel</Button>
                </form>
            </Dialog>
        )
    }
}