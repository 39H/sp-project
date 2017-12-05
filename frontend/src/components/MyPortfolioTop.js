import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        padding: 20,
        display: 'flex',
        marginBottom: -20,
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
});

const MyPortfolioTop = ({classes, userName}) => {
    return (
        <div className={classes.root}>
            <div className={classes.flexGrow}/>
            <Link to={'/portfolio/'+userName+'/upload'} className={classes.link}>
                <Button component="div" raised color="accent" className={classes.button}>Upload your work</Button>
            </Link>
        </div>
    );
};

export default withStyles(styles)(MyPortfolioTop);