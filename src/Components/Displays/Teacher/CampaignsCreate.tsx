import React from 'react';
import {
    FormGroup, Container, FormLabel, TextField, InputAdornment, FormControl, InputLabel, Input, Button
} from '@material-ui/core';


interface IProps {
    sessionToken: string;
    baseURL: string;
    fetchCampaigns(): void;
}

interface IState {
    title: string;
    amount: number;
    description: string;
    endDate: string;
    todaysDate: string;
}

export default class CampaignsCreate extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            title: '',
            amount: NaN,
            description: '',
            endDate: '',
            todaysDate: ''
        }
        this.inputCompiler = this.inputCompiler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.campaignsFetch = this.campaignsFetch.bind(this);
    }

    inputCompiler(e: React.SyntheticEvent){
        const input = e.target as HTMLInputElement;
        this.setState((prevState: IState) => ({...prevState, [input.name]: input.value} as Pick<IState, keyof IState>));
    }

    campaignsFetch(e: React.SyntheticEvent){
        e.preventDefault();

        let newURL = `${this.props.baseURL}/campaigns/campaign`;

        fetch(newURL, {
            method: 'POST',
            body: JSON.stringify({campaign: {title: this.state.title, amount: this.state.amount, description: this.state.description, endDate: this.state.endDate}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                alert(data.message);
                this.setState({
                    title: '',
                    amount: NaN,
                    description: '',
                    endDate: ''
                })
                this.props.fetchCampaigns();
            })
    }

    handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        this.campaignsFetch(e);
    }

    componentDidMount(){
        let today : string= new Date().toLocaleDateString();
        console.log(today);
        this.setState({
            todaysDate: today
        })
    }

    render(){
        return(
            <Container>
                <h3>Create a New Campaign</h3>
                <form>
                    <FormGroup>
                        <FormLabel>Title</FormLabel>
                        <br/>
                        <TextField id='outlined-basic' label='Title' variant='filled' value={this.state.title} name='title' onChange={this.inputCompiler}>Title:</TextField>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <FormLabel>Amount</FormLabel>
                        <br/>
                        <TextField label='Amount' variant='filled' value={this.state.amount} name='amount' onChange={this.inputCompiler} type='number' id="standard-adornment-amount" InputProps={{inputProps: {min: 0}}}></TextField>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <br/>
                        <TextField id='filled-multiline-static' multiline rows={5} label='Description' variant='filled' value={this.state.description} name='description' onChange={this.inputCompiler} type='text'></TextField>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <FormLabel>End Date</FormLabel>
                        <br/>
                        <TextField id='filled-multiline-static' variant='filled' value={this.state.endDate} name='endDate' onChange={this.inputCompiler} type='date' InputProps={{inputProps: {min: this.state.todaysDate}}}></TextField>
                    </FormGroup>
                    <br/>
                    <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} onClick={this.handleSubmit}>Create Campaign</Button>
                </form>
            </Container>
        )
    }
}