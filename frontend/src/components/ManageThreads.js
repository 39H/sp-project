import React from 'react';
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
import DeleteIcon from 'material-ui-icons/Delete';

import TimeAgo from 'react-timeago';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        },
    },    
});

const ManageThreads = ({ classes, data, page, rowsPerPage, onChangePage, onChangeRowsPerPage, onDelete }) => {
    const threads = data.toJS();
    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell numeric>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {threads.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(thread => {
                        return (<TableRow
                            hover
                            key={thread.id}
                        >
                            <TableCell padding="checkbox">
                                <IconButton onClick={() => onDelete({userName: thread.userName, threadId: thread.id})} aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell><Link className={classes.link} to={'/portfolio/' + thread.hostUserName + '/community/' + thread.id}>{thread.subject}</Link></TableCell>
                            <TableCell numeric><TimeAgo date={thread.createdAt} /></TableCell>
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
    );
};

export default withStyles(styles)(ManageThreads);