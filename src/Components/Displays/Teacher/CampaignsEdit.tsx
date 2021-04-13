import React from 'react';
import {
    Dialog, FormGroup,
    TextField, DialogTitle,
    FormLabel, Button
} from '@material-ui/core';
import {ICampaign} from '../../interfaces';

interface IProps{
    updateOff(): void;
    fetchCampaigns(): void;
    sessionToken: string;
    baseURL: string;
    campaignToUpdate: ICampaign;
}

interface IState{
    description: string;
    amount: number;
    endDate: string;
    title: string;
    todaysDate: string;
}

export default class CampaignsEdit extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            description: this.props.campaignToUpdate.description,
            amount: this.props.campaignToUpdate.amount,
            endDate: this.props.campaignToUpdate.endDate,
            title: this.props.campaignToUpdate.title,
            todaysDate: ''
        }
        this.inputCompiler = this.inputCompiler.bind(this);
        this.campaignUpdate = this.campaignUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    campaignUpdate = async(e: React.SyntheticEvent) => {
        e.preventDefault();

        if (Date.parse(this.state.todaysDate) >= Date.parse(this.state.endDate)){
            alert('Campaign needs to run for at least 1 day.')
        } else {
            try{
                await fetch(`${this.props.baseURL}/campaigns/${this.props.campaignToUpdate.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({campaign: {title: this.state.title, description: this.state.description, amount: this.state.amount, endDate: this.state.endDate}}),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.sessionToken
                    })
                })
                .then((res) => {
                    this.props.fetchCampaigns();
                    this.props.updateOff();
                    alert('Campaign successfully updated');
                })
            } catch (err) {
                alert('Failed to update campaign.')
            }
        }
    }

    inputCompiler(e: React.SyntheticEvent){
        const input = e.target as HTMLInputElement;
        this.setState((prevState: IState) => ({...prevState, [input.name]: input.value} as Pick<IState, keyof IState>));
    }

    handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        this.campaignUpdate(e);
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
            <Dialog open={true}>
                <DialogTitle style={{textAlign: 'center'}}>Edit Your Campaign</DialogTitle>
                <form style={{padding: "2em", width: '25vw', textAlign: 'center'}}>
                <FormGroup>
                        <TextField variant='filled' value={this.state.title} name='title' label='Title' onChange={this.inputCompiler} type='text' id="standard-adornment-amount"></TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField id='filled-multiline-static' multiline rows={5} label='Description' variant='filled' value={this.state.description} name='description' onChange={this.inputCompiler} type='text'></TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField label='Amount' variant='filled' value={this.state.amount} name='amount' onChange={this.inputCompiler} type='number' id="standard-adornment-amount"></TextField>
                    </FormGroup>
                    <FormGroup>
                        <TextField variant='filled' value={this.state.endDate} name='endDate' onChange={this.inputCompiler} type='date' id="standard-adornment-amount"></TextField>
                    </FormGroup>
                    <br/>
                    <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} onClick={this.handleSubmit}>Update Campaign</Button>
                    <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', marginLeft: '2em'}} onClick={this.props.updateOff}>Cancel</Button>
                </form>
            </Dialog>
        )
    }
}