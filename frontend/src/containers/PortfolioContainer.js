import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as portfolioActions from 'store/modules/portfolio';
import * as listActions from 'store/modules/list';

import Portfolio from 'components/Portfolio';
import Spinner from 'components/Spinner';
import CardGrid from 'components/CardGrid';

import { ThreadListContainer } from 'containers';

class PortfolioContainer extends Component {

    componentDidMount() {
        const { PortfolioActions, ListActions, userName } = this.props;
        PortfolioActions.getUserInfo({userName});
        PortfolioActions.getSubscribed({userName});
        ListActions.getWorksByUser({userName});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.mode !== this.props.mode ) {
            const { ListActions, userName, mode } = this.props;
            if(mode === 0) {
                // 0->1 community

            } else {
                // 1->0 works
                ListActions.getWorksByUser({userName});
            }
        }
    }

    handleSubscribe = async () => {
        const { PortfolioActions, subscribed, userName } = this.props;
        if(subscribed) await PortfolioActions.unsubscribe({userName});
        else await PortfolioActions.subscribe({userName});
    };

    handleTabChange = async (event, value) => {
        const { PortfolioActions, userName } = this.props;
        await PortfolioActions.setMode(value);
    };

    render() {
        const { PortfolioActions, userName, userInfo, subscribed, works, loading, mode } = this.props;
        const { handleSubscribe, handleTabChange } = this;
        return (
            <Portfolio
                userInfo={userInfo}
                subscribed={subscribed}
                toggleSubscribe={handleSubscribe}
                mode={mode}
                onChange={handleTabChange}
            >
                {(loading) ? <Spinner/> : (mode === 0) ? <CardGrid data={works} type={'user'}/> : <ThreadListContainer userName={userName}/>}
            </Portfolio>
        );
    }
}

export default connect(
    (state) => ({
        userInfo: state.portfolio.get('userInfo'),
        subscribed: state.portfolio.get('subscribed'),
        mode: state.portfolio.get('mode'),
        /*works: state.portfolio.get('works'),
        threads: state.portfolio.get('threads'),*/
        works: state.list.get('works'),
        loading: state.pender.pending['list/GET_WORKS_BY_USER'],
    }),
    (dispatch) => ({
        PortfolioActions: bindActionCreators(portfolioActions, dispatch),
        ListActions: bindActionCreators(listActions, dispatch),
    })
)(PortfolioContainer);