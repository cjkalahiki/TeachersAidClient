import React from 'react';
import {
    Grid, Container, Paper,
    TextField
} from '@material-ui/core';

interface IProps {

}

interface IState {

}


export default class Footer extends React.Component<IProps, IState> {

    

    render() {
        return(
            <div style={{marginTop: '5em'}}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <h3>Created by: <a href='https://cjkalahiki.github.io/' target='_blank' style={{textDecoration: 'underline #0B949A', color: '#0B949A'}}>Connor Kalāhiki</a></h3>
                    </Grid>
                </Grid>
            </div>
        )
    }
}