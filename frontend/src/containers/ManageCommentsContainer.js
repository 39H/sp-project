import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingsActions from 'store/modules/settings';
import * as commentActions from 'store/modules/comment';

import Spinner from 'components/Spinner';
import ManageComments from 'components/ManageComments';

class ManageCommentsContainer extends Component {
    componentDidMount() {
        const {SettingsActions} = this.props;
        SettingsActions.getMyComments();
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

    handleDelete = async ({userName, ThreadId, commentId}) => {
        const { CommentActions, SettingsActions } = this.props;
        let confirm = window.confirm("Are you sure you want to delete?");
        if(confirm) {
            await CommentActions.deleteComment({userName, ThreadId, commentId});
            SettingsActions.getMyComments();
        }
    };

    render() {
        const { userName, comments, page, rowsPerPage, loading } = this.props;
        const { handleChangePage, handleChangeRowsPerPage, handleDelete } = this;

        if(!comments || loading) {
            return <Spinner/>
        }

        return (
            <div>
                <ManageComments
                    onChangePage = {handleChangePage}
                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                    onDelete = {handleDelete}
                    data = {comments}
                    page = {page}
                    rowsPerPage = {rowsPerPage}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        comments: state.settings.get('comments'),
        page: state.settings.get('page'),
        rowsPerPage: state.settings.get('rowsPerPage'),
        loading: state.pender.pending['settings/GET_MY_COMMENTS'],
    }),
    (dispatch) => ({
        SettingsActions: bindActionCreators(settingsActions, dispatch),
        CommentActions: bindActionCreators(commentActions, dispatch),
    })
)(ManageCommentsContainer);