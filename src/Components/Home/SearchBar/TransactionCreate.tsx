import React from 'react';
import {
    TextField, Dialog, DialogTitle,
    FormGroup, Button, FormLabel
} from '@material-ui/core';
import APIURL from '../../../helpers/environment';
import {ICampaignTransaction} from '../../interfaces';

interface IProps {
    sessionToken: string;
    transactionOff(): void;
    campaignTransaction: ICampaignTransaction;
}

interface IState {
    amount: number;
}

export default class TransactionCreate extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
        this.state = {
            amount: NaN
        }
        
        this.fetchTransactions = this.fetchTransactions.bind(this);
        this.inputCompiler = this.inputCompiler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    fetchTransactions = async(e: React.SyntheticEvent) => {
        e.preventDefault();

        let newURL = `${APIURL}/transactions/transaction`;

        if (this.state.amount > this.props.campaignTransaction.amount) {
            alert('Cannot donate more than the needed amount.')
        } else if (this.state.amount < 0){
            alert('Need to input a valid amount')
        } else {
            try{
                await fetch(newURL, {
                    method: 'POST',
                    body: JSON.stringify({transaction: {amount: this.state.amount, campaignId: this.props.campaignTransaction.id}}),
                    headers: new Headers ({
                        'Content-Type': 'application/json',
                        'Authorization': this.props.sessionToken
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.message);
                        alert(data.message);
                        this.props.transactionOff();
                    })
            } catch (err){
                alert('transaction unsuccessful')
            }
        }
    }

    handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        this.fetchTransactions(e);
    }

    inputCompiler(e: React.SyntheticEvent){
        const input = e.target as HTMLInputElement;
        this.setState((prevState: IState) => ({...prevState, [input.name]: input.value} as Pick<IState, keyof IState>));
    }

    render() {
        const {campaignTransaction} = this.props;
        return(
            <Dialog open={true}>
                <DialogTitle style={{textAlign: 'center'}}>Make a Donation!</DialogTitle>
                <form onSubmit={this.handleSubmit} style={{padding: "2em", width: '25vw', textAlign: 'center'}}>
                    <FormGroup>
                        <FormLabel>Amount</FormLabel>
                        <br/>
                        <TextField label='Amount' variant='filled' value={this.state.amount} name='amount' onChange={this.inputCompiler} type='number' id="standard-adornment-amount" InputProps={{inputProps: {min: 0}}}></TextField>
                    </FormGroup>
                    <br/>
                    <Button variant='contained' onClick={this.handleSubmit} style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '11pt', height: '50px', textDecoration:'underline #E24E24', marginRight: '2em'}}>Donate</Button>
                    <Button variant='contained' onClick={this.props.transactionOff} style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '11pt', height: '50px', textDecoration:'underline #E24E24'}}>Cancel</Button>
                </form>
            </Dialog>
        )
    }
}