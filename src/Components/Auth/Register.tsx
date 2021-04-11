import React, { SyntheticEvent } from 'react';
import { 
    Dialog,
    Checkbox,
    FormControlLabel,
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
    open: boolean;
}

interface IState {
    open: boolean;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    teacher: boolean;
}

export default class Register extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props)
        this.state = {
            open: this.props.open,
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            teacher: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.inputCompiler = this.inputCompiler.bind(this);
        this.checkbox = this.checkbox.bind(this);
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

    loginFetch(e: SyntheticEvent){
        e.preventDefault();
        if(this.state.password === ''){
            alert('You must input your password');
        } else if (this.state.username.length < 1){
            alert('You must input your username');
        } else if(this.state.email.includes('@') !== true){
            alert('You must include a valid email.')
        } else {
            this.props.clearToken();

            let newURL = `${this.props.baseURL}/users/register`;

            if (this.state.teacher === true) {
                fetch(newURL, {
                    method: 'POST',
                    body: JSON.stringify({user: {role: 'teacher', firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, username: this.state.username, password: this.state.password}}),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        alert(data.message);
                        this.props.updateToken(data.sessionToken);
                        this.props.updateRole(data.user.role);
                        this.handleOpen();
                    })
            } else {
                fetch(newURL, {
                    method: 'POST',
                    body: JSON.stringify({user: {role: 'donor', firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, username: this.state.username, password: this.state.password}}),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        alert(data.message);
                        this.props.updateToken(data.sessionToken);
                        this.props.updateRole(data.user.role);
                        this.handleOpen();
                    })
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

    checkbox(e: React.ChangeEvent<HTMLInputElement>){
        this.setState((prevState: IState) => ({...prevState, [e.target.name]: e.target.checked} as Pick<IState, keyof IState>));
    }

    render(){
        return (
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle style={{textAlign: 'center'}}>Sign up</DialogTitle>
                <form onSubmit={this.handleSubmit} style={{padding: "2em", width: '25vw', textAlign: 'center'}}>
                    <FormGroup row>
                        <DialogTitle>Are you a teacher?</DialogTitle>
                        <FormControlLabel control={<Checkbox checked={this.state.teacher} onChange={this.checkbox} name='teacher' />} label='Yes'/>
                    </FormGroup>
                    <FormGroup>
                        <TextField id='outlined-basic' label='First Name' variant='filled' value={this.state.firstName} name='firstName' onChange={this.inputCompiler} required>First Name: </TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField id='outlined-basic' label='Last Name' variant='filled' value={this.state.lastName} name='lastName' onChange={this.inputCompiler} required>Last Name: </TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField id='outlined-basic' label='Email' variant='filled' value={this.state.email} name='email' onChange={this.inputCompiler} required>Email: </TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField id='outlined-basic' label='Username' variant='filled' value={this.state.username} name='username' onChange={this.inputCompiler} required>Username: </TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField id='outlined-basic' label='Password' variant='filled' value={this.state.password} name='password' onChange={this.inputCompiler} required type="password">Password: </TextField>
                    </FormGroup>
                    <br/>
                    <Button variant='contained' onClick={this.handleSubmit} style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '11pt', height: '50px', textDecoration:'underline #E24E24'}}>Sign up</Button>
                </form>
            </Dialog>
        )
    }
}