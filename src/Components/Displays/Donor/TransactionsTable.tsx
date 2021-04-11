import React from 'react';
import {
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody,
    Button
} from '@material-ui/core';

interface IProps {
    transactions: ITransaction[];
    editUpdateTransaction(transaction: ITransaction): void;
    updateOn(): void;
    baseURL: string;
    sessionToken: string;
    fetchTransactions(): void;
}

interface ITransaction {
    amount: number;
    id: number;
    campaignId: number;
}

const TransactionsTable =  (props: IProps) => {
    //functional component here, mapper to pull campaigns, and delete functionality here
    const deleteTransaction = (transaction: ITransaction) => {
        fetch(`${props.baseURL}/transactions/${transaction.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            props.fetchTransactions();
        })
    }

    const campaignMapper = () => {
        return props.transactions.map((transaction: ITransaction, index: number) => {
            return(
                <TableRow key={index}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>{transaction.campaignId}</TableCell>
                    <TableCell>
                        <Button onClick={() => {props.editUpdateTransaction(transaction); props.updateOn()}} style={{marginRight: '1em', backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} >Update</Button>
                        <Button onClick={() => deleteTransaction(transaction)} style={{ backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} >Delete</Button>
                    </TableCell>
                </TableRow>
            )
        })
    }
    
    return(
        <TableContainer>
            <Table>
                <TableHead>
                    <TableCell>ID</TableCell>
                    <TableCell>Amount Donated</TableCell>
                    <TableCell>Campaign ID</TableCell>
                </TableHead>
                <TableBody>
                    {campaignMapper()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TransactionsTable;