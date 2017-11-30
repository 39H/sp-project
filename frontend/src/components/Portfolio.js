import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';

import Profile from 'components/Profile';
import PortfolioTab from 'components/PortfolioTab';
import ThreadTable from 'components/ThreadTable';

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
        const { classes, children } = this.props;
        const { userInfo, subscribed, toggleSubscribe, mode, onChange } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.leftSide}>
                    <Profile userInfo={userInfo} subscribed={subscribed} toggleSubscribe={toggleSubscribe}/>
                </div>
                <div className={classes.flexGrow}>
                    <PortfolioTab mode={mode} onChange={onChange}/>
                    {children}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Portfolio);