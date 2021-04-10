import React from 'react';
import {
    Dialog, FormGroup,
    TextField, DialogTitle,
    FormLabel, Button
} from '@material-ui/core';

interface IProps{
    updateOff(): void;
    fetchTransactions(): void;
    sessionToken: string;
    baseURL: string;
    transactionToUpdate: ITransaction;
}

interface IState{
    description: string;
    amount: number;
    endDate: '';
    title: string;
}

interface ITransaction {
    amount: number;
    id: number;
    campaignId: number;
}

export default class TransactionsEdit extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            description: '',
            amount: NaN,
            endDate: '',
            title: ''
        }
        this.inputCompiler = this.inputCompiler.bind(this);
        this.campaignUpdate = this.campaignUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    campaignUpdate(e: React.SyntheticEvent){
        e.preventDefault();
        fetch(`${this.props.baseURL}/campaigns/${this.props.transactionToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({campaign: {title: this.state.title, description: this.state.description, amount: this.state.amount, endDate: this.state.endDate}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then((res) => {
            this.props.fetchTransactions();
            this.props.updateOff();
            alert('Campaign successfully updated');
        })
    }

    inputCompiler(e: React.SyntheticEvent){
        const input = e.target as HTMLInputElement;
        this.setState((prevState: IState) => ({...prevState, [input.name]: input.value} as Pick<IState, keyof IState>));
    }

    handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        this.campaignUpdate(e);
    }

    render(){
        return(
            <Dialog open={true}>
                <DialogTitle style={{textAlign: 'center'}}>Edit Your Campaign</DialogTitle>
                <form style={{padding: "2em", width: '35vw', textAlign: 'center'}}>
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
                    <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', marginRight:'2em'}} onClick={this.handleSubmit}>Update Transaction</Button>
                    <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} onClick={this.props.updateOff}>Cancel</Button>
                </form>
            </Dialog>
        )
    }
}