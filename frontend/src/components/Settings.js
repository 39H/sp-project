import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    leftSide: {
        minWidth: 280,
        width: 280,
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    content: {
        margin: theme.spacing.unit * 3,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
});

const Settings = ({ classes, children }) => {
    return (
        <div className={classes.root}>
            <div className={classes.leftSide}>
                <List className={classes.list} subheader={<ListSubheader>Settings</ListSubheader>}>
                    <ListItem>
                        <ListItemText primary="Account" />
                    </ListItem>
                    <li>
                        <List disablePadding>
                            <Link to={'/settings/password'} className={classes.link}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText secondary="Change Password" />
                                </ListItem>
                            </Link>
                            <Link to={'/settings/unregister'} className={classes.link}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText secondary="Delete Account" />
                                </ListItem>
                            </Link>
                        </List>
                    </li>
                    <ListItem>
                        <ListItemText primary="Community" />
                    </ListItem>
                    <li>
                        <List disablePadding>
                            <Link to={'/settings/threads'} className={classes.link}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText secondary="Manage Threads" />
                                </ListItem>
                            </Link>
                            <Link to={'/settings/comments'} className={classes.link}>
                                <ListItem button className={classes.nested}>
                                    <ListItemText secondary="Manage Comments" />
                                </ListItem>
                            </Link>
                        </List>
                    </li>
                </List>
            </div>
            <div className={classes.flexGrow}>
                <Paper className={classes.content}>{children}</Paper>
            </div>
        </div>
    );
};

export default withStyles(styles)(Settings);