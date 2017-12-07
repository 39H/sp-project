import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingsActions from 'store/modules/settings';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';

import DeleteAccount from 'components/DeleteAccount';

class DeleteAccountContainer extends Component {
    handleDelete = async () => {
        const { SettingsActions, AuthActions, UserActions } = this.props;
        let confirm = window.confirm("Are you sure you want to delete?");
        if(confirm) {
            try {
                await SettingsActions.deleteAccount();
                UserActions.logout();
                await AuthActions.logout();
                window.location.href = '/';
            } catch(e) {
    
            }
        }
    };

    render() {
        const { handleDelete } = this;

        return (
            <DeleteAccount
                onDelete={handleDelete}
            />
        );
    }
}

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        SettingsActions: bindActionCreators(settingsActions, dispatch),
    })
)(DeleteAccountContainer);