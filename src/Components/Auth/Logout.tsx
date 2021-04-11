import React from 'react';
import {Button} from '@material-ui/core';

interface IProps {
    clearToken() : void;
}

export default class Logout extends React.Component<IProps> {
    render(){
        return (
            <div>
                <Button variant='contained' style={{backgroundColor: '#E24E42', color:'white', borderRadius: '25px', fontSize: '15pt'}} onClick={this.props.clearToken}>Log out</Button>
            </div>
        )
    }
}