import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'store/modules/list';

import Spinner from 'components/Spinner';
import CardGrid from 'components/CardGrid';

class WorksContainer extends Component {

    getWorkList = () => {
        const { ListActions, type } = this.props;
        if(type === 'likes') {
            ListActions.getWorksByLikes();
        } else if(type === 'subscriptions') {
            ListActions.getWorksBySubscriptions();
        } else if(type === 'user') {
            const { userName } = this.props;
            ListActions.getWorksByUser({userName});
        } else {
            ListActions.getWorksByRecent();
        }
    };

    componentDidMount() {
        this.getWorkList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type !== this.props.type) {
            this.getWorkList();
        } else if(nextProps.type === 'user' && nextProps.userName !== this.props.userName) {
            const { ListActions, userName } = nextProps;
            ListActions.getWorksByUser({userName});
        }
    }

    render() {
        const { ListActions, works, type, loading } = this.props;

        if(!works || loading) return <Spinner/>;

        return (
            <CardGrid data={works} type={type}/>
        );
    }
}

export default connect(
    (state) => ({
        works: state.list.get('works'),
        loading: state.pender.pending['list/GET_WORKS_BY_RECENT'] || state.pender.pending['list/GET_WORKS_BY_LIKES'] || state.pender.pending['list/GET_WORKS_BY_SUBSCRIPTIONS'] || state.pender.pending['list/GET_WORKS_BY_USER']
    }),
    (dispatch) => ({
        ListActions: bindActionCreators(listActions, dispatch),
    })
)(WorksContainer);