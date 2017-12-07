import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        paddingBottom: 40,
        marginTop: -40,
        width: 730,
        margin: '0 auto',
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

//<Link to={'/work/'+workId+'/edit'} className={classes.link}><Button className={classes.button} color="primary" component="div">Edit</Button></Link>

const WorkButtons = ({classes, onDelete, workId}) => {
    return (
        <div className={classes.root}>
            <div className={classes.flexGrow} />
            <Button onClick={onDelete} className={classes.button} color="accent">Delete</Button>
        </div>
    );
};

export default withStyles(styles)(WorkButtons);