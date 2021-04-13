import React from 'react';
import {
    Dialog, FormGroup,
    TextField, DialogTitle,
    FormLabel, Button
} from '@material-ui/core';
import {ITransaction} from '../../interfaces';

interface IProps{
    updateOff(): void;
    fetchTransactions(): void;
    sessionToken: string;
    baseURL: string;
    transactionToUpdate: ITransaction;
}

interface IState{
    amount: number;
}

export default class TransactionsEdit extends React.Component<IProps, IState>{
    constructor(props: IProps){
        super(props);
        this.state = {
            amount: this.props.transactionToUpdate.amount
        }

        this.inputCompiler = this.inputCompiler.bind(this);
        this.transactionUpdate = this.transactionUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    transactionUpdate(e: React.SyntheticEvent){
        e.preventDefault();
        fetch(`${this.props.baseURL}/transactions/${this.props.transactionToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({transaction: {amount: this.state.amount}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then((res) => {
            this.props.fetchTransactions();
            this.props.updateOff();
            alert('Transaction successfully updated');
        })
    }

    inputCompiler(e: React.SyntheticEvent){
        const input = e.target as HTMLInputElement;
        this.setState((prevState: IState) => ({...prevState, [input.name]: input.value} as Pick<IState, keyof IState>));
    }

    handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();
        this.transactionUpdate(e);
    }

    render(){
        return(
            <Dialog open={true}>
                <DialogTitle style={{textAlign: 'center'}}>Edit Your Transaction</DialogTitle>
                <form style={{padding: "2em", width: '25vw', textAlign: 'center'}}>
                    <FormGroup>
                        <TextField label='Amount' variant='filled' value={this.state.amount} name='amount' onChange={this.inputCompiler} type='number' id="standard-adornment-amount"></TextField>
                    </FormGroup>
                    <br/>
                    <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', marginRight:'2em'}} onClick={this.handleSubmit}>Update Transaction</Button>
                    <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} onClick={this.props.updateOff}>Cancel</Button>
                </form>
            </Dialog>
        )
    }
}