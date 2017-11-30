import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import avatarColors from 'lib/avatarColors';

const TextAvatar = ({displayName, size}) => {
    const color = avatarColors(displayName);

    const styles = {
        avatar: {
            width: size,
            height: size,
            color: color.fg,
            backgroundColor:  color.bg,
        }
    };

    let CustomAvatar  = ({classes, text}) => {
        return (
            <Avatar className={classes.avatar}>{text}</Avatar>
        );
    }

    CustomAvatar = withStyles(styles)(CustomAvatar);

    return (<CustomAvatar text={displayName.slice(0,1)}/>);
}

const PhotoAvatar = ({photo, displayName, size}) => {
    const styles = {
        avatar: {
            width: size,
            height: size,
        }
    };

    let CustomAvatar  = ({classes, photo, displayName}) => {
        return (
            <Avatar
            alt={displayName}
            src={photo}
            className={classes.avatar}
            />
        );
    }

    CustomAvatar = withStyles(styles)(CustomAvatar);

    return (<CustomAvatar photo={photo} displayName={displayName}/>);
}

const MyAvatar = ({photo, displayName, size, ...rest}) => {
    if(photo === '') {
        return (<div {...rest}><TextAvatar displayName={displayName} size={size}/></div>);
    } else {
        return (<div {...rest}><PhotoAvatar photo={photo} displayName={displayName} size={size}/></div>);
    }
}

export default MyAvatar;