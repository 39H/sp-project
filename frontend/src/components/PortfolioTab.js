import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
    root: {
        flexGrow: 1,
        /*backgroundColor: theme.palette.background.paper,*/
    }
});

class PortfolioTab extends Component {
    render() {
        const { classes } = this.props;
        const { mode, onChange } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs value={mode} onChange={onChange} indicatorColor="primary" textColor="primary" centered>
                        <Tab label="Works" />
                        <Tab label="Community" />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

PortfolioTab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PortfolioTab);