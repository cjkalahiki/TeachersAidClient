import React from 'react';
import {Grid, Container} from '@material-ui/core';

type Props = {

}

//use a {Container} from material ui for the blue background

export default class Home extends React.Component {

    render() {
            return(
            <div>
                <div style={{ backgroundColor: '#B0DCDE', height: '30vh' }}>
                    <Container >
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <h3>Teachers' Aid</h3>    
                            </Grid>        
                        </Grid> 
                    </Container>
                </div>
                {/* <SearchBar /> */}
            </div>
        )
    }
}