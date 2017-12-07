import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';

import ForgotPasswordDialog from 'components/ForgotPasswordDialog';

class ForgotPasswordDialogContainer extends Component {

    handleChangeInput = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInputPassword({name, value});
    };

    handleClose = () => {
        const { AuthActions } = this.props;
        AuthActions.hidePasswordModal();
    };

    handleSend = async () => {
        const { AuthActions, form } = this.props;
        const { email } = form.toJS();
        await AuthActions.forgotPassword({email});
        window.alert('Check your email please.');
        AuthActions.hidePasswordModal();
    };
    
    render() {
        const { handleChangeInput, handleClose, handleSend } = this;
        const { open, form, error } = this.props;
        return (
            <ForgotPasswordDialog
                open={open}
                forms={form}
                onClose={handleClose}
                onChangeInput={handleChangeInput}
                onSend={handleSend}
            />
        );
    }
}

export default connect(
    (state) => ({
        open: state.auth.getIn(['passwordModal', 'open']),
        form: state.auth.get('passwordForm'),
        error: state.auth.get('error'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(ForgotPasswordDialogContainer);