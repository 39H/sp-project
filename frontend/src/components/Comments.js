import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';

const commentStyles = theme => ({
    commentWrap: {
        padding: [theme.spacing.unit, 0],
        borderBottom: '1px solid #cccccc',
    },
    headWrap: {
        display: 'flex',
        alignItems: 'center',
    },
    writer: {
        marginRight: theme.spacing.unit,
    },
    content: {
        padding: theme.spacing.unit,
    },
});

let Comment = props => {
    const { classes } = props;

    return (
        <li className={classes.commentWrap}>
            <div className={classes.headWrap}>
                <Typography className={classes.writer} type="body2" component="div">Display Name</Typography>
                <Typography type="caption" component="div">7 months ago</Typography>
            </div>
            <Typography className={classes.content} type="body1" component="div">Comment's content here!</Typography>
        </li>
    );
};
Comment = withStyles(commentStyles)(Comment);


const styles = theme => ({
    root: {
        
    },
    commentList: {
        listStyle: 'none',
        margin: 0,
        padding: [theme.spacing.unit * 2, theme.spacing.unit],
    },
});

class Comments extends Component {
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <ul className={classes.commentList}>
                    <Comment />
                    <Comment />
                    <Comment />
                </ul>
            </div>
        );
    }
}

export default withStyles(styles)(Comments);