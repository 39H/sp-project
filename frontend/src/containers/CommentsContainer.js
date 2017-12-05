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

    handleChangeInput = (e) => {
        const { CommentActions } = this.props;
        const { name, value } = e.target;

        CommentActions.changeInput({name, value});
    };

    handleWriteComment = async () => {
        const { CommentActions, form, userName, threadId } = this.props;
        const { content } = form.toJS();

        // try로 감싸고 실패시 덧글 등록 실패 메세지 출력..
        await CommentActions.writeComment({userName, threadId, content});
        await CommentActions.getComments({userName, threadId});
    };

    render() {
        const { threadId, user, comments, form, loading } = this.props;
        const { handleChangeInput, handleWriteComment } = this;

        if(!comments || loading) return <Spinner/>

        return (
            <Comments
                data={comments}
                forms={form}
                user={user}
                onChangeInput={handleChangeInput}
                onWriteComment={handleWriteComment}
            />
        );
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user'),
        comments: state.comment.get('comments'),
        form: state.comment.get('form'),
        loading: state.pender.pending['comment/GET_COMMENTS'],
    }),
    (dispatch) => ({
        CommentActions: bindActionCreators(commentActions, dispatch),
    })
)(CommentsContainer);