import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as communityActions from 'store/modules/community';

import Spinner from 'components/Spinner';
import ThreadList from 'components/ThreadList';

class ThreadListContainer extends Component {
    getThreads = () => {
        const { CommunityActions, userName } = this.props;
        CommunityActions.getThreads({userName});
    };

    componentDidMount() {
        this.getThreads();
    }

    handleChangePage = async (event, page) => {
        const { CommunityActions, userName } = this.props;
        CommunityActions.setPage({page});
        await CommunityActions.getThreads({userName});
    };

    handleChangeRowsPerPage = async (event) => {
        const { CommunityActions, userName } = this.props;
        CommunityActions.setRowsPerPage({rowsPerPage: event.target.value});    
        await CommunityActions.getThreads({userName});   
    };

    render() {
        const { CommunityActions, threads, page, rowsPerPage, loading } = this.props;
        const { handleChangePage, handleChangeRowsPerPage } = this;

        if(threads.isEmpty() || loading) {
            return <Spinner/>
        }

        return (
            <ThreadList
                onChangePage = {handleChangePage}
                onChangeRowsPerPage = {handleChangeRowsPerPage}
                data = {threads}
                page = {page}
                rowsPerPage = {rowsPerPage}
            />
        );
    }
}

export default connect(
    (state) => ({
        threads: state.community.get('threads'),
        page: state.community.get('page'),
        rowsPerPage: state.community.get('rowsPerPage'),
        loading: state.pender.pending['community/GET_THREADS'],
    }),
    (dispatch) => ({
        CommunityActions: bindActionCreators(communityActions, dispatch),
    })
)(ThreadListContainer);