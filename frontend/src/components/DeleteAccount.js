import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
    },
    paragraph: {
        padding: theme.spacing.unit * 2,
    },
});

const DeleteAccount = ({classes, onDelete}) => {
    return (
        <div className={classes.root}>
            <Typography className={classes.paragraph} type="subheading">
                If you do not think you will use our service again and would like your account deleted,
                we can take care of this for you.
            </Typography>
            <Typography className={classes.paragraph} type="subheading">
                Keep in mind that you will not be able to reactive your account or retrive any of the content or information you have added.
            </Typography>
            <Typography className={classes.paragraph} type="subheading">
                If you would still like your account deleted, click "Delete My Account".
            </Typography>
            <Button onClick={onDelete} color="accent">Delete My Account</Button>
        </div>
    );
};

export default withStyles(styles)(DeleteAccount);