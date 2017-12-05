import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import Avatar from 'components/Avatar';

const styles = theme => ({
    profilePaper: {
        padding: [theme.spacing.unit * 3, theme.spacing.unit],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    displayName: {
        margin: [theme.spacing.unit, 0],
    },
    description: {
        color: theme.palette.text.secondary,
    },
    subscribe: {
        marginTop: theme.spacing.unit * 3,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
});

function Profile(props) {
    const { classes } = props;
    const { userInfo, user, subscribed, toggleSubscribe } = props;
    const { displayName, userName, profile, photo } = userInfo.toJS();

    return (
        <div className={classes.root}>
            <Paper className={classes.profilePaper}>
                <Avatar
                    displayName={displayName}
                    photo={photo}
                    size={80}
                />
                <Typography className={classes.displayName} type="title" component="h2">{displayName}</Typography>
                <Typography className={classes.description} type="body1" component="div">{!profile || profile === '' ? 'No description.' : profile}</Typography>
                {!!user && user.get('userName') !== userName && <Button onClick={toggleSubscribe} className={classes.subscribe} raised color={subscribed ? 'accent' : 'default'}>{subscribed ? 'Subscribed' : 'Subscribe'}</Button>}
                {user && user.get('userName') === userName && <Link to={'/profile'} className={classes.link}><Button className={classes.subscribe} raised color="primary" component="div">Edit Profile</Button></Link>}
            </Paper>
        </div>
    );
}

export default withStyles(styles)(Profile);