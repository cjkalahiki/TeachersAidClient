import React from 'react';
import {Grid} from '@material-ui/core';

type Props = {

}

export default class Home extends React.Component {

    render() {
            return(
            <div className='home'>
                <div className='mainHome'>
                    <div className='blueBar'>
                        <Grid container spacing={1}>
                            <Grid container item xs={6} sm={6}>
                                <h3>Support your children's teachers directly!</h3>
                                <h5>Show educators you care about the work they do. Investing in teachers is investing in a better future for your kids.</h5>
                            </Grid>
                            <Grid container item xs={6} sm={6}>
                                <img src='' alt='teacher' />
                            </Grid>
                        </Grid>
                    </div>
                    {/* <SearchBar /> */}
                </div>
            </div>
        )
    }
}