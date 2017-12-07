import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import WhatshotIcon from 'material-ui-icons/Whatshot';
import SubscriptionsIcon from 'material-ui-icons/Subscriptions';

const styles = theme => ({
    root: {

    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
});

function MainListItems(props) {
    const { classes, user } = props;

    return (
        <div className={classes.root}>
            <Link to={'/'} className={classes.link}>
                <ListItem button>
                    <ListItemIcon> 
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </Link>
            <Link to={'/trending'} className={classes.link}>
                <ListItem button>
                    <ListItemIcon> 
                        <WhatshotIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trending" />
                </ListItem>
            </Link>
            {!!user && <Link to={'/subscriptions'} className={classes.link}>
                <ListItem button>
                    <ListItemIcon> 
                        <SubscriptionsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subscriptions" />
                </ListItem>
            </Link>}
        </div>
    );
}

MainListItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainListItems);