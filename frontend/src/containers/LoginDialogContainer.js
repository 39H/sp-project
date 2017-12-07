import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';

import LoginDialog from 'components/LoginDialog';

class LoginDialogContainer extends Component {
    handleChangeInput = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInputLogin({name, value});
    };

    handleClose = () => {
        const { AuthActions } = this.props;
        AuthActions.hideLoginModal();
    };

    handleRegister = () => {
        const { AuthActions } = this.props;
        AuthActions.showRegisterModal();
    };

    handlePassword = () => {
        const { AuthActions } = this.props;
        AuthActions.showPasswordModal();
    };

    handleLogin = async () => {
        const { AuthActions, UserActions, form } = this.props;
        const { email, password } = form.toJS();

        try {
            await AuthActions.login({ email, password });
            const { loginResult } = this.props;
            UserActions.setUser(loginResult);
            AuthActions.setError(null);
            await UserActions.getMyInfo();
            await UserActions.getSubscriptions();
            this.handleClose();
        } catch(e) {
            console.log(e);
        }
    };

    render() {
        const { handleChangeInput, handleClose, handleRegister, handlePassword, handleLogin } = this;
        const { open, form, error, pending } = this.props;

        return (
            <div>
                <LoginDialog
                    open={open}
                    forms={form}
                    onClose={handleClose}
                    onShowRegister={handleRegister}
                    onShowPassword={handlePassword}
                    onChangeInput={handleChangeInput}
                    onLogin={handleLogin}
                    pending={pending}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        open: state.auth.getIn(['loginModal', 'open']),
        form: state.auth.get('loginForm'),
        error: state.auth.get('error'),
        loginResult: state.auth.get('loginResult'),
        pending: state.pender.pending['auth/LOGIN'],
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(LoginDialogContainer);