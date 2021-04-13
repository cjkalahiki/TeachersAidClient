import React, {useState} from 'react';
import {
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody,
    Button, TextField, Grid,
    Dialog, DialogTitle,
    FormGroup, FormLabel
} from '@material-ui/core';
import TransactionCreate from './TransactionCreate';

interface IProps {
    campaigns: ICampaign[];
    role: string;
    sessionToken: string;
    campaignTransactioner(campaign: ICampaign) : void;
    transactionOn(): void;
}

interface ICampaign {
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
                        {
                            props.role === 'donor'
                                ? <Button style={{marginTop: '1em', backgroundColor: '#0B949A', color:'white'}}
                                onClick={() => {props.campaignTransactioner(campaign); props.transactionOn()}}>Donate</Button>
                                : null
                        }                                           
                        </TableCell>
                    </TableRow>
                )
            })
        }
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