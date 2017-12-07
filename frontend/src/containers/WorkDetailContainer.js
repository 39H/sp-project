
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workActions from 'store/modules/work';

import Spinner from 'components/Spinner';
import WorkDetail from 'components/WorkDetail';
import WorkButtons from 'components/WorkButtons';

class WorkDetailContainer extends Component {

    componentDidMount() {
        const { WorkActions, workid } = this.props;
        WorkActions.getWork({id: workid});
        WorkActions.getLiked({id: workid});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.workid !== this.props.workid) {
            const { WorkActions } = this.props;
            WorkActions.getWork({id: nextProps.workid});
            WorkActions.getLiked({id: nextProps.workid});
        }
    }

    handleLike = async () => {
        const { WorkActions, workid, liked } = this.props;
        if(liked) await WorkActions.dislike({id: workid});
        else await WorkActions.like({id: workid});
    };

    handleDelete = async () => {
        const { WorkActions, workid } = this.props;
        let confirm = window.confirm("Are you sure you want to delete?");
        if(confirm) {
            await WorkActions.deleteWork({id: workid});
            window.location.href = '/';
        }
    };

    render() {
        const { WorkActions, work, workid, loading, liked, user } = this.props;
        const { handleLike, handleDelete } = this;

        if(!work || loading) return <Spinner/>;

        return (
            <div>
                <WorkDetail data={work} liked={liked} toggleLike={handleLike} />
                {!!user && user.get('userName') === work.get('userName') && <WorkButtons onDelete={handleDelete} workId={workid}/>}
            </div>
        );
    }
}

export default connect(
    (state) => ({
        work: state.work.get('work'),
        liked: state.work.get('liked'),
        user: state.user.get('user'),
        loading: state.pender.pending['work/GET_WORK'],
    }),
    (dispatch) => ({
        WorkActions: bindActionCreators(workActions, dispatch),
    })
)(WorkDetailContainer);