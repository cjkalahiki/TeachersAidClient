import React, {useState} from 'react';
import {
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody,
    Button, TextField, Grid
} from '@material-ui/core';

interface IProps {
    campaigns: ICampaign[];
    role: string;
}

interface ICampaign {
    // includes(arg0: string): any;
    title: string;
    amount: number;
    description: string;
    endDate: string;
    id: number;
}

const SearchDisplay =  (props: IProps) => {
    const [searchTerm, setSearchTerm] = useState('');


    // const campaignFilter = () => {
    //     return (
    //         props.campaigns.filter((campaign): ICampaign => {
    //             campaign.includes(searchTerm.toLocaleLowerCase())
    //         })
    //     )
    // }

    const campaignMapper = () => {
        // console.log(props.campaigns);
        // return(
        //     <TableRow>
        //         <TableCell>test</TableCell>
        //     </TableRow>
        // )
        if (props.campaigns !== []) {
            return props.campaigns.filter((campaign: ICampaign) => campaign.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map((campaign: ICampaign, index: number) => {
                return(
                    <TableRow key={index}>
                        <TableCell>{campaign.title}</TableCell>
                        <TableCell>${campaign.amount}</TableCell>
                        <TableCell>{campaign.description}</TableCell>
                        <TableCell>{campaign.endDate}</TableCell>
                        <TableCell>                       
                        <Button style={{marginTop: '1em', backgroundColor: '#0B949A', color:'white'}} >View Campaign</Button>
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
            <Grid container spacing={3}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableCell>Title</TableCell>
                                <TableCell>Amount Needed</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>End Date</TableCell>
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