import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as threadActions from 'store/modules/thread';

import Spinner from 'components/Spinner';
import ThreadDetail from 'components/ThreadDetail';
import ThreadButtons from 'components/ThreadButtons';

import { CommentsContainer } from 'containers';

class ThreadDetailContainer extends Component {

    componentDidMount() {
        const { ThreadActions, userName, threadId } = this.props;
        ThreadActions.getThread({userName, threadId});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.threadId !== this.props.threadId) {
            const { ThreadActions } = this.props;
            const { userName, threadId } = nextProps;
            ThreadActions.getThread({ userName, threadId });
        }
    }

    handleDelete = async () => {
        const { ThreadActions, userName, threadId } = this.props;
        let confirm = window.confirm("Are you sure you want to delete?");
        if(confirm) {
            await ThreadActions.deleteThread({userName, threadId});
            window.location.href = '/portfolio/'+userName+'/community';
        }
    };

    render() {
        const { threadId, user, thread, loading } = this.props;
        const { handleDelete } = this;

        if(loading || !thread) return <Spinner/>

        const { subject, content, createdAt, updatedAt, displayName, userName } = thread.toJS();

        return (
            <div>
                <ThreadDetail
                    subject={subject}
                    content={content}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    displayName={displayName}
                    userName={userName}
                />
                {user && user.get('userName') === userName && <ThreadButtons onDelete={handleDelete} userName={this.props.userName} threadId={threadId}/>}
                <CommentsContainer userName={userName} threadId={threadId}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user'),
        thread: state.thread.get('thread'),
        loading: state.pender.pending['thread/GET_THREAD'],
    }),
    (dispatch) => ({
        ThreadActions: bindActionCreators(threadActions, dispatch),
    })
)(ThreadDetailContainer);