import React from 'react';
import {Grid} from '@material-ui/core';

type Props = {

}

//use a {Container} from material ui for the blue background

export default class Home extends React.Component {

    render() {
            return(
            <div className='home'>
                <Grid>
                    <h2>Home</h2>
                </Grid>
                {/* <SearchBar /> */}
            </div>
        )
    }
}