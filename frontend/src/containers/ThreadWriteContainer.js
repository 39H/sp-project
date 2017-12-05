import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as threadActions from 'store/modules/thread';

import ThreadWrite from 'components/ThreadWrite';

class ThreadWriteContainer extends Component {

    componentDidMount() {
        const { ThreadActions } = this.props;
        ThreadActions.setDefault();
    }

    handleWrite = async () => {
        const { ThreadActions, userName, form } = this.props;
        const { subject, content } = form.toJS();

        try {
            await ThreadActions.writeThread({userName, subject, content});
        } catch(e) {

        }

    };

    handleChangeInput = (e) => {
        const { name, value } = e.target;
        const { ThreadActions } = this.props;
        ThreadActions.changeInput({name, value});
    };

    render() {
        const { ThreadActions, form, writeResult } = this.props;
        const { handleWrite, handleChangeInput } = this;

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
        form: state.thread.get('form'),
        writeResult: state.thread.get('writeResult'),
    }),
    (dispatch) => ({
        ThreadActions: bindActionCreators(threadActions, dispatch),
    })
)(ThreadWriteContainer);