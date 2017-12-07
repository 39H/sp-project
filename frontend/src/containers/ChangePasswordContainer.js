import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingsActions from 'store/modules/settings';

import ChangePassword from 'components/ChangePassword';

class ChangePasswordContainer extends Component {
    handleChangePassword = async () => {
        const { SettingsActions, form } = this.props;
        const { currentPassword, newPassword, confirmPassword } = form.toJS();

        if(newPassword !== confirmPassword) {
            return; // 비밀번호 확인 불일치
        }

        await SettingsActions.editPassword({currentPassword, newPassword});
        window.alert('Password Changed!');
        window.location.href = '/settings';
    };

    handleChangeInput = (e) => {
        const { SettingsActions } = this.props;
        const { name, value } = e.target;

        SettingsActions.changeInputPassword({name, value});
    };

    render() {
        const { form } = this.props;
        const { handleChangeInput, handleChangePassword } = this;

        return (
            <ChangePassword
                forms={form}
                onChangeInput={handleChangeInput}
                onChangePassword={handleChangePassword}
            />
        );
    }
}

export default connect(
    (state) => ({
        form: state.settings.get('passwordForm'),
    }),
    (dispatch) => ({
        SettingsActions: bindActionCreators(settingsActions, dispatch),
    })
)(ChangePasswordContainer);