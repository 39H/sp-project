import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

const WriteButton = ({classes, userName}) => {
    return (
        <Link to={'/portfolio/'+userName+'/community/write'}>
            <Button raised color="primary">
                Write
                <ModeEditIcon className={classes.rightIcon} />
            </Button>
        </Link>
    );
};

export default withStyles(styles)(WriteButton);