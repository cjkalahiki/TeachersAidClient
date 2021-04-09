import React, {useState} from 'react';
import {
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody,
    Button, TextField, Grid
} from '@material-ui/core';
import TransactionCreate from './TransactionCreate';

interface IProps {
    campaigns: ICampaign[];
    role: string;
    sessionToken: string;
}

interface ICampaign {
    // includes(arg0: string): any;
    title: string;
    amount: number;
    description: string;
    endDate: string;
    id: number;
    user: IUser;
}

interface IUser {
    username: string
}

const SearchDisplay =  (props: IProps) => {
    /*
        view campaign button will pull up ViewCampaign Modal
            inside this modal, a check for role === 'donor' to connect to /transactions/transaction to make the transaction
    */
    const [searchTerm, setSearchTerm] = useState('');
    const [transactionActive, setTransactionActive] = useState(false);

    //TODO: to pass down the 

    const campaignMapper = () => {
        console.log(props.campaigns);
        if (props.campaigns !== []) {
            return props.campaigns.filter((campaign: ICampaign) => campaign.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map((campaign: ICampaign, index: number) => {
                return(
                    <TableRow key={index}>
                        <TableCell>{campaign.title}</TableCell>
                        <TableCell>${campaign.amount}</TableCell>
                        <TableCell>{campaign.description}</TableCell>
                        <TableCell>{campaign.endDate}</TableCell>
                        <TableCell>{campaign.user.username}</TableCell>
                        <TableCell>                       
                        <Button style={{marginTop: '1em', backgroundColor: '#0B949A', color:'white'}} onClick={transactionOn}>Donate</Button>
                        </TableCell>
                        {
                            /* bug is that this only grabs the last campaign's id instead of the targeted one :/ */
                            transactionActive 
                                ? <TransactionCreate sessionToken={props.sessionToken} transactionOff={transactionOff} campaignID={campaign.id}/>
                                : null
                        }
                    </TableRow>
                )
            })
        }
    }

    const transactionOn = () => {
        console.log('clicked')
        setTransactionActive(true);
    }
    
    const transactionOff = () => {
        setTransactionActive(false);
    }

    return(
        <div>
            <div className='search'>
                <TextField id="outlined-search" label="Search field" type="search" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{width: '25em'}}/>
            </div>
            <br/>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell>Title</TableCell>
                                <TableCell>Amount Needed</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Teacher</TableCell>
                            </TableHead>
                            <TableBody>
                                {campaignMapper()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchDisplay;