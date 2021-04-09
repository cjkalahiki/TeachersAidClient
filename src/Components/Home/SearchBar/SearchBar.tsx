import React from 'react';
import {
    Grid, Container, Paper,
    TextField
} from '@material-ui/core';
import SearchDisplay from './SearchDisplay';

interface IProps {
    sessionToken: string;
    role: string;
}

interface IState {
    campaigns: ICampaign[];
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

export default class SearchBar extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            campaigns: []
        }
        this.fetchAllCampaigns = this.fetchAllCampaigns.bind(this);

    }


    fetchAllCampaigns(): void{
        let newURL = `https://ck-teachers-aid-server.herokuapp.com/campaigns/allCampaigns`;

        fetch(newURL, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    campaigns: data.campaigns
                })
            })
    }

    componentDidMount(){
        this.fetchAllCampaigns();
    }
    

    render() {
        return(
            <div style={{marginTop: '5em'}}>
               <Grid container>
                   <Grid item xs={12}>
                        <h1>Search for a campaign!</h1>
                        <SearchDisplay campaigns={this.state.campaigns} role={this.props.role} sessionToken={this.props.sessionToken}/>
                   </Grid>
               </Grid>
            </div>
        )
    }
}