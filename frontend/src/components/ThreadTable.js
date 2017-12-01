import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Table, {
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

import TimeAgo from 'react-timeago';

const styles = theme => ({
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    comments: {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
    }
});

class ThreadTable extends Component {
    
    render() {
        const { classes } = this.props;
        const { data, page, rowsPerPage, onChangePage, onChangeRowsPerPage } = this.props;

        const threads = data.toJS();

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject</TableCell>
                                <TableCell padding="none">User</TableCell>
                                <TableCell numeric>Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {threads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(thread => {
                                return (<TableRow
                                    hover
                                    key={thread.id}
                                >
                                    <TableCell><Link className={classes.link} to={'/portfolio/'+thread.hostName+'/community/'+thread.id}>{thread.subject}{thread.comments > 0 ? <span className={classes.comments}> [{thread.comments}]</span> : ''}</Link></TableCell>
                                    <TableCell padding="none">{thread.displayName}</TableCell>
                                    <TableCell numeric><TimeAgo date={thread.createdAt}/></TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                        <TableFooter>
                            <TablePagination
                                count={threads.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={onChangePage}
                                onChangeRowsPerPage={onChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(ThreadTable);