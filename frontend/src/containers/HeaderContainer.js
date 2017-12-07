import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';

import Header from 'components/Header';

class HeaderContainer extends Component {
    // base 에서 drawer 처리?? 그냥 header 컴포넌트 state로??

    handleLoginOpen = () => {
        const { AuthActions } = this.props;
        AuthActions.showLoginModal();
    };

    handleRegisterOpen = () => {
        const { AuthActions } = this.props;
        AuthActions.showRegisterModal();  
    };

    handleLogout = async () => {
        const { AuthActions, UserActions } = this.props;
        try {
            UserActions.logout();
            await AuthActions.logout();
            window.location.href = '/';
        } catch(e) {

        }
    };
    
    render() {
        const { user, userInfo, subscriptions, openLogin, openRegister } = this.props;
        const { handleLoginOpen, handleRegisterOpen, handleLogout } = this;

        return (
            <Header
                user={user}
                userInfo={userInfo}
                subscriptions={subscriptions}
                onShowLogin={handleLoginOpen}
                onShowRegister={handleRegisterOpen}
                onLogout={handleLogout}
            />
        );
    }
}

export default connect(
    (state) => ({
        user: state.user.get('user'),
        userInfo: state.user.get('info'),
        subscriptions: state.user.get('subscriptions'),
        openLogin: state.auth.getIn(['loginModal', 'open']),
        openRegister: state.auth.getIn(['registerModal', 'open']),
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(HeaderContainer);