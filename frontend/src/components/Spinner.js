import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
    
});

function Spinner({classes}) {
    return (
        <div>
            <CircularProgress className={classes.progress} size={50} />
        </div>
    );
}

export default withStyles(styles)(Spinner);