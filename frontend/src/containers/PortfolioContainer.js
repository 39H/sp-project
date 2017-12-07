import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import * as portfolioActions from 'store/modules/portfolio';

import Portfolio from 'components/Portfolio';
import MyPortfolioTop from 'components/MyPortfolioTop';
import { WorksContainer } from 'containers';

class PortfolioContainer extends Component {

    componentDidMount() {
        const { PortfolioActions, userName } = this.props;
        PortfolioActions.getUserInfo({userName});
        PortfolioActions.getSubscribed({userName});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.userName !== this.props.userName) {
            const { PortfolioActions, userName } = nextProps;
            PortfolioActions.getUserInfo({userName});
            PortfolioActions.getSubscribed({userName});
        }
    }

    handleSubscribe = async () => {
        const { UserActions, PortfolioActions, subscribed, userName } = this.props;
        if(subscribed) await PortfolioActions.unsubscribe({userName});
        else await PortfolioActions.subscribe({userName});
        UserActions.getSubscriptions();
    };

    render() {
        const { children, select } = this.props;
        const { PortfolioActions, user, userName, userInfo, subscribed } = this.props;
        const { handleSubscribe } = this;
        return (
            <Portfolio
                userName={userName}
                user={user}
                userInfo={userInfo}
                subscribed={subscribed}
                toggleSubscribe={handleSubscribe}
                select={select}
            >
            {children
                ? children
                : <div>{!!user && user.get('userName') === userName && <MyPortfolioTop userName={userName}/>}<WorksContainer type="user" userName={userName} /></div>}
            </Portfolio>
        );
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user'),
        userInfo: state.portfolio.get('userInfo'),
        subscribed: state.portfolio.get('subscribed'),
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        PortfolioActions: bindActionCreators(portfolioActions, dispatch),
    })
)(PortfolioContainer);