import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    dialogPaper: {
        maxWidth: 400,
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
    },
});

const ForgotPasswordDialog = ({ classes, open, forms, onClose, onChangeInput, onSend }) => {
    const { email } = forms.toJS();
    return (
        <Dialog classes={{paper: classes.dialogPaper}} open={open} onRequestClose={onClose} color="primary">
        <DialogTitle>Forgot Password?</DialogTitle>
        <DialogContent>
            <Typography type="body1">
                Enter the email address you used when you joined and we’ll send you instructions to reset your password.
            </Typography>
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
            <Button onClick={onSend} raised color="primary" className={classes.button}>Send Reset Instructions</Button>
        </DialogContent>
        </Dialog>
    );
};

export default withStyles(styles)(ForgotPasswordDialog);