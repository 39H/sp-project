import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import nl2pbr from 'lib/nl2pbr';

import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import Avatar from 'components/Avatar';

import FavoriteIcon from 'material-ui-icons/Favorite';
import { blue } from 'material-ui/colors';

const styles = theme => ({
    root: {
        width: 730,
        margin: '0 auto',
        padding: [40, 0],
    },
    headInfo: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing.unit * 3,
    },
    avatar: {
        marginRight: theme.spacing.unit,
    },
    creator: {
        textDecoration: 'none',
        fontWeight: 500,
        color: blue[500],
        '&:hover': {
            color: blue[700],
        },
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    mediaPaper: {
        padding: 20,
        marginBottom: theme.spacing.unit * 3,
    },
    media: {
        width: '100%',
        marginBottom: 20,
    },
    videoWrap: {
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    contentWrap: theme.typography.subheading,
});

class WorkDetail extends Component {
    /*
    <Paper className={classes.mediaPaper}>
        <img className={classes.media} src="https://material-ui-next.com/static/images/cards/contemplative-reptile.jpg" />
    </Paper>
    */

    render() {
        const { classes } = this.props;
        const { data, liked, toggleLike } = this.props;

        const { id, subject, workType, workURL, thumbnail, content, likes, createdAt, updatedAt, userName, displayName, photo } = data.toJS();

        return (
            <div className={classes.root}>
                <div className={classes.headInfo}>
                    <Avatar
                        photo={photo}
                        displayName={displayName}
                        size={48}
                        className={classes.avatar}
                    />
                    <div>
                        <Typography type="title" component="h1">{subject}</Typography>
                        <Typography type="body1" component="h2">
                            by <Link to={'/portfolio/'+userName} className={classes.creator}>{displayName}</Link>
                        </Typography>
                    </div>
                    <div className={classes.flexGrow} />
                    <Button onClick={toggleLike} raised color={liked ? 'accent' : 'default'}>
                        <FavoriteIcon className={classes.leftIcon} />
                        {likes}
                    </Button>
                </div>
                <Paper className={classes.mediaPaper}>
                    <div className={classes.videoWrap}>
                        <iframe className={classes.video} src={workURL} frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen="true"></iframe>
                    </div>
                </Paper>
                <div className={classes.contentWrap}>
                    {nl2pbr(content)}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(WorkDetail);