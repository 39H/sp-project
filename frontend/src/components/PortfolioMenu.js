import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuList, MenuItem } from 'material-ui/Menu';

import CollectionsIcon from 'material-ui-icons/Collections';
import MoodIcon from 'material-ui-icons/Mood';

import { blue } from 'material-ui/colors';


const styles = theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
});

const PortfolioMenu = ({classes, userName, select}) => {
    return (
        <MenuList>
            <Link className={classes.link} to={'/portfolio/'+userName}>
            <MenuItem selected={select === 0} disableRipple>
                <ListItemIcon className={classes.icon}>
                    <CollectionsIcon/>
                </ListItemIcon>
                <ListItemText classes={{ text: classes.text }} primary="Works"/>
            </MenuItem>
            </Link>
            <Link className={classes.link} to={'/portfolio/'+userName+'/community'}>
            <MenuItem selected={select === 1} disableRipple>
                <ListItemIcon className={classes.icon}>
                    <MoodIcon/>
                </ListItemIcon>
                <ListItemText classes={{ text: classes.text }} primary="Community"/>
            </MenuItem>
            </Link>
        </MenuList>
    );
};

export default withStyles(styles)(PortfolioMenu);