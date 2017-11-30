import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import ModeEditIcon from 'material-ui-icons/ModeEdit';

import Profile from '../components/Profile';
import PortfolioTab from '../components/PortfolioTab';
import ThreadTable from '../components/ThreadTable';
import ThreadDetail from '../components/ThreadDetail';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    leftSide: {
        minWidth: 345,
        width: 345,
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    footer: {
        padding: theme.spacing.unit,
        display: 'flex',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class Portfolio extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.leftSide}>
                    <Profile />
                </div>
                <div className={classes.flexGrow}>
                    <PortfolioTab />
                    <ThreadDetail />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Portfolio);