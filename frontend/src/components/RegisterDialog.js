import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

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
    bold: {
        fontWeight: 'bold',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
});

class RegisterDialog extends Component {
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
        const { open, forms, onClose, onChangeInput, onRegister, pending } = this.props;

        const { email, displayName, userName, password } = forms.toJS();

        return (
            <Dialog classes={{paper: classes.dialogPaper}} open={open} onRequestClose={onClose} color="primary">
                <DialogTitle>Register</DialogTitle>
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
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input 
                            id="name"
                            name="displayName"
                            type="text"
                            value={displayName}
                            onChange={onChangeInput}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input 
                            id="username"
                            name="userName"
                            type="text"
                            value={userName}
                            onChange={onChangeInput}
                        />
                        <FormHelperText>Your portfolio URL: /portfolio/<span className={classes.bold}>{ userName === '' ? 'USERNAME' : userName }</span></FormHelperText>
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
                    </FormControl>
                    <Button onClick={onRegister} raised color="primary" className={classes.button}>Register</Button>
                </DialogContent>
                }
            </Dialog>
        );
    }
}

export default withStyles(styles)(RegisterDialog);