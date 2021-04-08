import React from 'react';
import {
    Grid, Container, Paper
} from '@material-ui/core';
import CampaignsTable from './CampaignsTable';
import CampaignsCreate from './CampaignsCreate';

interface IProps {
    sessionToken: string;
    baseURL: string;
}

export default class CampaignsIndex extends React.Component<IProps> {
    
    render() {
        return(
            <Container>
                <Paper style={{backgroundColor: '#EEFEFF', paddingBottom: '3em'}}>
                    <Paper style={{backgroundColor: '#008F95', height: '10px'}}></Paper>
                    <h1>Your Campaigns</h1>
                </Paper>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <CampaignsCreate sessionToken={this.props.sessionToken} baseURL={this.props.baseURL}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CampaignsTable />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}