import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';

import ChangeForgotPassword from 'components/ChangeForgotPassword';

class ChangeForgotPasswordContainer extends Component {
    handleChangePassword = async () => {
        const { AuthActions, form, code } = this.props;
        const { email, newPassword, confirmPassword } = form.toJS();

        if(newPassword !== confirmPassword) {
            return window.alert('Check your password again!'); // 비밀번호 확인 불일치
        }

        await AuthActions.changeForgotPassword({email, code, newPassword});
    };

    handleChangeInput = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInputChangePassword({name, value});
    };

    render() {
        const { AuthActions, form, passwordResult } = this.props;
        const { handleChangeInput, handleChangePassword } = this;

        if( passwordResult === true) {
            AuthActions.setPasswordDefault();
            window.alert('Password Changed!');
            window.location.href = '/';
        } else if ( passwordResult === false ) {
            AuthActions.setPasswordDefault();
            window.alert('Check your email again!');
        }

        return (
            <ChangeForgotPassword
                forms={form}
                onChangeInput={handleChangeInput}
                onChangePassword={handleChangePassword}
            />
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.get('changePasswordForm'),
        passwordResult: state.auth.get('passwordResult'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(ChangeForgotPasswordContainer);