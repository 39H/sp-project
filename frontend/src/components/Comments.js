import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import TimeAgo from 'react-timeago';

import { blue } from 'material-ui/colors';

const commentStyles = theme => ({
    commentWrap: {
        padding: [theme.spacing.unit, 0],
        borderBottom: '1px solid #cccccc',
    },
    headWrap: {
        display: 'flex',
        alignItems: 'center',
    },
    writer: {
        marginRight: theme.spacing.unit,
    },
    content: {
        padding: theme.spacing.unit,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

let Comment = props => {
    const { classes, data, user, onDelete } = props;
    const { id, content, createdAt, updatedAt, displayName, userName } = data;

    return (
        <li className={classes.commentWrap}>
            <div className={classes.headWrap}>
                <Link className={classes.link} to={'/portfolio/'+userName}>
                    <Typography className={classes.writer} type="body2" component="div">{displayName}</Typography>
                </Link>
                <Typography type="caption" component="div"><TimeAgo date={createdAt}/></Typography>
                {!!user && user.get('userName') === userName && <IconButton onClick={() => onDelete({commentId: id})} aria-label="Delete">
                    <DeleteIcon />
                </IconButton>}
            </div>
            <Typography className={classes.content} type="body1" component="div">{content}</Typography>
        </li>
    );
};
Comment = withStyles(commentStyles)(Comment);


const styles = theme => ({
    root: {
        padding: [0, 40, 40, 40],
    },
    commentCount: {
        color: blue[500],
    },
    commentForm: {
        display: 'flex',
        alignItems: 'center',
    },
    commentButton: {
        marginLeft: theme.spacing.unit * 2,
    },
    commentList: {
        listStyle: 'none',
        margin: 0,
        padding: [theme.spacing.unit * 2, theme.spacing.unit],
    },
});

class Comments extends Component {

    render() {
        const { classes } = this.props;
        const { data, forms, user, onChangeInput, onWriteComment, onDelete } = this.props;

        const { content } = forms.toJS();
        const comments = data.toJS();

        return (
            <div className={classes.root}>
                <div className={classes.writeComment}>
                    <Typography type="subheading" component="div"><span className={classes.commentCount}>{comments.length}</span> Comments</Typography>
                    <div className={classes.commentForm}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="comment">Comment</InputLabel>
                            <Input
                                id="comment"
                                name="content"
                                type="text"
                                value={content}
                                onChange={onChangeInput}
                                disabled={!user}
                            />
                        </FormControl>
                        <Button onClick={onWriteComment} disabled={!user} className={classes.commentButton} raised color="primary">Send</Button>
                    </div>
                </div>
                <ul className={classes.commentList}>
                    {comments.map(comment => {
                        return <Comment key={comment.id} data={comment} user={user} onDelete={onDelete}/>
                    })}
                </ul>
            </div>
        );
    }
}

export default withStyles(styles)(Comments);