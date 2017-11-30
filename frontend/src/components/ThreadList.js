import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import ThreadTable from 'components/ThreadTable';

const styles = theme => ({
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

const ThreadList = ({classes, ...rest}) => {
    return(
        <div>
            <ThreadTable {...rest}/>
            <div className={classes.footer}>
                <div className={classes.flexGrow} />
                <Button raised color="primary">
                    Write
                    <ModeEditIcon className={classes.rightIcon} />
                </Button>
            </div>
        </div>
    );
};

export default withStyles(styles)(ThreadList);