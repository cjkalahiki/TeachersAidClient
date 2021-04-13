import React from 'react';
import {
    Grid, Container, Paper
} from '@material-ui/core';
import CampaignsTable from './CampaignsTable';
import CampaignsCreate from './CampaignsCreate';
import CampaignsEdit from './CampaignsEdit';
import {ICampaign} from '../../interfaces';

interface IProps {
    sessionToken: string;
    baseURL: string;
}

interface IState {
    campaigns: ICampaign[];
    campaignToUpdate: ICampaign;
    updateActive: boolean
}

export default class CampaignsIndex extends React.Component<IProps, IState> {
    /* Need to figure out how we are  going to build the mapper in the Table. By building an interface for the campaign objects, we can capture these individually to send down as props to be displayed. the fetch logic comes here.*/
    constructor(props: IProps){
        super(props);

        this.state = {
            campaigns: [],
            campaignToUpdate: {
                title: '',
                amount: NaN,
                description: '',
                endDate: '',
                id: NaN
            },
            updateActive: false
        }
        this.fetchCampaigns = this.fetchCampaigns.bind(this);
        this.editUpdateCampaign = this.editUpdateCampaign.bind(this);
        this.updateOn = this.updateOn.bind(this);
        this.updateOff = this.updateOff.bind(this);
    }

    //editUpdateCampaign
    editUpdateCampaign(campaign: ICampaign): void{
        this.setState({
            campaignToUpdate: campaign
        })
    }

    fetchCampaigns(): void{
        let newURL = `${this.props.baseURL}/campaigns`;

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
                this.setState({campaigns: data});
            })
    }

    componentDidMount(){
        this.fetchCampaigns();
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
                        <h1>Your Campaigns</h1>
                    </Paper>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <CampaignsCreate sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} fetchCampaigns={this.fetchCampaigns}/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CampaignsTable campaigns={this.state.campaigns} editUpdateCampaign={this.editUpdateCampaign} updateOn={this.updateOn} baseURL={this.props.baseURL} sessionToken={this.props.sessionToken} fetchCampaigns={this.fetchCampaigns}/>
                        </Grid>
                    </Grid>
                </Container>
                    {
                        this.state.updateActive
                            ? <CampaignsEdit fetchCampaigns={this.fetchCampaigns} updateOff={this.updateOff} sessionToken={this.props.sessionToken} baseURL={this.props.baseURL} campaignToUpdate={this.state.campaignToUpdate}/>
                            : null
                    }
                    <br/>
                    <br/>
            </div>
        )
    }
}