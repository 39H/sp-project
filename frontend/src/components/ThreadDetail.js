import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Divider from 'material-ui/Divider';

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
        margin: [theme.spacing.unit * 3, 0],
    },
    commentCount: {
        color: blue[500],
    },
    commentForm: {
        display: 'flex',
        alignItems: 'center',
    },
    commentButton: {
        marginLeft: theme.spacing.unit * 2,
    },
});

class ThreadDetail extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.headInfo}>
                    <Typography type="headline" component="h1">This is Subject</Typography>
                    <Typography type="body1" component="h2">
                            by <a className={classes.creator} href="#">Display Name</a>
                    </Typography>
                    <Typography type="caption" component="div">12 minutes ago</Typography>
                </div>
                <Paper className={classes.contentPaper}>
                    <p>Hello guys! Being so busy at works, I decided to get my hand stretched out by making this design exploration.</p>
                    <p>The app is about bike sharing service, where you can directly see if there is any bike near you real time. Then you can tap one of the bike icon to know the detailed info of that bike (distance, rate, ETA)</p>
                    <p>In the user profile, I want to add some sort of badges system. So you can earn badges from your progess while using the app. The idea is to increase user engagement in using the app. And is this case, when their riding the bike.</p>
                </Paper>
                <div className={classes.writeComment}>
                    <Typography type="subheading" component="div"><span className={classes.commentCount}>0</span> Comments</Typography>
                    <div className={classes.commentForm}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="comment">Comment</InputLabel>
                            <Input 
                                id="comment"
                                type="text"
                            />
                        </FormControl>
                        <Button className={classes.commentButton} raised color="primary">Send</Button>
                    </div>
                </div>
                <Comments />
            </div>
        );
    }
}

export default withStyles(styles)(ThreadDetail);