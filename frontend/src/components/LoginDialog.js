import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

import Spinner from './Spinner';

import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

const styles = theme => ({
    dialogPaper: {
        maxWidth: 400,
    },
    formControl: {
        marginTop: theme.spacing.unit,
    },
    button: {
        margin: [theme.spacing.unit * 3, 0],
        width: '100%',
    },
    bottom: {
        marginTop: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        textAlign: 'center',
    },
    link: {
        textDecoration: 'underline',
        color: theme.palette.text.secondary,
        '&:hover': {color: theme.palette.text.primary},
        cursor: 'pointer',
    },
});

class LoginDialog extends Component {
    state = {
        showPassword: false,
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    render() {
        const { classes } = this.props;
        const { open, forms, onClose, onShowRegister, onShowPassword, onChangeInput, onLogin, pending } = this.props;

        const { email, password } = forms.toJS();

        return (
            <Dialog classes={{paper: classes.dialogPaper}} open={open} onRequestClose={onClose} color="primary">
                <DialogTitle>Login</DialogTitle>
                {pending ? <DialogContent><Spinner/></DialogContent> :
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={onChangeInput}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                            id="password"
                            name="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={onChangeInput}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    <FormHelperText><a onClick={onShowPassword} className={classes.link}>Forgot?</a></FormHelperText>
                    </FormControl>
                    <Button onClick={onLogin} raised color="primary" className={classes.button}>Login</Button>
                    <Divider />
                    <Typography type="body1" className={classes.bottom}>Not a member? <a className={classes.link} onClick={onShowRegister}>Register now</a></Typography>
                </DialogContent>
                }
            </Dialog>
        );
    }
}

export default withStyles(styles)(LoginDialog);