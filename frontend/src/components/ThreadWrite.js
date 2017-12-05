
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import ModeEditIcon from 'material-ui-icons/ModeEdit';

const styles = theme => ({
    root: {
        padding: [12, 40],
    },
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

const ThreadWrite = ({ classes, forms, onChangeInput, onWrite }) => {
    const { subject, content } = forms.toJS();

    return (
        <div className={classes.root}>
            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="subject">Subject</InputLabel>
                <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={onChangeInput}
                />
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="content">Content</InputLabel>
                <Input
                    id="content"
                    name="content"
                    rows="5"
                    rowsMax="10"
                    multiline
                    value={content}
                    onChange={onChangeInput}
                />
            </FormControl>
            <div className={classes.footer}>
                <div className={classes.flexGrow} />
                <Button onClick={onWrite} raised color="primary">
                    Write
                    <ModeEditIcon className={classes.rightIcon} />
                </Button>
            </div>
        </div>
    );
};

export default withStyles(styles)(ThreadWrite);