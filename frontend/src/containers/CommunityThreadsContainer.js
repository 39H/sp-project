import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as communityActions from 'store/modules/community';

import Spinner from 'components/Spinner';
import ThreadList from 'components/ThreadList';
import ThreadFooter from 'components/ThreadFooter';
import WriteButton from 'components/WriteButton';

class CommunityThreadsContainer extends Component {
    componentDidMount() {
        const {CommunityActions} = this.props;
        this.getThreads();
        CommunityActions.setPage({page: 0});
    }

    getThreads = () => {
        const { CommunityActions, userName } = this.props;
        CommunityActions.getThreads({userName});
    };

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
        const { CommunityActions, user, userName, threads, page, rowsPerPage, loading } = this.props;
        const { handleChangePage, handleChangeRowsPerPage } = this;

        if(!threads || loading) {
            return <Spinner/>
        }

        return (
            <div>
                <ThreadList
                    onChangePage = {handleChangePage}
                    onChangeRowsPerPage = {handleChangeRowsPerPage}
                    data = {threads}
                    page = {page}
                    rowsPerPage = {rowsPerPage}
                />
                <ThreadFooter>
                    {!user ? null : <WriteButton userName={userName}/>}
                </ThreadFooter>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user'),
        threads: state.community.get('threads'),
        page: state.community.get('page'),
        rowsPerPage: state.community.get('rowsPerPage'),
        loading: state.pender.pending['community/GET_THREADS'],
    }),
    (dispatch) => ({
        CommunityActions: bindActionCreators(communityActions, dispatch),
    })
)(CommunityThreadsContainer);