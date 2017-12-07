
import React from 'react';
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

const ManageComments = ({ classes, data, page, rowsPerPage, onChangePage, onChangeRowsPerPage, onDelete }) => {
    const comments = data.toJS();
    return (
        <div className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell numeric>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(comment => {
                        return (<TableRow
                            hover
                            key={comment.id}
                        >
                            <TableCell padding="checkbox">
                                <IconButton onClick={() => onDelete({userName: comment.userName, ThreadId: comment.ThreadId, commentId: comment.id})} aria-label="Delete">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>{comment.content}</TableCell>
                            <TableCell numeric><TimeAgo date={comment.createdAt} /></TableCell>
                        </TableRow>);
                    })}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        count={comments.length}
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

export default withStyles(styles)(ManageComments);