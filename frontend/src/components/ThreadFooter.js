import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    flexGrow: {
        flex: '1 1 auto',
    },
    footer: {
        padding: [theme.spacing.unit, theme.spacing.unit * 3],
        display: 'flex',
    },
});

const ThreadFooter = ({classes, children}) => {
    return (
        <div className={classes.footer}>
            <div className={classes.flexGrow}/>
            {children}
        </div>
    );
};

export default withStyles(styles)(ThreadFooter);