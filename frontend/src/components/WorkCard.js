import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Card, { CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import TimeAgo from 'react-timeago';

import FavoriteIcon from 'material-ui-icons/Favorite';

const styles = theme => ({
    link: {
        textDecoration: 'none',
    },
    card: {
        maxWidth: 240,
        transition: 'all .3s ease-in-out',
        userSelect: 'none',
        cursor: 'pointer',
    },
    media: {
        height: 164,
    },
    cardContent: {
        padding: [7, 10, 0, 10],
    },
    cardBottom: {
        display: 'flex',
        color: theme.palette.text.secondary,
        alignItems: 'center',
    },
    flexGrow: {
        flex: '1 1 auto',
    },
    favoriteText: {
        lineHeight: '12px',
        fontSize: 12,
        color: theme.palette.text.secondary,
    },
    favoriteIcon: {
        width: 12,
        height: 12,
        marginRight: 2
    },
    subject: {
        fontSize: 14,
        fontWeight: 'bold',
        height: 34,
    },
    creator: {
        fontSize: 12,
        color: theme.palette.text.secondary,
        paddingBottom: 10,
    },
    createdAt: {
        fontSize: 12,
        color: theme.palette.text.secondary,
        padding: [7, 7],
    },
});


class WorkCard extends Component {
    state = {
        raised: false,
    }

    handleMouseOver = () => {
        this.setState({raised: true});
    };

    handleMouseOut = () => {
        this.setState({raised: false});
    };

    render() {
        const { classes } = this.props;
        const { id, img, subject, likes, userName, displayName, createdAt } = this.props;
        const { raised } = this.state;
        const { handleMouseOver, handleMouseOut } = this;

        return (
            <Link to={'/work/'+id} className={classes.link}>
            <Card onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={classes.card} raised={raised}>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title={subject}
                />
                <div className={classes.cardContent}>
                    <Typography type="body1" className={classes.subject} noWrap={true}>{subject}</Typography>
                    <Typography type="body1" className={classes.creator}>{displayName}</Typography>
                    <Divider />
                    <div className={classes.cardBottom}>
                        <Typography type="body1" className={classes.createdAt}><TimeAgo date={createdAt}/></Typography>
                        <div className={classes.flexGrow} />
                        <FavoriteIcon className={classes.favoriteIcon} />
                        <Typography type="body1" className={classes.favoriteText}>{likes}</Typography>
                    </div>
                </div>
            </Card>
            </Link>
        );
    }
}

export default withStyles(styles)(WorkCard);