import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import Profile from 'components/Profile';
import PortfolioMenu from 'components/PortfolioMenu';

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
});

class Portfolio extends Component {

    render() {
        const { classes, children, select } = this.props;
        const { userName, user, userInfo, subscribed, toggleSubscribe } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.leftSide}>
                    <Profile userInfo={userInfo} user={user} subscribed={subscribed} toggleSubscribe={toggleSubscribe}/>
                    <PortfolioMenu select={select} userName={userName}/>
                </div>
                <div className={classes.flexGrow}>
                    {children}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Portfolio);