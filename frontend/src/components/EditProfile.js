import React from 'react';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import Avatar from 'components/Avatar';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3,
    },
    photoWrap: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing.unit * 2,
    },
    photo: {
        margin: [theme.spacing.unit * 2, 0]
    },
    input : {
        display: 'none',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    footer: {
        padding: theme.spacing.unit,
        display: 'flex',
    },
});

const EditProfile = ({classes, userInfo, forms, onChangeInput, onChangePhoto, onEdit}) => {
    const { photo, displayName } = userInfo.toJS();
    const { profile } = forms.toJS();

    return (
        <div className={classes.root}>
            <div className={classes.photoWrap}>
                <Avatar
                    className={classes.photo}
                    displayName={displayName}
                    photo={photo}
                    size={126}
                />
                <input
                    accept="image/*"
                    className={classes.input}
                    id="file-btn"
                    type="file"
                    onChange={onChangePhoto}
                />
                <label htmlFor="file-btn">
                    <Button raised component="span" className={classes.button}>
                        Change Photo
                    </Button>
                </label>
            </div>
            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="profile">Profile</InputLabel>
                <Input
                    id="profile"
                    name="profile"
                    type="text"
                    value={profile}
                    onChange={onChangeInput}
                />
            </FormControl>
            <div className={classes.footer}>
                <div className={classes.flexGrow} />
                <Button onClick={onEdit} raised color="primary">
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default withStyles(styles)(EditProfile);