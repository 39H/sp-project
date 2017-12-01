import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';

import Header from 'components/Header';

class HeaderContainer extends Component {
    // base 에서 drawer 처리?? 그냥 header 컴포넌트 state로??

    handleLoginOpen = () => {
        const { authActions } = this.props;
        authActions.showLoginModal();
    };

    handleRegisterOpen = () => {
        const { authActions } = this.props;
        authActions.showRegisterModal();  
    };

    handleLogout = async () => {
        const { authActions, userActions } = this.props;
        try {
            userActions.logout();
            await authActions.logout();
            window.location.href = '/';
        } catch(e) {

        }
    };
    
    render() {
        const { user, userInfo, openLogin, openRegister } = this.props;
        const { handleLoginOpen, handleLoginClose, handleRegisterOpen, handleRegisterClose, handleLogout } = this;

        return (
            <Header
                user={user}
                userInfo={userInfo}
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
        openLogin: state.auth.getIn(['loginModal', 'open']),
        openRegister: state.auth.getIn(['registerModal', 'open']),
    }),
    (dispatch) => ({
        userActions: bindActionCreators(userActions, dispatch),
        authActions: bindActionCreators(authActions, dispatch),
    })
)(HeaderContainer);