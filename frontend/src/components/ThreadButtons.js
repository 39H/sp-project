import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        padding: 40,
        marginTop: -60,
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    button: {
        margin: [0, theme.spacing.unit],
    },
});

const ThreadButtons = ({classes, onDelete, userName, threadId}) => {
    return (
        <div className={classes.root}>
            <div className={classes.flexGrow} />
            <Link to={'/portfolio/'+userName+'/community/'+threadId+'/edit'} className={classes.link}><Button className={classes.button} color="primary" component="div">Edit</Button></Link>
            <Button onClick={onDelete} className={classes.button} color="accent">Delete</Button>
        </div>
    );
};

export default withStyles(styles)(ThreadButtons);