
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as workActions from 'store/modules/work';

import Spinner from 'components/Spinner';
import WorkDetail from 'components/WorkDetail';

class WorkDetailContainer extends Component {

    componentDidMount() {
        const { WorkActions, workid } = this.props;
        WorkActions.getWork({id: workid});
        WorkActions.getLiked({id: workid});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.workid !== this.props.workid) {
            const { WorkActions, workid } = this.props;
            WorkActions.getWork({id: workid});
            WorkActions.getLiked({id: workid});
        }
    }

    handleLike = async () => {
        const { WorkActions, workid, liked } = this.props;
        if(liked) await WorkActions.dislike({id: workid});
        else await WorkActions.like({id: workid});
    };

    render() {
        const { WorkActions, work, loading, liked } = this.props;
        const { handleLike } = this;

        if(!work || loading) return <Spinner/>;

        return (
            <WorkDetail data={work} liked={liked} toggleLike={handleLike} />
        );
    }
}

export default connect(
    (state) => ({
        work: state.work.get('work'),
        liked: state.work.get('liked'),
        loading: state.pender.pending['work/GET_WORK'],
    }),
    (dispatch) => ({
        WorkActions: bindActionCreators(workActions, dispatch),
    })
)(WorkDetailContainer);