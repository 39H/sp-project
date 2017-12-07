import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingsActions from 'store/modules/settings';
import * as threadActions from 'store/modules/thread';

import Spinner from 'components/Spinner';
import ManageThreads from 'components/ManageThreads';

class ManageThreadsContainer extends Component {
    componentDidMount() {
        const {SettingsActions} = this.props;
        SettingsActions.getMyThreads();
        SettingsActions.setPage({page: 0});
    }

    handleChangePage = async (event, page) => {
        const { SettingsActions } = this.props;
        SettingsActions.setPage({page});
    };

    handleChangeRowsPerPage = async (event) => {
        const { SettingsActions, userName } = this.props;
        SettingsActions.setRowsPerPage({rowsPerPage: event.target.value});     
    };

    handleDelete = async ({userName, threadId}) => {
        const { ThreadActions, SettingsActions } = this.props;
        let confirm = window.confirm("Are you sure you want to delete?");
        if(confirm) {
            await ThreadActions.deleteThread({userName, threadId});
            SettingsActions.getMyThreads();
        }
    };

    render() {
        const { userName, threads, page, rowsPerPage, loading } = this.props;
        const { handleChangePage, handleChangeRowsPerPage, handleDelete } = this;

        if(!threads || loading) {
            return <Spinner/>
        }

        return (
            <div>
                <ManageThreads
                    onChangePage = {handleChangePage}
                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                    onDelete = {handleDelete}
                    data = {threads}
                    page = {page}
                    rowsPerPage = {rowsPerPage}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        threads: state.settings.get('threads'),
        page: state.settings.get('page'),
        rowsPerPage: state.settings.get('rowsPerPage'),
        loading: state.pender.pending['settings/GET_MY_THREADS'],
    }),
    (dispatch) => ({
        SettingsActions: bindActionCreators(settingsActions, dispatch),
        ThreadActions: bindActionCreators(threadActions, dispatch),
    })
)(ManageThreadsContainer);