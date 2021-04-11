import React from 'react';
import {
    Grid, Container,
    Paper
} from '@material-ui/core';
import SearchBar from './SearchBar/SearchBar';
import teacher from '../../Assets/teacher.jpg';

interface IProps {
    sessionToken: string;
    role: string;
}

//use a {Container} from material ui for the blue background

export default class Home extends React.Component<IProps> {

    render() {
            return(
            <div>
                <div style={{backgroundColor: '#B0DCDE', height: '30vh'}}>
                    <Container >
                        <Grid container spacing={2}>
                            <Grid item xs={5} style={{textAlign: 'left', fontSize: '16pt'}}>
                                <h2>Support YOUR children’s teachers directly!</h2>
                                <p>Show educators you care about their amazing work. Investing in teachers is investing in a better future for your kids.</p>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper style={{marginTop: '1em'}}>
                                    <Container style={{backgroundColor: '#016A6F', height: '23vh'}}>
                                        <img src={teacher} alt='teacher' style={{width: '30vh', marginTop: '1em'}}/>
                                    </Container>
                                </Paper>
                            </Grid>
                        </Grid> 
                    </Container>
                </div>
                <SearchBar sessionToken={this.props.sessionToken} role={this.props.role}/>
                <br/>
                <br/>
            </div>
        )
    }
}