import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';

import RegisterDialog from 'components/RegisterDialog';

class RegisterDialogContaienr extends Component {
    handleChangeInput = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInputRegister({name, value});
    };

    handleClose = () => {
        const { AuthActions } = this.props;
        AuthActions.hideRegisterModal();
    };

    handleRegister = async () => {
        const { AuthActions, UserActions, form } = this.props;
        const { email, displayName, userName, password } = form.toJS();

        try {
            await AuthActions.register({ email, displayName, userName, password });
            AuthActions.setError(null);
            this.handleClose();
        } catch(e) {
            console.log(e);
        }

        // to do something
    };

    render() {
        const { handleChangeInput, handleClose, handleRegister } = this;
        const { open, form, error, pending } = this.props;

        return (
            <div>
                <RegisterDialog
                    open={open}
                    forms={form}
                    onClose={handleClose}
                    onChangeInput={handleChangeInput}
                    onRegister={handleRegister}
                    pending={pending}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        open: state.auth.getIn(['registerModal', 'open']),
        form: state.auth.get('registerForm'),
        error: state.auth.get('error'),
        pending: state.pender.pending['auth/REGISTER'],
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(RegisterDialogContaienr)