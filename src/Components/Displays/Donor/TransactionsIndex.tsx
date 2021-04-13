import React from 'react';
import {
    Grid, Container, Paper
} from '@material-ui/core';
import TransactionsTable from './TransactionsTable';
import TransactionsEdit from './TransactionsEdit';
import {ITransaction} from '../../interfaces';

interface IProps {
    sessionToken: string;
    baseURL: string;
}

interface IState {
    transactions: ITransaction[];
    transactionToUpdate: ITransaction;
    updateActive: boolean
}

export default class TransactionsIndex extends React.Component<IProps, IState> {
    /* Need to figure out how we are  going to build the mapper in the Table. By building an interface for the campaign objects, we can capture these individually to send down as props to be displayed. the fetch logic comes here.*/
    constructor(props: IProps){
        super(props);

        this.state = {
            transactions: [],
            transactionToUpdate: {
                amount: NaN,
                id: NaN,
                campaignId: NaN
            },
            updateActive: false
        }
        this.fetchTransactions = this.fetchTransactions.bind(this);
        this.editUpdateTransaction = this.editUpdateTransaction.bind(this);
        this.updateOn = this.updateOn.bind(this);
        this.updateOff = this.updateOff.bind(this);
    }

    //editUpdateCampaign
    editUpdateTransaction(transaction: ITransaction): void{
        this.setState({
            transactionToUpdate: transaction
        })
    }

    fetchTransactions(): void{
        let newURL = `${this.props.baseURL}/transactions`;

        fetch(newURL, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({transactions: data});
            })
    }

    componentDidMount(){
        this.fetchTransactions();
    }
    
    updateOn(){
        this.setState({updateActive: true})
    }

    updateOff(){
        this.setState({updateActive: false})
    }

    render() {
        return(
            <div>
                <Container>
                    <Paper style={{backgroundColor: '#EEFEFF', paddingBottom: '3em'}}>
                        <Paper style={{backgroundColor: '#008F95', height: '10px'}}></Paper>
                        <h1>Your Transactions</h1>
                        <p>To make new donations, go back to the home page and search for a campaign!</p>
                    </Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TransactionsTable transactions={this.state.transactions} editUpdateTransaction={this.editUpdateTransaction} updateOn={this.updateOn} baseURL={this.props.baseURL} sessionToken={this.props.sessionToken} fetchTransactions={this.fetchTransactions}/>
                        </Grid>
                    </Grid>
                </Container>
                    {
                        this.state.updateActive
                            ? <TransactionsEdit fetchTransactions={this.fetchTransactions} updateOff={this.updateOff} sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} transactionToUpdate={this.state.transactionToUpdate}/>
                            : null
                    }
                    <br/>
                    <br/>
            </div>
        )
    }
}