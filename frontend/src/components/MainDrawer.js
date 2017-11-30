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
import Avatar from 'material-ui/Avatar';

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
        textTransform:'uppercase',
    },
    avatar: {
        width: 24,
        height: 24,
    },
    subscriptionsName: {
        overflow: 'hidden',
    },
    subscriptionsNameText: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
});

function MainDrawer(props) {
    const { classes, handleDrawerClose } = props;

    return (
        <Drawer classes={{paper: classes.drawerPaper}} anchor="left" open={props.open} onRequestClose={handleDrawerClose}>
            <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} onClick={handleDrawerClose}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </div>
                <Divider />
                <List><MainListItems /></List>
                <Divider />
                <List dense subheader={<ListSubheader className={classes.listSubheader}>Subscriptions</ListSubheader>}>
                    {[0, 1, 2, 3].map(value => (
                        <ListItem key={value} button>
                            <Avatar className={classes.avatar} alt="Juyeong Men Music" src="https://material-ui-next.com/static/images/remy.jpg" />
                            <ListItemText classes={{text: classes.subscriptionsNameText}} className={classes.subscriptionsName} primary="Juyeong Men" />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon> 
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}

MainDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainDrawer);
