import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as threadActions from 'store/modules/thread';

import Spinner from 'components/Spinner';
import ThreadWrite from 'components/ThreadWrite';

class ThreadEditContainer extends Component {

    componentDidMount() {
        const { ThreadActions, userName, threadId } = this.props;
        ThreadActions.setDefault();
        ThreadActions.setEditable({userName, threadId});
    }

    handleWrite = async () => {
        const { ThreadActions, userName, thread, form } = this.props;
        const { subject, content } = form.toJS();
        const threadId = thread.get('id');

        try {
            await ThreadActions.patchThread({userName, threadId, subject, content});
        } catch(e) {

        }

    };

    handleChangeInput = (e) => {
        const { name, value } = e.target;
        const { ThreadActions } = this.props;
        ThreadActions.changeInput({name, value});
    };

    render() {
        const { ThreadActions, thread, form, writeResult, loading } = this.props;
        const { handleWrite, handleChangeInput } = this;

        if(loading || !thread) return <Spinner/>

        if(writeResult) {
            const { id, userName } = writeResult.toJS();
            ThreadActions.setDefault();
            return <Redirect to={'/portfolio/'+userName+'/community/'+id}/>;
        }

        return (
            <ThreadWrite
                forms={form}
                onChangeInput={handleChangeInput}
                onWrite={handleWrite}
            />
        );
    }
}

export default connect(
    (state) => ({
        thread: state.thread.get('thread'),
        form: state.thread.get('form'),
        writeResult: state.thread.get('writeResult'),
        loading: state.pender.pending['thread/SET_EDITABLE'],
    }),
    (dispatch) => ({
        ThreadActions: bindActionCreators(threadActions, dispatch),
    })
)(ThreadEditContainer);