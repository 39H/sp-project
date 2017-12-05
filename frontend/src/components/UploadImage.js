import React from 'react';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import List, { ListItem, ListItemText } from 'material-ui/List';

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
    attachment: {
        padding: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    attachmentList: {
        backgroundColor: theme.palette.background.paper,
        margin: [theme.spacing.unit, 0],
    },
});

const UploadImage = ({ classes, forms, files, onUpload, onChangeInput, onImageChange }) => {
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
            <div className={classes.attachment}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="file-btn"
                    type="file"
                    onChange={onImageChange}
                />
                <label htmlFor="file-btn">
                    <Button raised component="span" className={classes.button}>
                        Attach Image
                    </Button>
                </label>
                <List className={classes.attachmentList}>
                    {files.map(file => {
                        const { id, fileName } = file.toJS();
                        return(
                            <ListItem>
                                <ListItemText key={id} primary={fileName} />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
            <div className={classes.footer}>
                <div className={classes.flexGrow} />
                <Button onClick={onUpload} raised color="primary">
                    Upload
                </Button>
            </div>
        </div>
    );
};

export default withStyles(styles)(UploadImage);