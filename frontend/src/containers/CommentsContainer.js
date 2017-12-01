import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from 'store/modules/comment';

import Spinner from 'components/Spinner';
import Comments from 'components/Comments';

class CommentsContainer extends Component {

    componentDidMount() {
        const { CommentActions, userName, threadId } = this.props;
        CommentActions.getComments({userName, threadId});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.threadId !== this.props.threadId) {
            const { CommentActions } = this.props;
            const { userName, threadId } = nextProps;
            CommentActions.getComments({userName, threadId});
        }
    }

    render() {
        const { threadId, comments, loading } = this.props;

        if(!comments || loading) return <Spinner/>

        return (
            <Comments data={comments}/>
        );
    }
}

/*
            <div>
                {comments.map(comment => {
                    const { id, content, createdAt, updatedAt, displayName, userName } = comment;

                    return 
                })}
            </div>
*/

export default connect(
    (state) => ({
        comments: state.comment.get('comments'),
        loading: state.pender.pending['comment/GET_COMMENTS'],
    }),
    (dispatch) => ({
        CommentActions: bindActionCreators(commentActions, dispatch),
    })
)(CommentsContainer);