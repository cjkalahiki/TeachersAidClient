import React from 'react';
import {
    Grid, Container, Paper,
    TextField
} from '@material-ui/core';
import SearchDisplay from './SearchDisplay';
import TransactionCreate from './TransactionCreate';
import APIURL from '../../../helpers/environment';

interface IProps {
    sessionToken: string;
    role: string;
}

interface IState {
    campaigns: ICampaign[];
    campaignTransaction: ICampaign;
    transactionActive: boolean;
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

export default class SearchBar extends React.Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            campaigns: [],
            campaignTransaction: {
                title: '',
                amount: NaN,
                description: '',
                endDate: '',
                id: NaN,
                user: {
                    username: ''
                }
            },
            transactionActive: false
        }
        this.fetchAllCampaigns = this.fetchAllCampaigns.bind(this);
        this.campaignTransactioner = this.campaignTransactioner.bind(this);
        this.transactionOn = this.transactionOn.bind(this);
        this.transactionOff = this.transactionOff.bind(this);
    }

    campaignTransactioner(campaign: ICampaign): void{
        this.setState({
            campaignTransaction: campaign
        })
    }


    fetchAllCampaigns(): void{
        let newURL = `${APIURL}/campaigns/allCampaigns`;

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

    transactionOn(): void {
        console.log('clicked')
        this.setState({
            transactionActive: true
        })
    }
    
    transactionOff(): void {
        this.setState({
            transactionActive: false
        })
    }
    

    render() {
        return(
            <div style={{marginTop: '5em'}}>
               <Grid container>
                   <Grid item xs={12}>
                        <h1>Search for a campaign!</h1>
                        <SearchDisplay campaigns={this.state.campaigns} role={this.props.role} sessionToken={this.props.sessionToken} campaignTransactioner={this.campaignTransactioner} transactionOn={this.transactionOn}/>
                   </Grid>
               </Grid>
               {
                    this.state.transactionActive 
                        ? <TransactionCreate sessionToken={this.props.sessionToken} transactionOff={this.transactionOff} campaignTransaction={this.state.campaignTransaction}/>
                        : null
                }
            </div>
        )
    }
}