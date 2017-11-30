import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as portfolioActions from 'store/modules/portfolio';
import * as listActions from 'store/modules/list';

import Portfolio from 'components/Portfolio';
import { WorksContainer } from 'containers';

class PortfolioContainer extends Component {

    componentDidMount() {
        const { PortfolioActions, ListActions, userName } = this.props;
        PortfolioActions.getUserInfo({userName});
        PortfolioActions.getSubscribed({userName});
    }

    handleSubscribe = async () => {
        const { PortfolioActions, subscribed, userName } = this.props;
        if(subscribed) await PortfolioActions.unsubscribe({userName});
        else await PortfolioActions.subscribe({userName});
    };

    render() {
        const { children, select } = this.props;
        const { PortfolioActions, userName, userInfo, subscribed } = this.props;
        const { handleSubscribe } = this;
        return (
            <Portfolio
                userName={userName}
                userInfo={userInfo}
                subscribed={subscribed}
                toggleSubscribe={handleSubscribe}
                select={select}
            >
            {children ? children : <WorksContainer type="user" userName={userName} />}
            </Portfolio>
        );
    }
}

export default connect(
    (state) => ({
        userInfo: state.portfolio.get('userInfo'),
        subscribed: state.portfolio.get('subscribed'),
    }),
    (dispatch) => ({
        PortfolioActions: bindActionCreators(portfolioActions, dispatch),
    })
)(PortfolioContainer);