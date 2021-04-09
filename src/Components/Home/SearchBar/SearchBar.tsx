import React from 'react';
import {
    Grid, Container, Paper
} from '@material-ui/core';

interface IProps {
    sessionToken: string;
}

interface IState {
    campaigns: ICampaign[];
}

interface ICampaign {
    title: string;
    amount: number;
    description: string;
    endDate: string;
    id: number;
}

export default class SearchBar extends React.Component<IProps, IState> {
    /* Need to figure out how we are  going to build the mapper in the Table. By building an interface for the campaign objects, we can capture these individually to send down as props to be displayed. the fetch logic comes here.*/
    constructor(props: IProps){
        super(props);

        this.state = {
            campaigns: []
        }
        this.fetchAllCampaigns = this.fetchAllCampaigns.bind(this);

    }


    fetchAllCampaigns(): void{
        let newURL = `https://ck-teachers-aid-server.herokuapp.com/allCampaigns`;
        let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjYTk2NmRiLTRmZmQtNGNhMC04Zjc4LTYyODE1MTQyOGQ5ZSIsImlhdCI6MTYxNzkyNTA3OCwiZXhwIjoxNjE4MDExNDc4fQ.T7Q3Kinj2CDDeJoZ7pjVln7oy5y_zNax1vzFh0uHyqk";
        fetch(newURL, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
    }

    componentDidMount(){
        this.fetchAllCampaigns();
    }


    render() {
        return(
            <div>
               
            </div>
        )
    }
}