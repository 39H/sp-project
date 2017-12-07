import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
    },
    formWrap: {
        marginTop: -(theme.spacing.unit * 2),
        padding: theme.spacing.unit * 2,
    },
});

const ChangePassword = ({ classes, forms, onChangeInput, onChangePassword }) => {
    const { currentPassword, newPassword, confirmPassword } = forms.toJS();
    return (
        <div className={classes.root}>
            <div className={classes.formWrap}>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="currentpassword">Current Password</InputLabel>
                    <Input
                        id="currentpassword"
                        name="currentPassword"
                        type="password"
                        onChange={onChangeInput}
                        value={currentPassword}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="newpassword">New Password</InputLabel>
                    <Input
                        id="newpassword"
                        name="newPassword"
                        type="password"
                        onChange={onChangeInput}
                        value={newPassword}
                    />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                    <Input
                        id="confirmpassword"
                        name="confirmPassword"
                        type="password"
                        onChange={onChangeInput}
                        value={confirmPassword}
                    />
                </FormControl>
            </div>
            <Button onClick={onChangePassword} color="accent">Change Password</Button>
        </div>
    );
};

export default withStyles(styles)(ChangePassword);