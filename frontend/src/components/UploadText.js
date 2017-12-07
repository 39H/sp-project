import React from 'react';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
    root: {
        padding: [theme.spacing.unit, theme.spacing.unit * 3],
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    footer: {
        padding: theme.spacing.unit,
        display: 'flex',
    },
});

const UploadVideo = ({ classes, forms, onUpload, onChangeInput }) => {
    const { subject, workURL, content } = forms.toJS();

    return (
        <div className={classes.root}>
            <FormControl required margin="normal" fullWidth>
                <InputLabel htmlFor="subject">Subject</InputLabel>
                <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={onChangeInput}
                />
            </FormControl>
            <FormControl required margin="normal" fullWidth>
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
                <Button onClick={onUpload} raised color="primary">
                    Upload
                </Button>
            </div>
        </div>
    );
};

export default withStyles(styles)(UploadVideo);