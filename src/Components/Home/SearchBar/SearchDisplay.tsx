import React from 'react';
import {
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody,
    Button
} from '@material-ui/core';

interface IProps {
    campaigns: ICampaign[];
    editUpdateCampaign(campaign: ICampaign): void;
    updateOn(): void;
    baseURL: string;
    sessionToken: string;
    fetchCampaigns(): void;
}

interface ICampaign {
    title: string;
    amount: number;
    description: string;
    endDate: string;
    id: number;
}

const SearchDisplay =  (props: IProps) => {
    //functional component here, mapper to pull campaigns, and delete functionality here
    const deleteCampaign = (campaign: ICampaign) => {
        fetch(`${props.baseURL}/campaigns/${campaign.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            props.fetchCampaigns();
        })
    }

    const campaignMapper = () => {
        return props.campaigns.map((campaign: ICampaign, index: number) => {
            return(
                <TableRow key={index}>
                    <TableCell>{campaign.id}</TableCell>
                    <TableCell>{campaign.title}</TableCell>
                    <TableCell>${campaign.amount}</TableCell>
                    <TableCell>{campaign.description}</TableCell>
                    <TableCell>{campaign.endDate}</TableCell>
                    <TableCell>
                        <Button onClick={() => {props.editUpdateCampaign(campaign); props.updateOn()}} style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} >Update</Button>
                        <Button onClick={(e) => deleteCampaign(campaign)} style={{marginTop: '1em', backgroundColor: '#E24E42', color:'white', borderRadius: '25px'}} >Delete</Button>
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
    )
}

export default SearchDisplay;