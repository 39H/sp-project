import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import { UploadVideoContainer, UploadImageContainer } from 'containers';

const styles = theme => ({
    root: {
    },
});

const UploadWork = ({ classes, value, onChange }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={onChange}
                    indicatorColor="primary"
                    textColor="primary"
                    fullWidth
                >
                    <Tab value="image" label="Image" />
                    <Tab value="video" label="Video" />
                    <Tab value="text" label="Text" />
                </Tabs>
            </AppBar>
            {value === 'video' && <UploadVideoContainer />}
            {value === 'image' && <UploadImageContainer />}
        </div>
    );
};

export default withStyles(styles)(UploadWork);