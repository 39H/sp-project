import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'components/Avatar';

import MenuIcon from 'material-ui-icons/Menu';
import SettingsIcon from 'material-ui-icons/Settings';

import MainListItems from './MainListItems';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        height: '100%',
        width: drawerWidth,
        outline: 'none',
    },
    drawerHeader: {
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    listSubheader: {
        textTransform: 'uppercase',
    },
    subscriptionsName: {
        overflow: 'hidden',
    },
    subscriptionsNameText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
});

function MainDrawer(props) {
    const { classes, handleDrawerClose, user, subscriptions } = props;

    return (
        <Drawer classes={{ paper: classes.drawerPaper }} anchor="left" open={props.open} onRequestClose={handleDrawerClose}>
            <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} onClick={handleDrawerClose}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </div>
                <Divider />
                <List><MainListItems user={user} /></List>
                {!!user && <Divider />}
                {!!user && !!subscriptions && <List dense subheader={<ListSubheader className={classes.listSubheader}>Subscriptions</ListSubheader>}>
                    {subscriptions.toJS().map(subscription => {
                        return (
                            <Link to={'/portfolio/'+subscription.userName} className={classes.link} key={subscription.userName}>
                                <ListItem button>
                                    <Avatar
                                        photo={subscription.photo}
                                        displayName={subscription.displayName}
                                        size={24}
                                        className={classes.avatar}
                                    />
                                    <ListItemText classes={{ text: classes.subscriptionsNameText }} className={classes.subscriptionsName} primary={subscription.displayName} />
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>}
                <Divider />
                <List>
                    {!!user &&
                    <Link to={'/settings'} className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </Link>}
                </List>
            </div>
        </Drawer>
    );
}

MainDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainDrawer);
