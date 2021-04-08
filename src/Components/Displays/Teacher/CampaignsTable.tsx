import React from 'react';
import {
    Table, TableContainer,
    TableHead, TableRow,
    TableCell, TableBody
} from '@material-ui/core';

export default class CampaignsTable extends React.Component{

    render(){
        return(
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>Title</TableCell>
                        <TableCell>Amount Needed</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>End Date</TableCell>
                    </TableHead>
                </Table>
            </TableContainer>
        )
    }
}