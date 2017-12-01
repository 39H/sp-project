import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TimeAgo from 'react-timeago';
import nl2pbr from 'lib/nl2pbr';

import { blue } from 'material-ui/colors';

import Comments from './Comments';

const styles = theme => ({
    root: {
        margin: '0 auto',
        padding: 40,
    },
    headInfo: {
    },
    creator: {
        textDecoration: 'none',
        fontWeight: 500,
        color: blue[500],
        '&:hover': {
            color: blue[700],
        },
    },
    contentPaper: {
        ...theme.typography.subheading,
        padding: 20,
        marginTop: theme.spacing.unit * 3,
    },
});

class ThreadDetail extends Component {

    render() {
        const { classes } = this.props;
        const { subject, content, createdAt, updatedAt, displayName, userName } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.headInfo}>
                    <Typography type="headline" component="h1">{subject}</Typography>
                    <Typography type="body1" component="h2">
                            by <Link className={classes.creator} to={'/portfolio/'+userName} >{displayName}</Link>
                    </Typography>
                    <Typography type="caption" component="div"><TimeAgo date={createdAt}/></Typography>
                </div>
                <Paper className={classes.contentPaper}>
                    {nl2pbr(content)}
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(ThreadDetail);