import React from 'react';
import {
    Dialog, FormGroup
} from '@material-ui/core';

export default class CampaignsEdit extends React.Component{

    render(){
        return(
            <Dialog open={false}>
                <form>
                    <FormGroup>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' name='title'/>
                    </FormGroup>
                </form>
            </Dialog>
        )
    }
}