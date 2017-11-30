import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';

import MainDrawer from './MainDrawer';
import Avatar from './Avatar';

import { LoginDialogContainer, RegisterDialogContainer } from 'containers';

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    loginInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing.unit,
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
});

class Header extends Component {
    state = {
        openDrawer: false,
    }

    handleDrawerOpen = () => {
        this.setState({ openDrawer: true });
    };

    handleDrawerClose = () => {
        this.setState({ openDrawer: false });
    };
    
    render() {
        const { classes } = this.props;
        const {
            user,
            userInfo,
            openLogin,
            openRegister,
            onShowLogin,
            onHideLogin,
            onShowRegister,
            onHideRegister,
            onLogout,
        } = this.props;
        const { openDrawer } = this.state;

        const { displayName, photo, profile } = userInfo.toJS();

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" className={classes.flex}></Typography>
                        { user ?
                        <div className={classes.loginInfo}>
                            <Avatar
                                photo={userInfo.get('photo')}
                                displayName={userInfo.get('displayName')}
                                size={32}
                                className={classes.avatar}
                            />
                            <Link to={'/portfolio/'+user.get('userName')} className={classes.link}>
                            <Typography type="body2" color="inherit">{userInfo.get('displayName')}</Typography>
                            </Link>
                            <IconButton onClick={onLogout} color="contrast" aria-label="Menu">
                                <ExitToAppIcon />
                            </IconButton>
                        </div> :
                        <div>
                            <Button color="contrast" onClick={onShowLogin}>Login</Button>
                            <Button color="contrast" onClick={onShowRegister}>Register</Button>
                        </div>
                        }
                    </Toolbar>
                </AppBar>
                <LoginDialogContainer />
                <RegisterDialogContainer />
                <MainDrawer open={openDrawer} handleDrawerClose={this.handleDrawerClose} />
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);